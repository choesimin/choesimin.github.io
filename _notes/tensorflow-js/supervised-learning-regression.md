---
layout: note
title: TensorFlow.js - 지도 학습의 회귀 구현하기
date: 2023-08-04
---




- 예측하고 싶은 종속 변수가 숫자일 때, 지도 학습의 회귀를 사용할 수 있습니다.




---




## 회귀 구현하기

- TensorFlow.js 회귀 구현은 크게 다섯 개의 과정으로 구분할 수 있습니다.

1. TensorFlow.js를 Import합니다.
2. 과거의 Data를 준비합니다.
3. Model의 모양을 정의합니다.
4. Data로 Model을 학습(fit)시킵니다.
5. Model을 이용합니다.


### 1. TensorFlow.js Import

- TensorFlow.js는 JavaScript를 실행할 수 있는 환경(Web browser, Node.js)에서 사용할 수 있습니다.

#### 1.1. Web Browser Import

```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"> </script>
    </head>
</html>
```

#### 1.2. Node.js Import

```sh
npm install @tensorflow/tfjs-node
```

```js
const tf = require('@tensorflow/tfjs')
```


### 2. 학습 Data 준비하기

- 원인 data(독립 변수 X)와 결과 data(종속 변수 Y)가 필요하며, 학습할 수 있을 정도로 충분해야 합니다.

#### 2.1. 과거의 Data를 배열로 준비하기

- 학습에 사용할 과거의 data를 2차원 배열 형태로 준비합니다.
    - 변수가 한 개일 때는 1차원 배열로 표현할 수도 있습니다.

```js
// 독립 변수와 종속 변수가 한 개일 때
// y = 2x
var trainX = [[20], [21], [22], [23]];    // or [20, 21, 22, 23]
var trainY = [[40], [42], [44], [46]];    // or [40, 42, 44, 46]
```

```js
// 독립 변수는 여러 개, 종속 변수는 한 개일 때
// y = x1 + x2 + x3 + x4 + x5
var trainX = [
    [1, 5, 3, 8, 9],
    [4, 1, 3, 3, 9],
    [3, 2, 9, 1, 2]
];
var trainY = [[26], [20], [17]];    // or [26, 20, 17]
```

```js
// 독립 변수와 종속 변수가 여러 개일 때
// y1 = x1 + x2 + x3 + x4 + x5
// y2 = x1 × x2 × x3 × x4 × x5
var trainX = [
    [1, 5, 3, 8, 9],
    [4, 1, 3, 3, 9],
    [3, 2, 9, 1, 2]
];
var trainY = [
    [26, 1080],
    [20, 324],
    [17, 108]
];
```

#### 2.2. 배열 Data를 Tensor로 변환하기

- TensorFlow는 Tensor 형태의 data를 사용합니다.
- 따라서 배열 data를 Tensor로 변환하는 과정이 필요합니다.

```js
var trainTensorX = tf.tensor(trainX);
var trainTensorY = tf.tensor(trainY);
```


### 3. Model 정의하기

#### 3.1 Layer 정의하기

- input layer, output layer, hidden layer를 정의합니다.
- input layer의 `shape`에는 독립 변수의 갯수를 입력합니다.
- output layer의 `units`에는 종속 변수의 갯수를 입력합니다.

```js
// 독립 변수와 종속 변수가 한 개일 때
var inputLayer = tf.input({shape: [1]});
var outputLayer = tf.layers.dense({units: 1}).apply(inputLayer);
```

```js
// 독립 변수가 12개, 종속 변수가 2개일 때
var inputLayer = tf.input({shape: [12]});
var outputLayer = tf.layers.dense({units: 2}).apply(inputLayer);
```

- 깊은 학습(deep learning)을 하고 싶다면, input layer와 output layer의 사이에 hidden layer를 추가합니다.
- input layer를 hidden layer에, hidden layer를 output layer에 연결합니다.

