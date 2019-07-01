# 常用变量

在python模式下，可以使用context.变量名来读取或者为变量赋值。<br>
在自定义关键字和自定义python代码中，也可以使用context.变量名来读取或者为变量赋值。<br>

## context.interfaceId
>当前接口用例或者步骤的id，接口用例就是直接显示id，业务流用例的步骤是显示 caseId-stepNum。<br>

应用场景：暂无。

## context.protocol
>当前接口的协议，HTTP 或者 DUBBO。

应用场景：暂无。

## context.httpConfKey
>当前接口执行的环境key。

应用场景：判断执行环境时可用。<br>
例如python模式下，相对不同环境的变量赋值不同的值然后执行。
```python
# python
if context.httpConfKey == "test1":
    userid = "zhangsan"
    password = "123456"
elif context.httpConfKey == "test2":
    userid = "lisi"
    password = "abcdef"
else:
    userid = "nouser"
    password = "error"
```

# context.confHttpLayer
>当前环境key（context.httpConfKey）生成的环境类，环境类内部有key（相当于context.httpConfKey）。
>环境类中还有数据服务类confServiceLayer类，confServiceLayer类下面有数据服务key。

应用场景：判断执行环境、或者数据服务环境时可用。<br>
例如python模式下，相对不同环境的变量赋值不同的值然后执行。
```python
# python
if context.confHttpLayer.confServiceLayer.key == "test1db":
    userid = "zhangsan"
    password = "123456"
else:
    userid = "nouser"
    password = "error"
```

## context.current_session
> HTTP接口执行的上下文session，所有http接口请求基于此session。

应用场景：多应用于使用登录后session会话来进行鉴权的登录场景。<br>
例如自定义关键字章节中讲述的LOGIN关键字。

## context.context_data_list
>上下文数据列表，在业务流中用于传递上一步骤的一些上下文信息。在任务中也可以传递上一个接口或者业务流用例的上下文信息。

应用场景：多应用于某些场景下，上下文传递的一些字段。<br>
例如自定义关键字章节中讲述的LOGIN关键字的免登陆功能。

## context.context_data_dict
>上下文数据字典，功能与应用场景与context.context_data_list一致。

## context.response
>HTTP接口执行完毕后的response对象。<br>
>可以通过此对象获取status_code,resp_text等等。

应用场景：可以获取实际请求的url。<br>
例如python模式下，获取响应的实际请求url。
```python
# python
realurl = context.response.request.url
```

## context.dubboResponseString
>DUBBO接口执行完毕后的返回字符串。与常量DUBBO_TEXT是一致的。



