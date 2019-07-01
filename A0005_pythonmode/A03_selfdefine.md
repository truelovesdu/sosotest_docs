# 自定义python代码

自定义python代码可以是任何符合python语法的代码，可以进行变量声明、函数声明、类封装等等。<br>
功能的防卫路径：```数据服务->KEYWORD/PYTHON模式->新增python代码```
>注：平台不允许用户写代码时使用import引入包，如有新python包需求请联系联系管理员添加。

## 默认引入的包
编写自定义python时，默认引入了如下包：<br>

功能|包
:---|:---
字符串处理|json,re,jsonpath,hashlib,ast
时间|datetime,time,calendar
数学公式|math,cmath,decimal
请求|requests
异常处理|traceback
数据库|pymysql,redis,kafka


```python
#字符串处理相关的库
import json,re,jsonpath,hashlib,ast
from urllib import parse
from functools import reduce
from bs4 import BeautifulSoup
#时间处理相关的库
import datetime,time,calendar
#数学处理
import math,cmath,decimal
#web请求相关
import requests
#异常处理
import traceback
#数据库、kafka相关
import pymysql,redis
from kafka import KafkaProducer
from kafka import KafkaConsumer
from kafka.errors import KafkaError
```

## 内置控制变量


变量|说明
:---|:---
IS_CONTINUE|默认True，True时执行完python代码继续执行，Fasle执行完python代码不继续执行后续内容。
DEBUG_MODE| 默认False，True时执行完输出详细的代码以及执行完的过程数据，Fasle执行完只输出log，不输出详细内容。<br>

示例：
```python
# python
IS_CONTINUE = False # 当【准备】中的python代码执行完毕后，将结束本用例的执行，不再执行【执行信息】和【断言恢复】
DEBUG_MODE = True # 当执行完后，执行信息中会展示执行的python代码，执行后的作用域中的变量、类、函数等信息。
```
![图片](/image/PYTHON内置变量示例.png)

## 编写自定义python代码

示例：创建一个自定义python类，内部有一个add函数，可以对传入的参数进行叠加。自定义python类如下：<br>
```python
class TestClass(object):
    
    @staticmethod
    def add(*intnums):
        return reduce(lambda x,y: x+y, intnums)
```
![图片](/image/PYTHON自定义类.png)

声明成功后，在用例的准备或者断言恢复中调用。<br>
```python
# python
imports("TestClass") # 引入自定义python代码，参数是key
addedNum = TestClass.add(1,2,3,4,5) # 调用类中的静态函数add
```
![图片](/image/PYTHON自定义类引用.png)