```js
var inputLayer = tf.input({shape: [12]});
var hiddenLayer1 = tf.layers.dense({units: 12, activation: 'relu'}).apply(inputLayer);
var hiddenLayer2 = tf.layers.dense({units: 12, activation: 'relu'}).apply(hiddenLayer1);
var outputLayer = tf.layers.dense({units: 2}).apply(hiddenLayer2);
```

#### 3.2. Model Compile하기

- 정의한 layer로 model을 compile합니다.

```js
var model = tf.model({inputs: inputLayer, outputs: outputLayer});
var compileParam = {optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError}
model.compile(compileParam);
```


### 4. Model 학습시키기

- 준비한 학습 data로 model을 학습(fit)시킵니다.

#### 4.1. 학습 인자 설정하기

- 인자의 `epochs`는 학습을 반복할 횟수를 의미합니다.

```js
var fitParam = {
    epochs: 100
};
```

- 학습 과정을 보고 싶다면, callback 함수를 추가합니다.
    - loss를 확인하여 유효한 model이 나올 때까지 학습을 반복하는 것이 일반적입니다.

```js
var fitParam = {
    epochs: 100,
    callbacks: {
        onEpochEnd: function(epoch, logs) {
            console.log('epoch', epoch, logs);
        }
    }
};
```

#### 4.2. 학습시키기

- 학습을 위해 준비한 data와 설정한 학습 인자로 model을 학습시킵니다.

```js
model.fit(trainTensorX, trainTensorY, fitParam);
```

#### 4.3. 학습이 완료된 Model 저장하기

- `save` 함수를 이용하여 학습이 완료된 model을 저장할 수 있습니다.

```js
model.save('downloads://sample');
```

```js
// Web browser를 사용한다면 localstorage에 저장할 수도 있습니다.
model.save('localstorage://sample');
```


### 5. Model 이용하기

#### 5.1. 기존 Data를 이용하여 학습이 잘 되었는지 확인하기

```js
var predictTensorY = model.predict(trainTensorX);
predictTensorY.print();
```

#### 5.2. 새로운 Data를 입력하여 Model 이용하기

- 학습 data를 만들 때와 마찬가지로, 배열로 표현된 새로운 data를 Tensor로 변환하여 사용합니다.

```js
var predictX = [[18], [19]];    // or [18, 19]
var predictTensorX = tf.tensor(predictX);

var predictTensorY = model.predict(predictTensorX);
predictTensorY.print();
```

#### 5.3. 저장해 둔 Model 이용하기

```js
var predictX = [[18], [19]];    // or [18, 19]
var predictTensorX = tf.tensor(predictX);

tf.loadLayersModel('downloads://sample').then(function (model) {
    var predictTensorY = model.predict(predictTensorX);
    predictTensorY.print();
});
```




---




## 예제 1. 독립 변수와 종속 변수가 한 개

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
</head>
<body>
    <script>
        var trainX = [20, 21, 22, 23];
        var trainY = [40, 42, 44, 46];
        var trainTensorX = tf.tensor(trainX);
        var trainTensorY = tf.tensor(trainY);

        var inputLayer = tf.input({shape: [1]});
        var outputLayer = tf.layers.dense({units: 1}).apply(inputLayer);
        var model = tf.model({inputs: inputLayer, outputs: outputLayer});

        var compileParam = {
            optimizer: tf.train.adam(),
            loss: tf.losses.meanSquaredError
        }
        model.compile(compileParam);

        var fitParam = {
            epochs: 3000,
            callbacks: {onEpochEnd: function(epoch, logs) {console.log('epoch', epoch, logs)}}
        };
        model.fit(trainTensorX, trainTensorY, fitParam).then(function (result) {
            var predictX = [18, 19];
            var predictTensorX = tf.tensor(predictX);
            var predictTensorY = model.predict(predictTensorX);
            predictTensorY.print();
        });
    </script>
