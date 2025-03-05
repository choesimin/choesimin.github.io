---
layout: skill
permalink: /53
title: TensorFlow.js - JavaScript로 지도 학습 구현하기
description: TensorFlow.js를 사용하여 JavaScript로 지도 학습을 구현할 수 있습니다.
date: 2023-08-04
---


## TensorFlow.js

- TensorFlow.js는 TensorFlow(Python machine learning library)의 기능을 제공하는 JavaScript library입니다.


---


## TensorFlow.js로 지도 학습 구현하기

- 예측하고 싶은 종속 변수가 숫자일 때, 지도 학습의 회귀(regression)를 이용합니다.
- 예측하고 싶은 종속 변수가 분류 형태일 때, 지도 학습의 분류(classification)를 이용합니다.

- TensorFlow.js 지도 학습 구현은 크게 다섯 개의 과정으로 구분할 수 있습니다.
    1. TensorFlow.js를 Import합니다.
    2. 학습 Data를 준비합니다.
    3. Model의 모양을 정의합니다.
    4. Data로 Model을 학습(fit)시킵니다.
    5. Model을 이용합니다.

- 회귀와 분류는 모두 지도 학습에 속하기 때문에 학습 단계가 동일합니다.
    - 회귀의 종속 변수는 sequential한 숫자입니다.
    - 분류의 종속 변수는 One-Hot Encoding하여 사용해야 합니다.


---


## 1. TensorFlow.js Import

- TensorFlow.js는 JavaScript를 실행할 수 있는 환경(Web browser, Node.js)에서 사용할 수 있습니다.


### 1.1. Web Browser Import

```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"> </script>
    </head>
</html>
```


### 1.2. Node.js Import

```sh
npm install @tensorflow/tfjs-node
```

```js
const tf = require('@tensorflow/tfjs')
```


---


## 2. 학습 Data 준비하기

- 원인 data(독립 변수 `x`)와 결과 data(종속 변수 `y`)가 필요하며, 학습할 수 있을 정도로 충분해야 합니다.
- 분류 학습을 위한 종속 변수는 One-Hot Encoding하여 준비합니다.
    - One-Hot Encoding은 Danfo.js의 data 변환 기능을 사용하는 것을 권장합니다.
        - Danfo.js는 TensorFlow.js와 호환성이 좋은 고성능 data structure를 제공하는 library입니다.


### 2.1. 학습 Data를 배열로 준비하기

- 학습에 사용할 과거의 data를 2차원 배열 형태로 준비합니다.
    - 변수가 한 개일 때는 1차원 배열로 표현할 수도 있습니다.

```js
// 하나의 독립 변수와 하나의 종속 변수.
// y = 2x
var trainX = [[20], [21], [22], [23]];    // or [20, 21, 22, 23]
var trainY = [[40], [42], [44], [46]];    // or [40, 42, 44, 46]
```

```js
// 여러 개의 독립 변수와 하나의 종속 변수.
// y = x1 + x2 + x3 + x4 + x5
var trainX = [
    [1, 5, 3, 8, 9],
    [4, 1, 3, 3, 9],
    [3, 2, 9, 1, 2]
];
var trainY = [[26], [20], [17]];    // or [26, 20, 17]
```

