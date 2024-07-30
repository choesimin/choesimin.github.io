---
layout: skill
title: Reactive Programming - 비동기적으로 Data Stream을 다루는 방법
date: 2024-07-29
---




## Reactive Programming : Data 변화에 반응하여 비동기적으로 처리하기

- Reactive Programming은 **data의 흐름과 변화에 대응**하여 **비동기적으로 data를 처리**하는 programming paradigm입니다.
	- event 기반 system을 구축하는 데 유용하며, 특히 사용자 interface(UI)와 같은 실시간 data stream을 처리하는데 적합합니다.

- 주요 framework 및 library로 Rx(ReactiveX), Project Reactor, Akka Streams 등이 있습니다.


### Reactive System의 특징

- **비동기성 (Asynchrony)** : reactive system은 **event 또는 data stream을 비동기적으로 처리**합니다.
	- 이를 통해 다른 작업을 동시에 수행하거나 blocking을 피할 수 있습니다.

- **반응성 (Responsiveness)** : reactive system은 **실시간으로 data의 변화에 반응**합니다.
	- 사용자 요청이나 외부 event에 빠르게 응답할 수 있습니다.

- **탄력성 (Elasticity)** : reactive system은 **부하나 실패에 유연하게 대응**할 수 있습니다.
	- system의 자원을 동적으로 조절하여 확장성과 가용성을 제공합니다.

- **Message 기반 (Messaging)** : reactive system은 **message 기반 architecture를 기반으로 동작**합니다.
	- component 간에 비동기적으로 message를 교환하여 상호작용합니다.


### Reactive Programming의 주요 개념

- **Data Stream** : 시간에 따라 변하는 **값의 연속적인 흐름**을 나타냅니다.
   - 예를 들어, mouse click event, sensor data, web socket message 등이 data stream이 될 수 있습니다.

- **Observer Pattern** : **Subject(주체)와 Observer(관찰자)의 관계**를 정의합니다.
   - Subject는 data의 변화를 감지하고, Observer는 그 변화를 받아 처리합니다.
   - Reactive Programming에서는 주로 Observable(주체)과 Observer(관찰자)의 형태로 구현됩니다.

- **연산자** : 연산자(operator)는 **data stream을 변환하고 조작하는 함수**들입니다.
	- `map`, `filter`, `reduce` 등의 연산자를 통해 stream의 data를 원하는 형태로 가공할 수 있습니다.

- **비동기 처리** : Reactive Programming은 **비동기 event를 처리하는 데 중점**을 둡니다.
	- callback이나 promise를 사용하는 대신, stream을 통해 data의 흐름을 관리합니다.


### Reactive Programming의 장점

- **성능 및 확장성** : **비동기 event 처리**를 통해 system의 확장성과 성능을 높일 수 있습니다.
	- 다수의 event를 동시에 처리할 수 있으며, 필요에 따라 system을 병렬로 확장할 수 있습니다.

- **응답성** : data의 변화에 실시간으로 반응하여 **빠른 응답 시간**을 제공합니다.
	- 사용자 경험을 향상시키는 데 도움이 됩니다.

- **유지 보수성** : **data 흐름과 처리가 명확하게 정의**됩니다.
	- code의 가독성과 유지 보수성이 향상됩니다.

- **장애 처리와 회복력** : **오류를 격리**시키고, **다른 component에 영향을 주지 않으면서 정상 동작을 유지**할 수 있습니다.
	- 장애가 발생하더라도 탄력적으로 대응할 수 있습니다.




---




## Rx : ReactiveX : Reactive eXtentions

- Rx(ReactiveX)는 **Reactive Programming의 원칙과 pattern을 구현한 library 집합**입니다.
    - 비동기적인 event 기반 programming을 위한 pattern과 도구를 제공하며, data stream과 event를 효과적으로 처리할 수 있도록 도와줍니다. 
    - 복잡한 비동기 작업을 단순화하고, system의 응답성과 확장성을 향상시킬 수 있습니다.

- Rx는 **다양한 언어와 platform**에서 범용적으로 사용할 수 있도록 여러 구현체가 있으며, 대표적으로 RxJava, RxJS, RxPY 등이 있습니다.
    - 이 구현체를 사용함으로써 **Reactive Programming을 쉽게 구현**할 수 있습니다.


### Rx의 주요 구성

- **Observable** (or Flowable) : **data stream**을 나타내며, 이 stream은 **시간이 지남에 따라 data를 발행**합니다.
    - data는 사용자 입력, network 응답, file 읽기 등의 다양한 source에서 생성될 수 있습니다.

- **Observer** (or Subscriber) : **Observable을 구독**하여 **data stream의 변화에 반응**합니다.
    - Observable은 data를 발행할 때마다 Observer의 `onNext`, `onError`, `onComplete` method를 호출합니다.

- **Operator** : **data stream을 변환하거나 조작하는 함수**들입니다.
    - 예를 들어, `map`, `filter`, `reduce`, `merge` 등의 연산자를 사용하여 stream의 data를 원하는 형태로 가공할 수 있습니다.

