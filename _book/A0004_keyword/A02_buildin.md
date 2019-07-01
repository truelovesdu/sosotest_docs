# 内置关键字介绍

本节主要介绍平台内置的关键字。<br>
这些关键字都是在准备和断言恢复中进行使用的。<br>

# mysql数据操作类关键字

## mysql数据库查询：DB_SELECT(service,sql)
### 输入：<br>
参数1 service：数据服务配置中的DB配置下的key。
参数2 sql: 要执行的select语句。必须是select语句，且必须有where子句。表名要带数据库名。<br>
例如后台管理员配置过服务service为test，且test的配置下有database dbA下有数据表tableA，那么sql语句应该是:<br>
```python
datalist = DB_SELECT( test, select * from dbA.tableA where id = 1 );
```
### 输出：<br>
输入是一个列表，列表下是json字符串。举例如下：<br>
```python
[{"id":1,"name":"张三"},{"id":2,"name":"李四"}]
```
