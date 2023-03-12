---
layout: note
---

# 복원

## DB 복원

```sh
mysql -u [user_id] -p [password] [database_name_to_restore] < [backup_database].sql

# example
mysql -u test_user -p test_db < backup_test_db.sql
passowrd : 123456
```

## Table 복원

```sh
mysql -u [user_id] -p [password] [database_name_to_restore] < [backup_table].sql

# example
mysql -u test_user -p 123456 test_db < backup_test_table.sql
passowrd : 123456
```




---

# Reference

- https://server-talk.tistory.com/30