</body>
</html>
```


## 예제 2. 독립 변수와 종속 변수가 여러 개

- 실제로는 학습 data가 훨씬 많아야 합니다.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
</head>
<body>
    <script>
        var trainX = [
            [1, 5, 3, 8, 9],
            [4, 1, 3, 3, 9],
            [3, 2, 9, 1, 2]
        ];
        var trainY = [
            [26, 1080],
            [20, 324],
            [17, 108]
        ];
        var trainTensorX = tf.tensor(trainX);
        var trainTensorY = tf.tensor(trainY);

        var inputLayer = tf.input({shape: [5]});
        var outputLayer = tf.layers.dense({units: 2}).apply(inputLayer);
        var model = tf.model({inputs: inputLayer, outputs: outputLayer});

        var compileParam = {
            optimizer: tf.train.adam(),
            loss: tf.losses.meanSquaredError
        }
        model.compile(compileParam);

        var fitParam = {
            epochs: 3000,
            callbacks: {onEpochEnd: function(epoch, logs) {console.log('epoch', epoch, logs)}}
        };
        model.fit(trainTensorX, trainTensorY, fitParam).then(function (result) {
            var predictX = [[5, 1, 7, 9, 2]];
            var predictTensorX = tf.tensor(predictX);
            var predictTensorY = model.predict(predictTensorX);
            predictTensorY.print();
        });
    </script>
</body>
</html>
```


## 예제 3. Deep Learning : 깊은 학습하기

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
</head>
<body>
    <script>
        var trainX = [
            [1, 5, 3, 8, 9],
            [4, 1, 3, 3, 9],
            [3, 2, 9, 1, 2]
        ];
        var trainY = [
            [26, 1080],
            [20, 324],
            [17, 108]
        ];
        var trainTensorX = tf.tensor(trainX);
        var trainTensorY = tf.tensor(trainY);

        var inputLayer = tf.input({shape: [5]});
        var hiddenLayer1 = tf.layers.dense({units: 5, activation: 'relu'}).apply(inputLayer);
        var hiddenLayer2 = tf.layers.dense({units: 5, activation: 'relu'}).apply(hiddenLayer1);
        var outputLayer = tf.layers.dense({units: 2}).apply(hiddenLayer1);
        var model = tf.model({inputs: inputLayer, outputs: outputLayer});

        var compileParam = {
            optimizer: tf.train.adam(),
            loss: tf.losses.meanSquaredError
        }
        model.compile(compileParam);

        var fitParam = {
            epochs: 3000,
            callbacks: {onEpochEnd: function(epoch, logs) {console.log('epoch', epoch, logs)}}
        };
        model.fit(trainTensorX, trainTensorY, fitParam).then(function (result) {
            var predictX = [[5, 1, 7, 9, 2]];
            var predictTensorX = tf.tensor(predictX);
            var predictTensorY = model.predict(predictTensorX);
            predictTensorY.print();
        });
    </script>
</body>
</html>
```


## 예제 4. Model을 저장하고, 저장한 Model을 사용하기

- Web browser의 localstorage에 저장합니다.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
</head>
<body>
    <script>
        var trainX = [20, 21, 22, 23];
        var trainY = [40, 42, 44, 46];
        var trainTensorX = tf.tensor(trainX);
        var trainTensorY = tf.tensor(trainY);

        var inputLayer = tf.input({shape: [1]});
        var outputLayer = tf.layers.dense({units: 1}).apply(inputLayer);
        var model = tf.model({inputs: inputLayer, outputs: outputLayer});

        var compileParam = {
            optimizer: tf.train.adam(),
            loss: tf.losses.meanSquaredError
        }
        model.compile(compileParam);

        var fitParam = {
            epochs: 3000,
            callbacks: {onEpochEnd: function(epoch, logs) {console.log('epoch', epoch, logs)}}
        };
        model.fit(trainTensorX, trainTensorY, fitParam).then(function (result) {
            model.save('localstorage://sample');
        });
    </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
</head>
<body>
    <script>
        var predictX = [18, 19];
        var predictTensorX = tf.tensor(predictX);

        tf.loadLayersModel('localstorage://sample').then(function (model) {
            var predictTensorY = model.predict(predictTensorX);
            predictTensorY.print();
        });
    </script>
</body>
</html>
```




---




# Reference

- [JS로 만드는 AI : TensorFlow.js (강의) - 생활코딩](https://opentutorials.org/course/4628)
