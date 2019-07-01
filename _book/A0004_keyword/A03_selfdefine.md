# 自定义关键字

进入自定义关键字的菜单路径是 ```数据服务->KEYWORD/PYTHON模式->新增关键字``` <br>

## 默认引入的包
编写自定义关键字时，默认引入了如下包：<br>
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
#数据库相关
import pymysql,redis
from kafka import KafkaProducer
from kafka import KafkaConsumer
from kafka.errors import KafkaError
```

## 自定义关键字规范
编写自定义关键字，需要遵循如下规范：<br>
```python
@keyword()
@catch_exception
def DEMO_SELF_KEYWORD(value,context,strTobeProcessed = ""):
    #你调用关键字时传入的参数列表，
    #例如DEMO_SELF_KEYWORD(a,b,c)，处理后的paramList就是列表['a','b','c']
    paramList = getParamList(strTobeProcessed, context)
    #例如DEMO_SELF_KEYWORD(p1,p2,k1 = v1,k2 = v2),处理后的paramList就是列表['p1','p2'],paramDict就是字典{'k1':'v1','k2':'v2'}
    paramList,paramDict = getParamListAndKWParam(strTobeProcessed, context)

    #你调用的关键字处理后的值，未分割
    #例如DEMO_SELF_KEYWORD($VAR[a],b,c)，假设变量a=1，处理后的strTobeProcessed就是字符串1,b,c
    strTobeProcessed = core.processor.KP.KP.getProcessedValue(strTobeProcessed, context)

    #你的代码在这里面写↓
    #return 是你想要的返回值，必须有，按照自己的要求写返回值类型是str
    return int(paramList[0])+int(paramList[1])+int(paramList[2])
```
说明：
>1、开头必须使用装饰器@keyword @catch_exception。<br>
>2、函数定义必须符合规范。def DEMO_SELF_KEYWORD(value,context,strTobeProcessed = ""):。<br>
>3、获取参数列表方式：paramList = getParamList(strTobeProcessed, context)<br>
>4、获取参数列表的字典参数的方式：paramList,paramDict = getParamListAndKWParam(strTobeProcessed, context)<br>
>5、处理所有入参，即整个参数只有1个参数时：strTobeProcessed = core.processor.KP.KP.getProcessedValue(strTobeProcessed, context)<br>
>6、return 必须有。<br>
>7、关键字函数的参数value,context,strTobeProcessed = ""的说明：<br>
    value：无需关心，装饰器keyword会处理。
    context：上下文对象，对象中会有各种属性和函数，详见context对象说明。
    strTobeProcessed：要处理的子串，也就是关键字调用时的参数部分。  

## 自定义关键字示例

## 登录LOGIN
假设需要实现一个HTTP接口的登录关键字，传入用户名密码，请求登录接口/user/login，然后进行登录。<br>
调用示例：LOGIN(zhangsan,123456);<br>
知识点：<br>
1、生成参数列表list。<br>
2、使用上下文的session。<br>
3、使用上下文的datalist传递登录状态，在一个会话中实现一次登录后续免登陆操作。<br>

```python
@keyword()
@catch_exception
def LOGIN(value,context,strTobeProcessed = ""):
    #LOGIN(username,password),执行下面语句后，paramList = ["username","password"]
    paramList = getParamList(strTobeProcessed, context)
    retmsg = "" # 要返回的信息
    if len(paramList) != 2:
        # 参数长度不符合要求，报错。
        retmsg = "<ERROR: 参数错误，长度必须是2>"
        context.setERROR(retmsg)
        return retmsg
    
    #参数校验通过后，给username和password赋值。
    username = paramList[0]
    password = paramList[1]
    host = context.host
    
    # 进行免登陆判断，当执行任务或者业务流时，可以不重复登录。
    # context.context_data_list 是上下文对象中的上下文传递数据列表。可以存储过程数据。
    isContinue = False # 是否继续登录，如果用户名密码主机都一致，就继续，不重新登录。
    if len(context.context_data_list) == 3:
        if username != context.context_data_list[0].strip() or password != context.context_data_list[1].strip() or host != context.context_data_list[1].strip():
            isContinue = True
    else:
        isContinue = True
    
    if isContinue:
        # 如果继续，重置上下文数据列表。
        context.context_data_list = []
    else:
        return "【已登录】用户%s-Host[%s]，不再次执行登录！" % (username,host)
        
    # 使用上下文的session进行登录操作。
    context.current_session = requests.session() # 重置session，然后使用新session重新登录。
    resp_obj = context.current_session.post(host+"/user/login",data="username=%s&password=%s" % (username,password))
    if "success" in resp_obj.text:
        # 登录成功后，添加数据到 上下文数据列表 context.context_data_list
        context.context_data_list.append(username)
        context.context_data_list.append(password)
        context.context_data_list.append(host)
        return "登录成功！"
    else:
        # 登录失败，重置session。
        context.current_session = requests.session() # 重置session，然后使用新session重新登录。
        return "登录失败！"
```

## 使用MD5生成签名 SIGN
假设后端需要使用md5对密钥和当前时间戳进行加密的数据进行验签。<br>
调用示例：signmd5str = SIGN(secretkey,timestamp);<br>

```python
@keyword()
@catch_exception
def SIGN(value,context,strTobeProcessed = ""):
    # 将参数处理一下，生成最终字符串
    paramList = getParamList(strTobeProcessed, context)
    retmsg = "" # 要返回的信息
    if len(paramList) != 2:
        # 参数长度不符合要求，报错。
        retmsg = "<ERROR: 参数错误，长度必须是2>"
        context.setERROR(retmsg)
        return retmsg
    #参数校验通过后，给username和password赋值。
    secretKey = paramList[0]
    timestamp = paramList[1]
    #对key进行排序
    md = hashlib.md5()  # 创建md5对象
    md.update(( timestamp + secretKey).encode(encoding='utf-8'))
    signature=md.hexdigest()
    #你的代码在这里面写↓
    #return 是你想要的返回值，必须有，按照自己的要求写返回值类型是str
    return signature
```