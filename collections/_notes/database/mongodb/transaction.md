---
layout: note
permalink: /243
title: MongoDB Transaction - ACID 보장과 Data 일관성
description: transaction은 여러 작업을 원자적으로 처리하여 data 일관성을 보장합니다.
date: 2025-10-31
---


## Transaction : 원자적 작업 단위

- **transaction**은 여러 작업을 하나의 논리적 단위로 묶어 원자적으로 처리하는 기능입니다.
    - 모든 작업이 성공하거나, 하나라도 실패하면 전체가 rollback됩니다.

- MongoDB는 version 4.0부터 multi-document transaction을 지원합니다.
    - replica set에서 사용할 수 있으며, 4.2부터는 sharded cluster에서도 지원됩니다.

- transaction은 ACID 특성을 보장합니다.


---


## ACID 특성

- transaction이 보장하는 네 가지 핵심 특성으로 Atomicity(원자성), Consistency(일관성), Isolation(격리성), Durability(지속성)이 있습니다.


### Atomicity (원자성)

- transaction 내의 모든 작업은 전부 성공하거나 전부 실패합니다.
    - 부분적인 성공은 없습니다.

```js
// 계좌 이체 예시
session.startTransaction();
try {
    // A 계좌에서 출금
    db.accounts.updateOne(
        { _id: accountA },
        { $inc: { balance: -100 } }
    );

    // B 계좌에 입금
    db.accounts.updateOne(
        { _id: accountB },
        { $inc: { balance: 100 } }
    );

    session.commitTransaction();  // 둘 다 성공
} catch (error) {
    session.abortTransaction();   // 하나라도 실패하면 전체 rollback
}
```


### Consistency (일관성)

- transaction은 database를 하나의 일관된 상태에서 다른 일관된 상태로 전환합니다.
    - 제약 조건과 규칙이 유지됩니다.
    - 계좌 이체 후에도 총 금액은 변하지 않습니다.


### Isolation (격리성)

- 동시에 실행되는 transaction들은 서로 간섭하지 않습니다.
    - 한 transaction의 중간 상태는 다른 transaction에 보이지 않습니다.

- MongoDB는 snapshot isolation을 제공합니다.


### Durability (지속성)

- commit된 transaction의 결과는 영구적으로 저장됩니다.
    - system 장애가 발생해도 data가 유지됩니다.

- write concern과 journal을 통해 보장됩니다.


---


## Transaction 사용법

- MongoDB에서 transaction을 사용하기 위해 session 생성, transaction 시작 및 commit, callback API 방식 등의 방법을 제공합니다.


### Session 생성

```js
// session 시작
const session = db.getMongo().startSession();
```

- transaction은 session을 통해 관리됩니다.
    - 모든 transaction 작업은 session과 연결되어야 합니다.


### Transaction 시작 및 Commit

```js
const session = db.getMongo().startSession();

// transaction 시작
session.startTransaction();

try {
    // transaction 내에서 작업 수행
    const ordersCollection = session.getDatabase("shop").orders;
    const inventoryCollection = session.getDatabase("shop").inventory;

    // 주문 생성
    ordersCollection.insertOne({
        orderId: 123,
        item: "laptop",
        quantity: 1
    }, { session });

    // 재고 감소
    inventoryCollection.updateOne(
        { item: "laptop" },
        { $inc: { stock: -1 } },
        { session }
    );

    // transaction commit
    session.commitTransaction();
    print("Transaction committed");

} catch (error) {
    // 오류 발생 시 rollback
    session.abortTransaction();
    print("Transaction aborted: " + error);

} finally {
    // session 종료
    session.endSession();
}
```


### Callback API

```js
const session = db.getMongo().startSession();

session.withTransaction(() => {
    const ordersCollection = session.getDatabase("shop").orders;
    const inventoryCollection = session.getDatabase("shop").inventory;

    ordersCollection.insertOne({
        orderId: 123,
        item: "laptop",
        quantity: 1
    }, { session });

    inventoryCollection.updateOne(
        { item: "laptop" },
        { $inc: { stock: -1 } },
        { session }
    );
});

session.endSession();
```

- `withTransaction()`은 자동으로 commit과 abort를 처리합니다.
    - retry logic도 내장되어 있습니다.


---


## Transaction Option

- transaction 동작을 제어하기 위해 Read Concern, Write Concern, Read Preference, maxCommitTimeMS 등의 option을 제공합니다.


### Read Concern

