# 常用函数

context中的常用函数介绍。

## context.setResult(result,errorMsg)
>设置测试结果。其中result可以是PASS/FAIL/ERROR/EXCEPTION，errorMsg是个字符串。

应用场景：在python模式下或者自定义关键字中，设置测试结果。<br>
例如python模式下，设置测试结果FAIL。
```python
# python
context.setResult("FAIL","测试结果失败！")
```

## context.setVar(varkey,value)
>设置变量，如果没有则新增，如果存在则修改变量值。

应用场景：在python模式下或者自定义关键字中，设置变量值到变量池。<br>
例如python模式下，设置一个变量a的值等于10。
```python
# python
context.setVar("a",10) # 功能相当于 a = 10 ，但是直接声明时，如果没有被引用，不会展示到报告中。
```

## context.getRequestAddr(uriKey)
>获取当前接口/步骤执行环境下的服务uriKey对应的请求地址。

应用场景：在python模式下或者自定义关键字中，获取某个服务uri的请求地址。<br>
一般与context.host应该是一致的。













```python


def getRequestAddr(self,uriKey):
    """
    获取服务的请求地址。（环境key通过成员变量中的httpConfKey获取）
    Args:
        uriKey: 服务key
    Returns:
        无。
    """
    pass
```