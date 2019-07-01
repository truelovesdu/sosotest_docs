# mysql数据库操作 

![图片](/image/DATASERVICE用户配置value截图.png)

在```准备```或者```断言恢复```中，可以通过关键字或者python内置函数进行mysql数据库操作。<br>
请记住两个概念：图片中 ```=>``` 之前的是**service**，之后的是配置的请求地址。<br>
本图中DB下有两个**service**，分别是default和service1，其中default的配置在关键字调用时可以省略（建议不要省略，便于理解）。<br>

## 关键字模式下的mysqldb操作
```python
###########################################################################################;
# 使用关键字DB_SELECT查询数据库数据，第一个参数是service，第二个参数是sql语句;
ret_data_list = DB_SELECT(service1, select id,name from dbname.tablename where age > 20);
# （若出现解析错误等异常问题，请把sql写为变量并调用），如下：;
sql = select id,name from dbname.tablename where age > 20;
ret_data_list2 = DB_SELECT(service1, $VAR[sql] );
###########################################################################################;
# 使用关键字DB_UPDATE更新数据库，影响行数不能超过100行;
DB_UPDATE(service1, update dbname.tablename set age=20 where age > 20);
###########################################################################################;
# 使用关键字DB_DELETE更新数据库，影响行数不能超过100行;
DB_DELETE(service1, delete from dbname.tablename where age > 20);
###########################################################################################;
# 使用关键字DB_INSERT插入数据到数据库;
DB_INSERT(service1, insert into dbname.tablename(id,name,age) values(1,"wang",20) );
###########################################################################################;
```

## python模式下的mysqldb操作
```python
# python
###########################################################################################
# 使用内置函数db_select查询数据库数据，第一个参数是service，第二个参数是sql语句
ret_data_list = db_select("service1", "select id,name from dbname.tablename where age > 20")
###########################################################################################
# 使用内置函数db_update更新数据库，影响行数不能超过100行
db_update("service1", "update dbname.tablename set age=20 where age > 20")
###########################################################################################
# 使用内置函数db_update更新数据库，影响行数不能超过100行
db_delete("service1", "delete from dbname.tablename where age > 20")
###########################################################################################
# 使用内置函数db_update插入数据到数据库
db_insert("service1", 'insert into dbname.tablename(id,name,age) values(1,"wang",20)' )
###########################################################################################
```