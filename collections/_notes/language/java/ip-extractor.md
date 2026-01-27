---
layout: note
permalink: /427
title: Java IP Extractor - HTTP 요청에서 Client IP 추출하기
description: HTTP 요청에서 client IP를 추출할 때는 proxy 환경을 고려하여 X-Forwarded-For 등의 header를 우선 확인하고, 없을 경우 getRemoteAddr()를 사용합니다.
date: 2025-06-01
---


## Client IP 추출

- web application에서 **client의 실제 IP 주소를 추출**하는 것은 보안, logging, 지역 기반 service에 필수적입니다.
    - 접근 제어와 rate limiting에 IP 주소를 활용합니다.
    - 감사 log에 client IP를 기록합니다.
    - 지역 기반 content 제공에 활용합니다.

- 단순히 `getRemoteAddr()`만 사용하면 **proxy 환경에서 잘못된 IP**를 얻습니다.
    - load balancer나 reverse proxy 뒤에서는 proxy의 IP가 반환됩니다.
    - 실제 client IP는 HTTP header에 담겨 전달됩니다.


---


## 기본 IP 추출 방법

- `HttpServletRequest`의 **`getRemoteAddr()` method**는 직접 연결된 client의 IP를 반환합니다.

```java
public String getClientIp(HttpServletRequest request) {
    return request.getRemoteAddr();
}
```

- proxy가 없는 환경에서는 이 방법으로 충분합니다.
- 그러나 대부분의 production 환경은 proxy를 사용합니다.


### Proxy 환경의 문제

- proxy 환경에서 `getRemoteAddr()`는 **proxy server의 IP**를 반환합니다.

```
Client (203.0.113.50) --> Load Balancer (10.0.0.1) --> Application Server

request.getRemoteAddr() = "10.0.0.1"  // proxy IP (wrong value)
```

- 실제 client IP를 얻으려면 proxy가 설정한 header를 확인해야 합니다.


---


## X-Forwarded-For Header

- `X-Forwarded-For`는 **proxy를 거치며 원본 client IP를 전달**하는 de facto 표준 header입니다.
    - 각 proxy가 이전 IP를 header에 추가합니다.
    - 여러 proxy를 거치면 comma로 구분된 IP 목록이 됩니다.

```
X-Forwarded-For: client, proxy1, proxy2
```


### Header 형식

- 첫 번째 IP가 **원본 client IP**입니다.

```
X-Forwarded-For: 203.0.113.50
X-Forwarded-For: 203.0.113.50, 70.41.3.18, 150.172.238.178
```

- 여러 proxy를 거친 경우 왼쪽에서 오른쪽으로 거친 순서대로 나열됩니다.
- 신뢰할 수 있는 첫 번째 IP를 추출해야 합니다.


### 기본 추출 구현

- `X-Forwarded-For` header에서 **첫 번째 IP를 추출**합니다.

```java
public String getClientIp(HttpServletRequest request) {
    String xForwardedFor = request.getHeader("X-Forwarded-For");

    if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
        // 첫 번째 IP 추출 (원본 client IP)
        return xForwardedFor.split(",")[0].trim();
    }

    return request.getRemoteAddr();
}
```


---


## 다양한 Proxy Header 처리

- proxy 종류에 따라 **다른 header를 사용**합니다.
    - 여러 header를 순서대로 확인하여 호환성을 높입니다.

| Header | 사용 환경 |
| --- | --- |
| `X-Forwarded-For` | 대부분의 proxy, load balancer |
| `X-Real-IP` | Nginx |
| `X-Client-IP` | Apache, 일부 proxy |
| `Proxy-Client-IP` | Apache HTTP Server |
| `WL-Proxy-Client-IP` | WebLogic |
| `HTTP_X_FORWARDED_FOR` | 일부 proxy |
| `HTTP_CLIENT_IP` | 일부 proxy |


### 종합 추출 구현

- 여러 header를 **우선순위에 따라 확인**합니다.

