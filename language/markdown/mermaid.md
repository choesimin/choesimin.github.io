# Mermaid

- Markdown 문법으로 diagram을 그려주는 library

---

## Flowchart

## Flow Chart OrientationPermalink

- 그림이 그려지는 방향

1. `TD` (or `TB`) : Top to Down
2. `LR` : Left to Right
3. `BT` : Bottom to Top
4. `RL` : Right to Left

## Node and ShapePermalink

1. `nodeID[text]` : nodeID를 ID로 가지고 text를 표시해주는 직사각형 node를 만듬
2. `nodeID(text)` : 코너가 둥그런 직사각형 node를 만듬
3. `nodeID[(text)]` : 원통형 node를 만듬 (ex. Database)
4. `nodeID((text))` : 원 모양의 node를 만듬
5. `nodeID{text}` : 마름모 모양의 node를 만듬

## EdgePermalink

- 화살표 모양을 길게 하면 실제로 길어짐
    - `==>`보다 `=====>`로 하면 훨씬 길게 그려짐

1. `nodeID1 --> nodeID2` : nodeID1와 nodeID2를 화살표로 연결함
2. `nodeID1 --- nodeID2` : nodeID1와 nodeID2를 직선으로 연결함
3. `nodeID1 ---|Text| nodeID2` : nodeID1와 nodeID2를 직선으로 text와 함께 연결함
4. `nodeID1 -->|Text| nodeID2` : nodeID1와 nodeID2를 화살표로 text와 함께 연결함
5. `nodeID1 -.-> nodeID2` : nodeID1와 nodeID2를 점선 화살표로 text와 함께 연결함
6. `nodeID1 ==> nodeID2` : nodeID1와 nodeID2를 두꺼운 화살표로 text와 함께 연결함

### Example

```mermaid
flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

<pre>
```mermaid
flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```
</pre>

```mermaid
flowchart LR

subgraph subG1 
    a1 --> a2;
end

subgraph subG2
    b1 ==> b2;
end
a1 -.-> b1;
```

<pre>
```mermaid
flowchart LR

subgraph subG1 
    a1 --> a2;
end

subgraph subG2
    b1 ==> b2;
end
a1 -.-> b1;
```
</pre>

---

## Sequence diagram

```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

<pre>
```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```
</pre>
- 위의 ```loop```는 ```alt```, ```opt```로 바꿔서 rectangle container를 생성할 수도 있음

---

## Gantt chart

```mermaid
gantt
    section Section
    Completed :done,    des1, 2014-01-06,2014-01-08
    Active        :active,  des2, 2014-01-07, 3d
    Parallel 1   :         des3, after des1, 1d
    Parallel 2   :         des4, after des1, 1d
    Parallel 3   :         des5, after des3, 1d
    Parallel 4   :         des6, after des4, 1d
```

<pre>
```mermaid
gantt
    section Section
    Completed :done,    des1, 2014-01-06,2014-01-08
    Active        :active,  des2, 2014-01-07, 3d
    Parallel 1   :         des3, after des1, 1d
    Parallel 2   :         des4, after des1, 1d
    Parallel 3   :         des5, after des3, 1d
    Parallel 4   :         des6, after des4, 1d
```
</pre>

---

## Class diagram

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<Interface>> Class01
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --o C4
Class09 .. C5
Class09 ..> C6
Class09 ..|> C7
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
```

<pre>
```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<Interface>> Class01
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --o C4
Class09 .. C5
Class09 ..> C6
Class09 ..|> C7
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
```
</pre>

---

## State diagram

```mermaid
stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
```

<pre>
```mermaid
stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
```
</pre>

---

## Pie chart

```mermaid
pie
"Dogs" : 386
"Cats" : 85.9
"Rats" : 15
```

<pre>
```mermaid
pie
"Dogs" : 386
"Cats" : 85.9
"Rats" : 15
```
</pre>

---

## Git graph

```mermaid
gitGraph
  commit
  commit
  branch develop
  checkout develop
  commit
  commit
  checkout main
  merge develop
  commit
  commit
```

<pre>
```mermaid
gitGraph
  commit
  commit
  branch develop
  checkout develop
  commit
  commit
  checkout main
  merge develop
  commit
  commit
```
</pre>

---

## User Journey diagram 

```mermaid
journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 3: Me
```

<pre>
```mermaid
journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 3: Me
```
</pre>

---

# Reference

- https://github.com/mermaid-js/mermaid#sequence-diagram-docs---live-editor
    - mermaid
- https://frhyme.github.io/mermaid/mermaid_basic00/
    - flowchart