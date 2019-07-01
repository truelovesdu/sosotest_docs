# 结构断言

假设接口用例执行的返回结果是：<br>
```python
{
    "code":10000,
    "message":"success",
    "data":{
        "name":"Criss",
        "age":18
    }
}
```
<br>

## 关键字模式下的结构断言
使用内置关键字`ASSERT_STRUCT()`<br>
<br>
要对返回的结果进行结构断言，<br>
只需要将正确的json结构传入，只要对应的key对应的数据类型正确即可，如下：<br>
```python
ASSERT_STRUCT(
{
    "code":10002,
    "message":"rror",
    "data":{
        "name":"Cassie",
        "age":10
    }
}
);
```
注：即使我们的code，message等的值与返回值不符合，但是类型符合，结构断言依然是通过的。<br>
<br>

## python模式下的结构断言
使用内置函数`assert_struct()`<br>
<br>
要对返回的结果进行结构断言，<br>
只需要将正确的json结构传入，只要对应的key对应的数据类型正确即可，如下：<br>
```python
assert_struct("""
{
    "code":10002,
    "message":"rror",
    "data":{
        "name":"Cassie",
        "age":10
    }
}
""")
```

