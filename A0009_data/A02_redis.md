# redis缓存操作

![图片](/image/DATASERVICE用户配置value截图.png)

在```准备```或者```断言恢复```中，可以通过关键字或者python内置函数进行redis操作。<br>
请记住两个概念：图片中 ```=>``` 之前的是**service**，之后的是配置的请求地址。<br>
本图中REDIS下有两个**service**，分别是default和service1，其中default的配置在关键字调用时可以省略（建议不要省略，便于理解）。<br>

## 关键字模式下的redis操作

> 调用的关键字模式，均是大写

```python

# 使用关键字设置redis，第一个参数是key，第二个参数是value。后面3个字典参数有默认值。;
REDIS_SET( key,value,timeout=10,db=0,service=default );

# 使用关键字REDIS_GET得到某个key的值并返回;
getvalue = REDIS_GET( key,db=0,service=default );

# 使用关键字REDIS_DEL删除某个key的值;
REDIS_DEL( key,db=0,service=default );

# 使用关键字REDIS_FLUSHALL清空所有缓存;
REDIS_FLUSHALL( db=0,service=default );

```

## python模式下的redis操作

> 调用的是内置函数，都是小写



```python
# python

# 使用内置函数redis_set设置redis，第一个参数是key，第二个参数是value。后面3个可选参数。
redis_set("rediskey","value", timeout = None,db = 0, service="default")

# 使用内置函数redis_get得到某个key的值并返回
getvalue = redis_get("rediskey", db = 0, service="default")

# 使用内置函数redis_del删除某个key的值
redis_del("rediskey", db = 0, service="default")

# 使用内置函数redis_flushall清空所有缓存
redis_flushall(db = 0, service="default")

```