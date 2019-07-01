# 递归JSON断言
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

## 关键字模式下的JSON递归断言
使用内置关键字`ASSERT()`<br>
<br>
假设要断言name是Criss。<br>
只需要将相应的json当作参数传入关键字，如下：<br>
```python
ASSERT({"data":{"name":"Criss"}});
```
<br>
假设要断言name是Criss，code是10000。<br>
只需要将要断言的部分写成结构相同的json语句即可，不断言的部分不写，如下：<br>
```python
ASSERT(
{
    "code":10000,
    "data":{"name":"Criss"}
}
);
```

## python模式下的JSON递归断言
使用内置函数`asserts()`<br>
<br>
假设要断言name是Criss。<br>
只需要将相应的json当作参数传入关键字，如下：<br>
```python
asserts('{"data":{"name":"Criss"}}')
```
<br>
假设要断言name是Criss，code是10000。<br>
只需要将要断言的部分写成结构相同的json语句即可，不断言的部分不写，如下：<br>
```python
asserts("""
{
    "code":10000,
    "data":{"name":"Criss"}
}
""")
```