```java
public class IpExtractor {

    private static final String[] IP_HEADERS = {
        "X-Forwarded-For",
        "X-Real-IP",
        "X-Client-IP",
        "Proxy-Client-IP",
        "WL-Proxy-Client-IP",
        "HTTP_X_FORWARDED_FOR",
        "HTTP_CLIENT_IP"
    };

    public String extractClientIp(HttpServletRequest request) {
        for (String header : IP_HEADERS) {
            String ip = request.getHeader(header);
            if (isValidIp(ip)) {
                // X-Forwarded-For는 여러 IP를 포함할 수 있음
                if (ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                return ip;
            }
        }
        return request.getRemoteAddr();
    }

    private boolean isValidIp(String ip) {
        return ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip);
    }
}
```


---


## IP 유효성 검증

- 추출한 IP가 **올바른 형식인지 검증**해야 합니다.
    - spoofing(위조)된 header 값을 걸러냅니다.
    - IPv4와 IPv6 형식을 모두 처리합니다.


### 정규 표현식(Regex) 검증

- **IPv4와 IPv6 pattern**을 검증합니다.

```java
public class IpValidator {

    // IPv4 pattern : 0.0.0.0 ~ 255.255.255.255
    private static final String IPV4_PATTERN =
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}" +
        "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

    // IPv6 pattern (simplified)
    private static final String IPV6_PATTERN =
        "^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|" +
        "^::([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|" +
        "^([0-9a-fA-F]{1,4}:){1,7}:$";

    private static final Pattern IPV4_REGEX = Pattern.compile(IPV4_PATTERN);
    private static final Pattern IPV6_REGEX = Pattern.compile(IPV6_PATTERN);

    public boolean isValidIpAddress(String ip) {
        if (ip == null || ip.isEmpty()) {
            return false;
        }
        return IPV4_REGEX.matcher(ip).matches() ||
               IPV6_REGEX.matcher(ip).matches();
    }
}
```


### InetAddress를 이용한 검증

- Java의 **`InetAddress` class**를 활용한 검증 방법입니다.

```java
import java.net.InetAddress;
import java.net.UnknownHostException;

public boolean isValidIpAddress(String ip) {
    try {
        InetAddress.getByName(ip);
        return true;
    } catch (UnknownHostException e) {
        return false;
    }
}
```

- `InetAddress.getByName()`은 DNS 조회를 시도할 수 있어 성능에 영향을 줄 수 있습니다.
- 순수 형식 검증만 필요하다면 정규 표현식이 더 효율적입니다.


---


## Spring Framework에서의 구현

- Spring 환경에서는 **`RequestContextHolder`와 argument resolver를 활용**하여 IP를 추출합니다.


### RequestContextHolder 활용

- `RequestContextHolder`로 **현재 request에 접근**합니다.

```java
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class IpExtractor {

    public String getCurrentClientIp() {
        ServletRequestAttributes attributes =
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes == null) {
            return null;
        }

        HttpServletRequest request = attributes.getRequest();
        return extractClientIp(request);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");

        if (xForwardedFor != null && !xForwardedFor.isEmpty()
                && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }

        return request.getRemoteAddr();
    }
}
```


### Argument Resolver 활용

- **custom annotation**으로 controller에서 IP를 주입받습니다.

```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface ClientIp {
}
```

```java
@Component
public class ClientIpArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(ClientIp.class)
               && parameter.getParameterType().equals(String.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) {
        HttpServletRequest request =
            (HttpServletRequest) webRequest.getNativeRequest();
        return extractClientIp(request);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");

        if (xForwardedFor != null && !xForwardedFor.isEmpty()
                && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }

        return request.getRemoteAddr();
    }
}
```

```java
@RestController
public class UserController {

    @GetMapping("/user/info")
    public ResponseEntity<UserInfo> getUserInfo(@ClientIp String clientIp) {
        // clientIp 사용
        return ResponseEntity.ok(new UserInfo(clientIp));
    }
}
```


### WebMvcConfigurer 등록

- argument resolver를 **Spring MVC에 등록**합니다.

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new ClientIpArgumentResolver());
    }
}
```


---


## 보안 고려 사항

- IP 추출 시 **보안 위협을 고려**해야 합니다.
    - header는 client가 조작할 수 있습니다.
    - 신뢰할 수 있는 proxy만 header를 설정하도록 구성해야 합니다.


### Header Spoofing 방지

- **신뢰할 수 있는 proxy IP 목록**을 관리합니다.

```java
public class SecureIpExtractor {

    private final Set<String> trustedProxies;

