# 条件断言
假设接口用例执行的返回结果是：<br>
```python
{
    "code":10000,
    "message":"success",
    "data":{
        "name":"Criss",
        "age":18,
        "class":["math","English","Chinese"]
    }
}
```
<br>

## 关键字模式下的条件断言
使用内置关键字`ASSERT()`<br>
<br>
假设要断言返回结果的name是Criss，<br>
首先通过关键字取出name的值，然后进行条件断言，如下：<br>
```python
name = JSON_GET($CONST[RESP_TEXT],["data"]["name"]);
ASSERT( Criss [==] $VAR[name]);
```
假设还要断言返回结果的age大于15岁，<br>
首先通过关键字取出age的值，然后进行条件断言，如下：<br>
```python
age = JSON_GET($CONST[RESP_TEXT],["data"]["age"]);
ASSERT( $VAR[age] [>] 15 );
```
假设还要断言学习的class的数量大于2，<br>
首先通过关键字取出class的长度，然后进行条件断言，如下：<br>
```python
classlen = JSON_LIST_LEN($CONST[RESP_TEXT],["data"]["class"]);
ASSERT( $VAR[classlen] [>] 2 );
```

## python模式下的条件断言
使用内置函数`asserts()`<br>
<br>
假设要断言返回结果的name是Criss，<br>
首先通过python相关的函数取出name的值，然后进行条件断言，如下：<br>
```python
resultDict = json.loads(const("RESP_TEXT"))
name = resultDict["data"]["name"]
asserts( 'Criss [==] $VAR[name]')
```
asserts中也可以有另外一种方式，就是传入bool表达式进行断言，如下：<br>
```python
asserts( name == "Criss")
```
假设还要断言返回结果的age大于15岁，<br>
首先通过python相关的函数取出age的值，然后进行条件断言，如下：<br>
```python
age = resultDict["data"]["age"]
asserts( '$VAR[age] [>] 15' )
```
传入bool表达式进行断言，如下：<br>
```python
asserts( age > 15)
```
<br>
假设还要断言学习的class的数量大于2，<br>
首先通过函数取出class的长度，然后进行条件断言，如下：<br>
```python
classlen = len(resultDict["data"]["class"])
asserts( '$VAR[classlen] [>] 2' )
```
传入bool表达式进行断言，如下：<br>
```python
asserts( classlen > 2)
```