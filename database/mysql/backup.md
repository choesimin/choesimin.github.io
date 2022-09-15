# DB backup

```sh
mysqldump -u [user_id] -p [password] [original_database_name] > [backup_database_name_to_create].sql

# example
mysqldump -u test_user -p test_db > backup_test_db.sql
passowrd : 123456
```

# Table backup

```sh
mysqldump -u [user_id] -p [password] [database_name] [origin_backup_table_name] > [table_name_to_backup].sql

# example
mysqldump -u test_user -p test_db test_table > backup_test_table.sql
passowrd : 123456
```

# DB restoration

```sh
mysql -u [user_id] -p [password] [database_name_to_restore] < [backup_database].sql

# example
mysql -u test_user -p test_db < backup_test_db.sql
passowrd : 123456
```

# Table restoration

```sh
mysql -u [user_id] -p [password] [database_name_to_restore] < [backup_table].sql

# example
mysql -u test_user -p 123456 test_db < backup_test_table.sql
passowrd : 123456
```

---

# Reference

- https://server-talk.tistory.com/30