    public SecureIpExtractor(Set<String> trustedProxies) {
        this.trustedProxies = trustedProxies;
    }

    public String extractClientIp(HttpServletRequest request) {
        String remoteAddr = request.getRemoteAddr();

        // 신뢰할 수 있는 proxy에서 온 요청만 header 확인
        if (trustedProxies.contains(remoteAddr)) {
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                return parseForwardedFor(xForwardedFor);
            }
        }

        return remoteAddr;
    }

    private String parseForwardedFor(String xForwardedFor) {
        String[] ips = xForwardedFor.split(",");

        // 오른쪽에서 왼쪽으로 신뢰할 수 없는 첫 번째 IP 반환
        for (int i = ips.length - 1; i >= 0; i--) {
            String ip = ips[i].trim();
            if (!trustedProxies.contains(ip)) {
                return ip;
            }
        }

        return ips[0].trim();
    }
}
```


### Private IP 확인

- 추출한 IP가 **private network IP인지 확인**합니다.

```java
public class IpUtils {

    public static boolean isPrivateIp(String ip) {
        try {
            InetAddress address = InetAddress.getByName(ip);
            return address.isSiteLocalAddress()
                   || address.isLoopbackAddress()
                   || address.isLinkLocalAddress();
        } catch (UnknownHostException e) {
            return false;
        }
    }
}
```

- `10.x.x.x`, `172.16.x.x ~ 172.31.x.x`, `192.168.x.x`는 private IP입니다.
- `127.x.x.x`는 loopback IP입니다.


---


## IPv6 처리

- 현대 network 환경에서는 **IPv6 주소도 처리**해야 합니다.


### IPv6 주소 형식

- IPv6는 **128bit 주소**를 사용합니다.

```
// full format
2001:0db8:85a3:0000:0000:8a2e:0370:7334

// abbreviated format (consecutive zeros omitted)
2001:db8:85a3::8a2e:370:7334

// loopback
::1

// IPv4 mapped IPv6
::ffff:192.168.1.1
```


### IPv4 Mapped IPv6 처리

- 일부 환경에서는 **IPv4 주소가 IPv6 형식으로 표현**됩니다.

```java
public String normalizeIp(String ip) {
    if (ip == null) {
        return null;
    }

    // IPv4 mapped IPv6 처리 (::ffff:192.168.1.1 -> 192.168.1.1)
    if (ip.startsWith("::ffff:")) {
        return ip.substring(7);
    }

    // IPv6 loopback을 IPv4로 변환
    if ("::1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)) {
        return "127.0.0.1";
    }

    return ip;
}
```


---


## 완성된 IP Extractor

- 모든 고려 사항을 반영한 **완성된 구현**입니다.

```java
@Component
public class ClientIpExtractor {

    private static final String[] IP_HEADERS = {
        "X-Forwarded-For",
        "X-Real-IP",
        "X-Client-IP",
        "Proxy-Client-IP",
        "WL-Proxy-Client-IP"
    };

    private static final String UNKNOWN = "unknown";

    public String extract(HttpServletRequest request) {
        String ip = extractFromHeaders(request);

        if (ip == null) {
            ip = request.getRemoteAddr();
        }

        return normalizeIp(ip);
    }

    private String extractFromHeaders(HttpServletRequest request) {
        for (String header : IP_HEADERS) {
            String ip = request.getHeader(header);

            if (isValidHeaderValue(ip)) {
                // 첫 번째 IP 추출 (여러 proxy를 거친 경우)
                if (ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                return ip;
            }
        }
        return null;
    }

    private boolean isValidHeaderValue(String ip) {
        return ip != null && !ip.isEmpty() && !UNKNOWN.equalsIgnoreCase(ip);
    }

    private String normalizeIp(String ip) {
        if (ip == null) {
            return null;
        }

        // IPv4 mapped IPv6 처리
        if (ip.startsWith("::ffff:")) {
            return ip.substring(7);
        }

        // IPv6 loopback 처리
        if ("::1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)) {
            return "127.0.0.1";
        }

        return ip;
    }
}
```


---


## Reference

- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For>
- <https://en.wikipedia.org/wiki/X-Forwarded-For>
- <https://docs.oracle.com/javase/8/docs/api/java/net/InetAddress.html>