```js
// 여러 개의 독립 변수와 여러 개의 종속 변수.
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

```js
// 독립 변수와 분류를 위해 One-Hot Encoding한 종속 변수.
var trainX = [
    [130, 5, 0, 20],
    [2, 209, 43, 53],
    [49, 4, 21, 2]
];
var trainY = [
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]
];
```


### 2.2. 배열 Data를 Tensor로 변환하기

- TensorFlow는 Tensor 형태의 data를 사용합니다.
- 따라서 배열 data를 Tensor로 변환하는 과정이 필요합니다.

```js
var trainTensorX = tf.tensor(trainX);
var trainTensorY = tf.tensor(trainY);
```


---


## 3. Model 정의하기


### 3.1 Layer 정의하기

- 입력층(input layer), 출력층(output layer), 은닉층(hidden layer)을 정의합니다.
- 입력층의 `shape`에는 독립 변수의 갯수를 입력합니다.
- 출력층의 `units`에는 종속 변수의 갯수를 입력합니다.

#### 3.1.1. 회귀와 분류의 공통적인 Layer 정의

```js
// 독립 변수와 종속 변수가 한 개일 때.
var inputLayer = tf.input({shape: [1]});
var outputLayer = tf.layers.dense({units: 1}).apply(inputLayer);
```

```js
// 독립 변수가 12개, 종속 변수가 2개일 때.
var inputLayer = tf.input({shape: [12]});
var outputLayer = tf.layers.dense({units: 2}).apply(inputLayer);
```

```js
// 깊은 학습(deep learning)을 하고 싶다면, 입력층과 출력층의 사이에 은닉층를 추가합니다.
var inputLayer = tf.input({shape: [12]});
var hiddenLayer1 = tf.layers.dense({units: 12, activation: 'relu'}).apply(inputLayer);
var hiddenLayer2 = tf.layers.dense({units: 12, activation: 'relu'}).apply(hiddenLayer1);
var outputLayer = tf.layers.dense({units: 2}).apply(hiddenLayer2);
```

#### 3.1.2. 분류를 구현할 때의 추가적인 Parameter

- 분류를 위한 출력층에는 parameter에 `activation: 'softmax'`를 추가합니다.

```js
var outputLayer = tf.layers.dense({units: 3, activation: 'softmax'}).apply(inputLayer);
```


### 3.2. Model Compile하기

- 입력층과 출력층으로 model을 정의하고, 정의한 model을 compile합니다.
- model을 compile할 때 compile parameter가 필요한데, 회귀와 분류의 설정값이 서로 다릅니다.

#### 3.2.1. 회귀 Model Compile하기

- compile parameter의 `loss`를 `tf.losses.meanSquaredError`로 설정합니다.

```js
var model = tf.model({inputs: inputLayer, outputs: outputLayer});
var compileParam = {
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError
};
model.compile(compileParam);
```

#### 3.2.1. 분류 Model Compile하기

- compile parameter의 `loss`를 `'categoricalCrossentropy'`로, `metrics`를 `['accuracy']`로 설정합니다.

```js
var model = tf.model({inputs: inputLayer, outputs: outputLayer});
var compileParam = {
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
};
model.compile(compileParam);
```


---


## 4. Model 학습시키기

- 준비한 학습 data로 model을 학습(fit)시킵니다.


### 4.1. 학습 Parameter 설정하기

| Parameter | 설명 |
| --- | --- |
| epochs | 학습의 반복 횟수입니다.<br>값을 반드시 지정해야 합니다. |
| callbacks | 학습에 대한 추가적인 행동(callback function)를 정의하며, 행동이 필요하지 않다면 `callbacks`은 학습 parameter에서 제외해도 됩니다.<br>epoch가 끝난 시점(`onEpochEnd`)에 `log`를 출력하여, 학습 상태를 실시간으로 확인할 수 있습니다. |

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


### 4.2. Model 학습시키기

- 학습을 위해 준비한 data와 설정한 학습 parameter로 model을 학습시킵니다.

```js
model.fit(trainTensorX, trainTensorY, fitParam);
```


### 4.3. 학습이 완료된 Model 저장하기

- `save` 함수를 이용하여 학습이 완료된 model을 저장할 수 있습니다.

```js
model.save('downloads://sample');
```

```js
// Web browser를 사용한다면 localstorage에 저장할 수도 있습니다.
model.save('localstorage://sample');
```


---


## 5. Model 이용하기


### 5.1. 기존 Data를 이용하여 학습이 잘 되었는지 확인하기

- 생성한 model에 결과를 알고 있는 data를 넣어, 결과 값과 model의 예측 값을 비교합니다.
- 두 값이 비슷하다면 model을 그대로 사용하면 됩니다.
- 차이가 크다면 model을 더 학습시키거나, 학습 data를 조정하여 다시 학습시켜야 합니다.

```js
var predictTensorY = model.predict(trainTensorX);
predictTensorY.print();
```


### 5.2. 새로운 Data를 입력하여 Model 이용하기

- 학습 data를 만들 때와 마찬가지로, 배열로 표현된 새로운 data를 Tensor로 변환하여 사용합니다.

```js
var predictX = [[18], [19]];    // or [18, 19]
var predictTensorX = tf.tensor(predictX);

var predictTensorY = model.predict(predictTensorX);
predictTensorY.print();
```


### 5.3. 저장해 둔 Model 사용하기

```js
var predictX = [[18], [19]];    // or [18, 19]
var predictTensorX = tf.tensor(predictX);