```js
session.startTransaction({
    readConcern: { level: "snapshot" }
});
```

- transaction이 읽을 data의 일관성 수준을 지정합니다.

| Level | 설명 |
| --- | --- |
| `local` | 최신 data를 읽지만 rollback될 수 있음 |
| `majority` | 과반수 node에 복제된 data만 읽음 |
| `snapshot` | transaction 시작 시점의 일관된 snapshot |

- transaction에서는 `snapshot`이 권장됩니다.


### Write Concern

```js
session.startTransaction({
    writeConcern: { w: "majority", wtimeout: 5000 }
});
```

- write 작업의 성공 기준을 정의합니다.

| Option | 설명 |
| --- | --- |
| `w: 1` | primary node에만 기록 |
| `w: "majority"` | 과반수 node에 복제 (권장) |
| `wtimeout` | write timeout (millisecond) |


### Read Preference

```js
session.startTransaction({
    readPreference: "primary"
});
```

- 어느 node에서 읽을지 지정합니다.

- transaction에서는 `primary`만 지원됩니다.
    - 일관성을 보장하기 위함입니다.


### Transaction Option 예시

```js
session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority", wtimeout: 5000 },
    readPreference: "primary",
    maxCommitTimeMS: 30000
});
```


---


## Transaction 제약 사항

- MongoDB transaction에는 시간 제한, document 크기 제한, DDL 작업 제한, capped collection 제한, cross-shard write 제한 등의 제약 사항이 있습니다.


### 시간 제한

- transaction은 기본적으로 60초 이내에 완료되어야 합니다.
    - `transactionLifetimeLimitSeconds` 설정으로 조정 가능합니다.

- 60초를 초과하면 자동으로 abort됩니다.


### Document 크기 제한

- transaction 내에서 생성되거나 수정되는 document는 16MB 제한을 따릅니다.

- transaction 전체의 oplog entry 크기도 제한이 있습니다.


### DDL 작업 제한

- transaction 내에서 collection이나 index를 생성/삭제할 수 없습니다.
    - `createCollection`, `createIndex`, `drop` 등은 불가능합니다.

```js
// 불가능
session.startTransaction();
db.newCollection.insertOne({ name: "test" }, { session });  // ERROR
```

- collection은 transaction 전에 미리 생성해야 합니다.


### Capped Collection 제한

- capped collection에 대한 write는 transaction에서 지원되지 않습니다.


### Cross-Shard Write

- sharded cluster에서 같은 transaction 내에서 여러 shard에 write하는 것은 제한이 있습니다.
    - MongoDB 4.2 이상에서 지원되지만 성능 고려가 필요합니다.


---


## Transaction 성능 최적화

- transaction을 효율적으로 사용하기 위해 transaction 크기 최소화, lock 경합 최소화, retry logic 구현, index 활용 등의 전략을 적용합니다.


### Transaction 크기 최소화

- transaction에 포함되는 작업 수를 최소화합니다.
    - transaction이 클수록 성능 저하와 충돌 가능성이 증가합니다.

```js
// 나쁜 예 : 대량의 document를 transaction에 포함
session.startTransaction();
for (let i = 0; i < 10000; i++) {
    db.collection.insertOne({ data: i }, { session });
}
session.commitTransaction();

// 좋은 예 : bulk write 사용 또는 transaction 분할
```


### Lock 경합 최소화

- 동일한 document를 수정하는 transaction들은 lock 경합이 발생합니다.

- 가능하면 다른 document를 수정하도록 설계합니다.


### Retry Logic 구현

```js
function runTransactionWithRetry(txnFunc, session) {
    while (true) {
        try {
            txnFunc(session);
            break;
        } catch (error) {
            if (error.hasErrorLabel("TransientTransactionError")) {
                print("TransientTransactionError, retrying...");
                continue;
            } else {
                throw error;
            }
        }
    }
}
```

- 일시적 오류는 재시도로 해결할 수 있습니다.
    - MongoDB driver는 자동 재시도를 지원합니다.


### Index 활용

- transaction 내에서 사용되는 query에 적절한 index를 생성합니다.
    - lock 시간을 줄이고 성능을 향상시킵니다.


---


## 실무 Transaction Pattern

- 실무에서 자주 사용되는 계좌 이체, 주문 및 재고 관리, 예약 system 등의 transaction pattern을 소개합니다.


### 계좌 이체

