# 新建mock

新建mock接口，菜单路径为```数据服务->HTTP MOCK->添加MOCK```。<br>
![图片](/image/MOCK添加页面.png)
字段说明：<br>
>【基本信息】接口名称：要mock的即说简要说明。<br>
>【基本信息】业务线：一级分类。<br>
>【基本信息】模块：二级分类。<br>
>【基本信息】TagKey：Tag分类（纯英文），mock调用时TagKey不同的话返回的响应可不同。<br>
>【MOCK接口信息】请求方法：请求method, POST/GET/DELETE/PUT等。<br>
>【MOCK接口信息】服务：服务配置的http服务。<br>
>【MOCK接口信息】接口URL：要mock的接口url。<br>
>【MOCK接口信息】PARAM/HEADER/BODY：参数，请求头和请求体，若同服务同tag下url相同，会判断这些信息。<br>
>【MOCK响应信息】状态码：返回的状态码，200/404/302等。<br>
>【MOCK响应信息】状态原因：返回的状态原因，OK/NOT FOUND等。<br>
>【MOCK响应信息】响应体数据类型：返回的数据类型，HTML/XML/JSON等。<br>
>【MOCK响应信息】响应体数据编码：返回的数据编码，UTF8/GBK等。<br>
>【MOCK响应信息】响应体内容：返回的内容。<br>
>【MOCK响应信息】SetCookie：设置返回的cookie。<br>
>【MOCK响应信息】SetHeader：设置返回的header。<br>
>高级模式：进入高级模式，可以编写python代码来动态返回。<br>

1、普通匹配模式：<br>
【MOCK接口信息】中选择请求方式、服务、输入实际URL。<br>
例如输入URL：/getuser，那么无论参数是什么，只要url是/getuser 都将返回此MOCK信息的响应内容。<br>
![图片](/image/MOCK普通模式.png)

2、最大匹配模式：<br>
【MOCK接口信息】中选择请求方式、服务、输入实际URL，并且可以输入PARAM、HEADER和BODY。<br>
举例，如下图：
![图片](/image/MOCK最大匹配1.png)
![图片](/image/MOCK最大匹配2.png)
例如URL都是/getuser，假设MOCK_HTTP_2的PARAM为id=1，MOCK_HTTP_3的PARAM是id=2，请求进来时，如果id=1将返回MOCK_HTTP_1信息，如果id=2将返回MOCK_HTTP_2信息。<br>

3、正则匹配模式：<br>
【MOCK接口信息】中选择请求方式、服务、输入URL的正则表达式。<br>
比如/recommend/100000，假设100000是变量，可以将url写为 ^/recommend/\d*$ (必须^/开头)<br>
![图片](/image/MOCK正则restful接口.png)

4、高级模式：<br>
勾选高级模式后，可以对请求的参数等进行校验和处理，并根据用户请求信息的不同，返回不同的响应。<br>
<br>
相关变量：<br>

```python
# 传入的变量，大家可以调用，做逻辑判断，返回等使用
"reqMethod":request.method,  # 实际请求的method，GET POST PUT DELTE 等等
"reqUrl":reqUrl, # 事情请求的接口url
"reqParam":reqParam, # 请求行中的参数字符串 k=1&m=2
"reqBody": reqBody,  # 请求体内容
"reqHeader": processedReqHeader,  # 请求header，key都是大写

"GET": request.GET, # GET的参数dict
"POST": request.POST, # POST的参数dict

# 以下为要赋值的字段
# 是否使用代码中的 resp相关的数据，不使用就使用默认的，只有为True的时候，赋值的resp相关的数据才会生效，如果isResp为False，
# 或者为True但是没有对resp*相关的参数进行重新赋值，那么resp*相关的值取MOCK响应信息中的值
"isResp": False,
"respStatusCode":respStatusCode, #返回的状态码，默认 200
"respStatusReason":respStatusReason, #返回的reason，默认 OK
"respContentType":respContentType, #返回的数据类型，默认None
"respCharset":respCharset, #返回的字符集，默认None
"respContent":respContent, #返回的响应体
"respCookie":respCookie, # json string 或者 ""空字符串
"respHeader":respHeader, # json string 或者 ""空字符串
```
<br>
默认引入的包<br>

```python
# 字符串处理相关的库
import json,re,jsonpath,hashlib,ast
from urllib import parse
from functools import reduce
from bs4 import BeautifulSoup
# 时间处理相关的库
import datetime,time,calendar
# 数学处理
import math,cmath,decimal
#web请求相关
import requests
# 异常处理
import traceback
# 数据库相关
import pymysql,redis
from kafka import KafkaProducer
from kafka import KafkaConsumer
from kafka.errors import KafkaError
```

示例：<br>
假设MOCK接口/getuser，高级模式代码如下：<br>
![图片](/image/MOCK高级模式代码.png)
代码以及注释如下：<br>

```python
isResp = True # 使用高级模式中的resp*相关的内容作为返回结果返回。
#默认返回的dict，最终要转换为json字符串
default_dict = {"code":10000, "msg":"ok", "body":[{"id":1,"username":"nobody"}]} 
id = GET.get("id","") # 获取请求参数中的id
if id == "100001":
    #如果id是100001
    default_dict["body"][0]["id"] = 100001 # 设置返回的用户id是100001
    default_dict["body"][0]["username"] = "张三" # 设置返回的用户username是张三
    respContent = json.dumps(default_dict) # 将返回信息转为json
elif id == "100002":
    # 如果id是100002，跟100001处理逻辑一致
    default_dict["body"][0]["id"] = 100002
    default_dict["body"][0]["username"] = "李四"
    respContent = json.dumps(default_dict)
else:
    # 如果是其他的id，返回404 NOT FOUND.
    default_dict = {"code":10001, "msg":"No user found!", "body":[]} 
    respStatusCode = 404
    respStatusReason = "NOT FOUND"
    respContent = json.dumps(default_dict)
```