tf.loadLayersModel('downloads://sample').then(function (model) {
    var predictTensorY = model.predict(predictTensorX);
    predictTensorY.print();
});
```


---


## 회귀 예제 1. 독립 변수와 종속 변수가 한 개

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
        };
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


## 회귀 예제 2. 독립 변수와 종속 변수가 여러 개

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
        };
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


## 회귀 예제 3. 독립 변수와 종속 변수가 여러 개일 때 깊은 학습(deep learning)

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
        var hiddenLayer1 = tf.layers.dense({units: 5, activation: 'relu'}).apply(inputLayer);
        var hiddenLayer2 = tf.layers.dense({units: 5, activation: 'relu'}).apply(hiddenLayer1);
        var outputLayer = tf.layers.dense({units: 2}).apply(hiddenLayer1);
        var model = tf.model({inputs: inputLayer, outputs: outputLayer});

        var compileParam = {
            optimizer: tf.train.adam(),
            loss: tf.losses.meanSquaredError
        };
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


## 회귀 예제 4. Model을 저장하고, 저장한 Model을 사용하기

- Web browser의 localstorage에 저장합니다.


### Model을 학습시키고 저장하기

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
        };
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

### Model을 사용하기

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


## 분류 예제 1. 3개의 범주로 분류하기

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
            [130, 5, 0, 20],
            [2, 209, 43, 53],
            [49, 4, 21, 2],
            // ...
        ];
        var trainY = [
            [1, 0, 0],
            [0, 0, 1],
            [0, 1, 0],
            // ...
        ];
        var trainTensorX = tf.tensor(trainX);
        var trainTensorY = tf.tensor(trainY);

        var inputLayer = tf.input({shape: [4]});
        var hiddenLayer = tf.layers.dense({units: 4, activation: 'relu'}).apply(inputLayer);
        var outputLayer = tf.layers.dense({units: 3, activation:'softmax'}).apply(hiddenLayer);
        var model = tf.model({inputs: inputLayer, outputs: outputLayer});

        var compileParam = {
            optimizer: tf.train.adam(),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        };
        model.compile(compileParam);

        var fitParam = {
            epochs: 3000,
            callbacks: {onEpochEnd: function(epoch, logs) {console.log('epoch', epoch, logs)}}
        };
        model.fit(trainTensorX, trainTensorY, fitParam).then(function (result) {
            var predictX = [[10, 25, 39, 239]];
            var predictTensorX = tf.tensor(predictX);
            var predictTensorY = model.predict(predictTensorX);
            predictTensorY.print();
        });
    </script>
</body>
</html>
```


## 분류 예제 2 : Danfo.js를 사용하여 분류하기

- Danfo.js를 사용하여 분류를 위한 data 전처리를 쉽게 할 수 있습니다.

```html
<html>
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/danfojs@0.1.2/dist/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.4.0/dist/tf.min.js"></script>
</head>
<body>
<script>
    dfd.read_csv('https://raw.githubusercontent.com/blackdew/tensorflow1/master/csv/iris.csv').then(function(data) {
        var encoder = new dfd.OneHotEncoder();

        var trainX = data.loc({columns: ['꽃잎길이', '꽃잎폭', '꽃받침길이', '꽃받침폭']});
        var trainY = encoder.fit(data['품종']);

        var inputLayer = tf.input({shape: [4]});
        var hiddenLayer = tf.layers.dense({units: 4, activation:'relu'}).apply(inputLayer);
        var outputLayer = tf.layers.dense({units: 3, activation:'softmax'}).apply(hiddenLayer);

        var model = tf.model({inputs: inputLayer, outputs:outputLayer });
        var compileParam = {optimizer: tf.train.adam(), loss: 'categoricalCrossentropy', metrics: ['accuracy']};
        model.compile(compileParam);

        var fitParam = {
          epochs: 500,
          callbacks: {onEpochEnd: function(epoch, logs) {console.log('epoch', epoch, logs);}}
        };
        model.fit(trainX.tensor, trainY.tensor, fitParam).then(function(result) {
            var predictY = new dfd.DataFrame(model.predict(trainX.tensor));
            predictY.print();
            trainY.print();
        });
    });
</script>
</body>
</html>
```


---


## Reference

- <https://opentutorials.org/course/4628>
- <https://opentutorials.org/course/4643>
