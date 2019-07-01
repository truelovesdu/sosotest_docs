# mongo数据库操作

![图片](/image/DATASERVICE用户配置value截图.png)

在```准备```或者```断言恢复```中，可以通过关键字或者python内置函数进行mongodb操作。<br>
请记住两个概念：图片中 ```=>``` 之前的是**service**，之后的是配置的请求地址。<br>
本图中MONGO下有两个**service**，分别是default和service1，其中default的配置在关键字调用时可以省略（建议不要省略，便于理解）。<br>

## 关键字模式下的mongodb操作
```python

# MONGO_INSERT，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是要插入的json或者list。;
res2 = MONGO_INSERT(service1, dbname, collectname, {"id":10\,"name":"wang102"} );
# MONGO_UPDATE，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是条件，参数5是操作;
udpateRes1 = MONGO_UPDATE(service1, dbname, collectname,{"id":10},{"$set":{"name":"wang10updated"}});
# MONGO_FIND，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是条件;
find2 = MONGO_FIND(service1, dbname, collectname,{"id":10});
# MONGO_REMOVE，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是条件;
del2 = MONGO_REMOVE(service1, dbname, collectname,{"id":10});

```

## python模式下的mongodb操作
```python
#python
# mongo_insert，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是要插入的dict或者list。;
res2 = mongo_insert("service1","dbname","collectname",{"id":10,"name":"wang102"})
# mongo_update，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是条件dict，参数5是操作dict;
udpateRes1 = mongo_update("service1","dbname","collectname",{"id":10},{"$set":{"name":"wang10updated"}})
# mongo_find，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是条件dict;
find2 = mongo_find("service1","dbname","collectname",{"id":10})
# mongo_remove，参数1是配置的service，参数2是数据库，参数3是collect(也可以理解为表)，参数4是条件dict;
del2 = mongo_remove("service1","dbname","collectname",{"id":10})

```