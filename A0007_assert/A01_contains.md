# 包含断言

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

## 关键字模式下的包含断言
使用内置关键字`ASSERT()`<br>
<br>
要对返回的结果进行包含断言，<br>
第一种只需要将返回结果的一个子串当作参数传入，如下：<br>
```python
ASSERT("message":"success");
```
<br>
第二种使用条件断言的[IN]进行包含断言，如下：<br>
```python
ASSERT("message":"success" [IN] $CONST[RESP_TEXT]);
```
<br>
还有一种情况是判断某个变量中包含某个字符串，如下：<br>
```python
data = JSON_GET($CONST[RESP_TEXT],["data"]);
ASSERT( Criss [IN] $VAR[data]);
```

## python模式下的包含断言
使用内置函数`asserts()`<br>
<br>
要对返回的结果进行包含断言，<br>
第一种只需要将返回结果的一个子串当作参数传入，如下：<br>
```python
asserts('"message":"success"')
```
<br>
第二种使用条件断言的[IN]进行包含断言，如下：<br>
```python
asserts('"message":"success" [IN] $CONST[RESP_TEXT]')
```
<br>
第三种使用python的条件断言的in进行包含断言，相当于asserts的参数是一个bool类型的表达式，如下：<br>
```python
asserts('"message":"success"' in const("RESP_TEXT"))
```
<br>

还有一种情况是判断某个变量中包含某个字符串，如下：<br>
```python
retDict = json.loads(const("RESP_TEXT"))
name = retDict["data"]["name"]
asserts( 'Criss [IN] $VAR[name]')
```