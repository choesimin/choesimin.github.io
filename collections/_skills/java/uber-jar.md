---
layout: skill
title: uber JAR - 모든 의존성을 하나의 JAR로 관리하기
date: 2025-01-17
---




- uber JAR(또는 fat JAR)는 Java application과 그것이 의존하는 모든 library들을 하나의 실행 가능한 JAR file로 packaging한 것입니다.
    - 모든 dependency를 포함하기 때문에 `java -jar` 명령어로 쉽게 실행할 수 있습니다.
    - 하나의 file만 배포하면 되므로 의존성 관리가 쉽고, 배포가 간단합니다.
    - microservice나 cloud 환경에서 container 관리하기 좋습니다.

- uber JAR를 사용할 때 주의할 점은 JAR 크기가 커질 수 있고, 같은 class의 다른 version이 충돌할 수 있다는 것입니다.




---




## uber JAR 생성 방법

- Maven에서는 `maven-shade-plugin`을, Gradle에서는 `shadowJar` plugin을 사용해 uber JAR를 만듭니다.
- 생성한 uber JAR는 `java -jar` 명령어로 바로 실행 가능합니다.


### Maven에서 uber JAR 생성하기

- `maven-shade-plugin`을 `artifactId` tag 안에 선언합니다.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.2.4</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

- Maven project를 build하면 기본적으로 `target` directory에 `[proejct_name]-[version]-shaded.jar` 이름으로 uber JAR가 생성됩니다.
    - 일반 JAR는 `target/[project_name]-[verion].jar`로 생성되며, uber JAR는 file name 뒤에 `-shaded` suffix가 붙은 상태로 만들어집니다.
    - classifier 등을 직접 설정하여 생성될 JAR의 이름을 수정할 수도 있습니다.


### Gradle에서 uber JAR 생성하기

- Gradle에서는 `shadowJar` plugin을 사용해서 uber JAR를 만듭니다.
- `build.gradle` file에 plugin을 추가하고, `./gradlew shadowJar` 명령어를 실행하여 uber JAR를 생성합니다.

```groovy
// build.gradle file
plugins {
    id 'com.github.johnrengelman.shadow' version '8.1.1'
    id 'java'
}
```

```bash
# uber JAR 생성 명령어 실행
./gradlew shadowJar
```

- 생성된 uber JAR는 보통 `build/libs` directory에서 찾을 수 있습니다.

