---
layout: skill
title: Reactive Programming
date: 2024-07-29
---




## Reactive Programming : 비동기 데이터 스트림 다루기

- Reactive Programming은 **데이터의 흐름과 변화에 대응**하여 **비동기적으로 데이터를 처리**하는 프로그래밍 패러다임입니다.
	- 이벤트 기반 시스템을 구축하는 데 유용하며, 특히 사용자 인터페이스(UI)와 같은 실시간 데이터 스트림을 처리하는데 적합합니다.

- 주요 프레임워크 및 라이브러리로 ReactiveX(RxJava, RxJS 등), Project Reactor, Akka Streams 등이 있습니다.


### Reactive System의 특징

- **비동기성 (Asynchrony)** : 리액티브 시스템은 이벤트 또는 데이터 스트림을 비동기적으로 처리합니다.
	- 이를 통해 다른 작업을 동시에 수행하거나 블로킹을 피할 수 있습니다.

- **반응성 (Responsiveness)** : 리액티브 시스템은 실시간으로 데이터의 변화에 반응합니다.
	- 사용자 요청이나 외부 이벤트에 빠르게 응답할 수 있습니다.

- **탄력성 (Elasticity)** : 리액티브 시스템은 부하나 실패에 유연하게 대응할 수 있습니다.
	- 시스템의 자원을 동적으로 조절하여 확장성과 견고성을 제공합니다.

- **메시지 기반 (Messaging)** : 리액티브 시스템은 메시지 기반 아키텍처를 기반으로 동작합니다.
	- 컴포넌트 간에 비동기적으로 메시지를 교환하여 상호작용합니다.


### Reactive Programming의 주요 개념

- **Data Stream** : 시간에 따라 변하는 값의 연속적인 흐름을 나타냅니다.
   - 예를 들어, 마우스 클릭 이벤트, 센서 데이터, 웹 소켓 메시지 등이 데이터 스트림이 될 수 있습니다.

- **Observer Pattern** : Subject(주체)와 Observer(관찰자)의 관계를 정의합니다.
   - Subject는 데이터의 변화를 감지하고, Observer는 그 변화를 받아 처리합니다.
   - Reactive Programming에서는 주로 Observable과 Observer의 형태로 구현됩니다.

- **연산자** : 연산자(operator)는 데이터 스트림을 변환하고 조작하는 함수들입니다.
	- map, filter, reduce 등의 연산자를 통해 스트림의 데이터를 원하는 형태로 가공할 수 있습니다.

- **비동기 처리** : Reactive Programming은 비동기 이벤트를 처리하는 데 중점을 둡니다.
	- callback이나 promise를 사용하는 대신, 스트림을 통해 데이터의 흐름을 관리합니다.


### Reactive Programming의 장점

- **성능 및 확장성** : 비동기 이벤트 처리를 통해 시스템의 확장성과 성능을 높일 수 있습니다.
	- 다수의 이벤트를 동시에 처리할 수 있으며, 필요에 따라 시스템을 병렬로 확장할 수 있습니다.

- **응답성** : 데이터의 변화에 실시간으로 반응하여 빠른 응답 시간을 제공합니다.
	- 사용자 경험을 향상시키는 데 도움이 됩니다.

- **유지 보수성** : 데이터 흐름과 처리가 명확하게 정의됩니다.
	- 코드의 가독성과 유지 보수성이 향상됩니다.

- **장애 처리와 회복력** : 오류를 격리시키고, 다른 컴포넌트에 영향을 주지 않으면서 정상 동작을 유지할 수 있습니다.
	- 장애가 발생하더라도 탄력적으로 대응할 수 있습니다.




---




## ReactiveX : Reactive eXtention

- ReactiveX는 비동기적인 이벤트 기반 프로그래밍을 위한 패턴과 도구를 제공하는 라이브러리로, 데이터 스트림과 이벤트를 효과적으로 처리할 수 있도록 도와줍니다. 





---




## RxJava : ReactiveX Java

- RxJava는 ReactiveX의 자바 구현체입니다. 
	- ReactiveX의 개념을 자바에 적용하여, 선언적이고 병렬 처리가 가능한 리액티브 프로그래밍을 구현할 수 있도록 합니다.


### RxJava 핵심 개념

- **Observable** : 데이터 스트림을 생성하고 발행하는 역할을 합니다.

- **Observer** : Observable을 구독하여 발행된 데이터를 처리합니다.

- **Operators** : 데이터 스트림을 변환하고 조작하는 함수들입니다.
	- 예를 들어, `map`, `filter`, `flatMap` 등이 있습니다.