- **Scheduler** : **비동기 작업을 실행할 thread 또는 thread pool을 지정**하는 데 사용됩니다.
    - scheduling 기능을 통해 **비동기 작업의 실행 context를 제어**할 수 있습니다.


### Rx의 장점

- **유연성** : 다양한 source의 data를 stream으로 처리할 수 있습니다.
- **가독성** : 비동기 code를 동기 code처럼 작성할 수 있어 가독성이 높아집니다.
- **유지 보수성** : data 흐름과 처리가 명확하게 정의되어 있어 유지 보수성이 향상됩니다.
- **오류 처리** : stream 내에서 발생하는 오류를 일관되게 처리할 수 있습니다.
- **범용성** : 다양한 언어와 platform에 대한 구현체를 지원하여, 여러 환경에서 같은 spec으로 기능을 사용할 수 있습니다.


### RxJava 사용 예시

```java
import io.reactivex.Observable;

public class RxJavaExample {
    public static void main(String[] args) {
        // Observable 생성
        Observable<String> observable = Observable.create(emitter -> {
            emitter.onNext("Hello");
            emitter.onNext("RxJava");
            emitter.onComplete();
        });

        // Observer 생성 및 구독
        observable.subscribe(
            item -> System.out.println("Next: " + item),    // onNext
            error -> System.err.println("Error : " + error),    // onError
            () -> System.out.println("Completed")    // onComplete
        );
    }
}
```


### RxJS 사용 예시

```javascript
const { Observable } = rxjs;

// Observable 생성
const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('RxJS');
    subscriber.complete();
});

// Observer 생성 및 구독
observable.subscribe({
    next(x) { console.log('Next : ' + x); },    // onNext
    error(err) { console.log('Error : ' + err); },    // onError
    complete() { console.log('Completed'); }    // onComplete
});
```


### RxPY 사용 예시

```py
import rx
from rx import operators as ops

# Observable 생성
observable = rx.create(lambda observer, scheduler: [
    observer.on_next("Hello"),
    observer.on_next("RxPY"),
    observer.on_completed()
])

# Observer 생성 및 구독
observable.subscribe(
    on_next=lambda item: print(f"Next : {item}"),    # onNext
    on_error=lambda error: print(f"Error : {error}"),    # onError
    on_completed=lambda: print("Completed")    # onComplete
)
```




---




## RxJava : Java에서 Reactive Programming 구현하기

- RxJava는 Rx의 Java 구현체입니다. 
	- Rx의 개념을 Java에 적용하여, 선언적이고 병렬 처리가 가능한 Reactive Programming을 구현할 수 있도록 합니다.


### RxJava 핵심 개념

- **Observable** : data stream을 생성하고 발행하는 역할을 합니다.

- **Observer** : Observable을 구독하여 발행된 data를 처리합니다.

- **Operators** : data stream을 변환하고 조작하는 함수들입니다.
	- 예를 들어, `map`, `filter`, `flatMap` 등이 있습니다.

- **Schedulers** : 비동기 작업의 실행 context를 정의합니다.
	- 예를 들어, IO 작업을 위한 `Schedulers.io()`, UI thread를 위한 `AndroidSchedulers.mainThread()` 등이 있습니다.


### 예제 1 : RxJava의 기본적인 사용법

- "Hello"와 "RxJava" 문자열을 발행하는 `Observable`을 생성하고, 이를 구독하여 data를 처리하는 `Observer`를 정의합니다.
	- 구독이 시작되면 `Observer`는 `onSubscribe`, `onNext`, `onComplete` method를 통해 data의 흐름(data stream)을 처리합니다.

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

- 연산자를 사용하여 data stream 변환하고 조작할 수 있습니다.

- 연산자를 활용하여 data stream을 filtering하고 변환하는 예제입니다.
	- 숫자 배열을 `Observable`로 변환한 후, 짝수만 filtering하고 각 값을 2배로 변환하는 연산자를 적용합니다.
        - 결과는 비동기로 처리되어 출력됩니다.
	- `Schedulers.io()`와 `Schedulers.single()`을 사용하여 작업을 background thread와 단일 thread에서 처리합니다.

```java
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.observers.DisposableObserver;

public class RxJavaOperatorsExample {
    public static void main(String[] args) {
        Observable<Integer> observable = Observable.fromArray(1, 2, 3, 4, 5)
                .filter(num -> num % 2 == 0)    // 짝수 filtering
                .map(num -> num * 2)    // 각 값을 2배로 변환
                .subscribeOn(Schedulers.io())    // IO scheduler에서 실행
                .observeOn(Schedulers.single());    // 단일 thread에서 관찰

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


### 예제 3 : Network 요청 처리

- RxJava는 network 요청과 같은 비동기 작업을 처리하는 데 매우 유용합니다.

- RxJava를 사용하여 network 요청을 처리하는 예제입니다.
	- `OkHttpClient`를 사용하여 GitHub API에 network 요청을 보내고, 그 결과를 `Observable`을 통해 처리합니다.
	- `Schedulers.io()`를 사용하여 network 요청을 background thread에서 처리합니다.
    - `AndroidSchedulers.mainThread()`를 사용하여 결과를 main thread에서 처리합니다.

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