```js
function transferMoney(fromAccount, toAccount, amount) {
    const session = db.getMongo().startSession();

    session.startTransaction({
        readConcern: { level: "snapshot" },
        writeConcern: { w: "majority" }
    });

    try {
        const accounts = session.getDatabase("bank").accounts;

        // 출금 계좌 잔액 확인
        const from = accounts.findOne(
            { _id: fromAccount },
            { session }
        );

        if (from.balance < amount) {
            throw new Error("Insufficient funds");
        }

        // 출금
        accounts.updateOne(
            { _id: fromAccount },
            { $inc: { balance: -amount } },
            { session }
        );

        // 입금
        accounts.updateOne(
            { _id: toAccount },
            { $inc: { balance: amount } },
            { session }
        );

        // 거래 기록 생성
        const transactions = session.getDatabase("bank").transactions;
        transactions.insertOne({
            from: fromAccount,
            to: toAccount,
            amount: amount,
            timestamp: new Date()
        }, { session });

        session.commitTransaction();
        print("Transfer successful");

    } catch (error) {
        session.abortTransaction();
        print("Transfer failed: " + error);
        throw error;

    } finally {
        session.endSession();
    }
}
```


### 주문 및 재고 관리

```js
function createOrder(customerId, items) {
    const session = db.getMongo().startSession();

    session.withTransaction(() => {
        const orders = session.getDatabase("shop").orders;
        const inventory = session.getDatabase("shop").inventory;

        // 재고 확인 및 감소
        for (const item of items) {
            const product = inventory.findOne(
                { productId: item.productId },
                { session }
            );

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${item.productId}`);
            }

            inventory.updateOne(
                { productId: item.productId },
                { $inc: { stock: -item.quantity } },
                { session }
            );
        }

        // 주문 생성
        orders.insertOne({
            customerId: customerId,
            items: items,
            status: "pending",
            createdAt: new Date()
        }, { session });
    });

    session.endSession();
}
```


### 예약 System

```js
function bookSeat(userId, seatId) {
    const session = db.getMongo().startSession();

    session.startTransaction();

    try {
        const seats = session.getDatabase("cinema").seats;
        const bookings = session.getDatabase("cinema").bookings;

        // 좌석 상태 확인
        const seat = seats.findOne(
            { _id: seatId, status: "available" },
            { session }
        );

        if (!seat) {
            throw new Error("Seat not available");
        }

        // 좌석 예약
        seats.updateOne(
            { _id: seatId },
            { $set: { status: "booked", bookedBy: userId } },
            { session }
        );

        // 예약 기록 생성
        bookings.insertOne({
            userId: userId,
            seatId: seatId,
            bookedAt: new Date()
        }, { session });

        session.commitTransaction();

    } catch (error) {
        session.abortTransaction();
        throw error;

    } finally {
        session.endSession();
    }
}
```


---


## Transaction vs Single Document Atomicity

- MongoDB는 single document 작업에 대해 기본적으로 원자성을 보장하므로, single document atomicity와 multi-document transaction의 선택 기준을 이해해야 합니다.


### Single Document Atomicity

```js
// 하나의 document update는 원자적
db.accounts.updateOne(
    { _id: accountId },
    {
        $inc: { balance: 100 },
        $push: { transactions: { amount: 100, date: new Date() } }
    }
);
```

- single document 작업은 자동으로 원자적입니다.
    - transaction 없이도 안전합니다.

- embedded document를 활용하면 transaction 없이도 복잡한 작업이 가능합니다.


### Multi-Document Transaction

```js
// 여러 document를 수정할 때는 transaction 필요
session.startTransaction();

db.accounts.updateOne(
    { _id: accountA },
    { $inc: { balance: -100 } },
    { session }
);

db.accounts.updateOne(
    { _id: accountB },
    { $inc: { balance: 100 } },
    { session }
);

session.commitTransaction();
```


### 선택 기준

| 상황 | 권장 방법 |
| --- | --- |
| single document 수정 | transaction 불필요 |
| embedded document 활용 가능 | transaction 불필요 |
| 여러 document 간 일관성 필요 | transaction 필요 |
| 여러 collection 간 작업 | transaction 필요 |
| 조건부 작업 (read-modify-write) | transaction 필요 |

- 가능하면 schema를 잘 설계하여 transaction을 최소화하는 것이 좋습니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/transactions/>
- <https://www.mongodb.com/docs/manual/core/transactions-production-consideration/>
- <https://www.mongodb.com/docs/manual/core/write-operations-atomicity/>