- **Schedulers** : 비동기 작업의 실행 컨텍스트를 정의합니다.
	- 예를 들어, IO 작업을 위한 `Schedulers.io()`, UI 스레드를 위한 `AndroidSchedulers.mainThread()` 등이 있습니다.


### 예제 1 : RxJava의 기본적인 사용법

- "Hello"와 "RxJava" 문자열을 발행하는 `Observable`을 생성하고, 이를 구독하여 데이터를 처리하는 `Observer`를 정의합니다.
	- 구독이 시작되면 `Observer`는 `onSubscribe`, `onNext`, `onComplete` 메서드를 통해 데이터의 흐름을 처리합니다.

```java
import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

public class RxJavaBasicExample {
    public static void main(String[] args) {
        // Observable 생성
        Observable<String> observable = Observable.create(emitter -> {
            emitter.onNext("Hello");
            emitter.onNext("RxJava");
            emitter.onComplete();
        });

        // Observer 생성
        Observer<String> observer = new Observer<String>() {
            @Override
            public void onSubscribe(Disposable d) {
                System.out.println("Subscribed");
            }

            @Override
            public void onNext(String s) {
                System.out.println("Next : " + s);
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("Error : " + e.getMessage());
            }

            @Override
            public void onComplete() {
                System.out.println("Completed");
            }
        };

        // Observable 구독
        observable.subscribe(observer);
    }
}
```


### 예제 2 : 연산자 사용

- 연산자를 사용한 데이터 스트림 변환/조작 작업은 RxJava의 강력한 기능 중 하나입니다.

- 연산자를 활용하여 데이터 스트림을 필터링하고 변환하는 예제입니다.
	- 숫자 배열을 `Observable`로 변환한 후, 짝수만 필터링하고 각 값을 2배로 변환하는 연산자를 적용합니다.
	- 결과는 비동기로 처리되어 출력됩니다.
	- `Schedulers.io()`와 `Schedulers.single()`을 사용하여 작업을 백그라운드 스레드와 단일 스레드에서 처리하도록 설정했습니다.

```java
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.observers.DisposableObserver;

public class RxJavaOperatorsExample {
    public static void main(String[] args) {
        Observable<Integer> observable = Observable.fromArray(1, 2, 3, 4, 5)
                .filter(num -> num % 2 == 0)    // 짝수 필터링
                .map(num -> num * 2)    // 각 값을 2배로 변환
                .subscribeOn(Schedulers.io())    // IO 스케줄러에서 실행
                .observeOn(Schedulers.single());    // 단일 스레드에서 관찰

        observable.subscribeWith(new DisposableObserver<Integer>() {
            @Override
            public void onNext(Integer integer) {
                System.out.println("Next : " + integer);
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("Error : " + e.getMessage());
            }

            @Override
            public void onComplete() {
                System.out.println("Completed");
            }
        });

        // 잠시 대기하여 비동기 작업이 완료되도록 함
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```


### 예제 3 : 네트워크 요청 처리

- RxJava는 네트워크 요청과 같은 비동기 작업을 처리하는 데 매우 유용합니다.

- RxJava를 사용하여 네트워크 요청을 처리하는 예제입니다.
	- `OkHttpClient`를 사용하여 GitHub API에 네트워크 요청을 보내고, 그 결과를 `Observable`을 통해 처리합니다.
	- `Schedulers.io()`를 사용하여 네트워크 요청을 백그라운드 스레드에서 처리하고, `AndroidSchedulers.mainThread()`를 사용하여 결과를 메인 스레드에서 처리하도록 설정했습니다.

```java
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.observers.DisposableObserver;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class RxJavaNetworkExample {
    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();

        Observable<String> observable = Observable.create(emitter -> {
            try {
                Request request = new Request.Builder()
                        .url("https://api.github.com")
                        .build();
                Response response = client.newCall(request).execute();
                if (response.isSuccessful()) {
                    emitter.onNext(response.body().string());
                    emitter.onComplete();
                } else {
                    emitter.onError(new Exception("Network request failed"));
                }
            } catch (Exception e) {
                emitter.onError(e);
            }
        });

        observable.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeWith(new DisposableObserver<String>() {
                    @Override
                    public void onNext(String response) {
                        System.out.println("Response : " + response);
                    }

                    @Override
                    public void onError(Throwable e) {
                        System.out.println("Error : " + e.getMessage());
                    }

                    @Override
                    public void onComplete() {
                        System.out.println("Completed");
                    }
                });

        // 잠시 대기하여 비동기 작업이 완료되도록 함
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```




---




## Reference

- <https://reactivex.io>
- <https://devocean.sk.com/blog/techBoardDetail.do?ID=165099&boardType=techBlog>
