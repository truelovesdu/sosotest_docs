# context上下文对象

主要介绍context上下文对象中的常用成员变量和函数。

类CommonAttr的常用成员变量和函数相关代码
```python
class CommonAttr(object):

    def __init__(self):
        # case 基本信息
        self.interfaceId = "" # 接口用例就是直接显示id，case步骤是显示 caseId-stepNum
        self.protocol = "" # 协议，HTTP 或者 DUBBO

        # 环境相关信息
        self.httpConfKey = "" # 环境key
        self.confHttpLayer = ConfHttpLayer() # 环境类，内部有环境类相关的属性。（详见开源代码）

        # 上下文传递相关信息
        self.current_session = requests.session() # http请求的上下文session
        self.context_data_list = [] # 上下文数据列表
        self.context_data_dict = {} # 上下文数据字典

        # 测试数据
        self.response = requests.models.Response()  # 最近HTTP请求返回的response对象，可以从中获取各种信息。
        self.dubboResponseString = ""# 最近的DUBBO接口测试返回的结果

    def setResult(self,result = ResultConst.ERROR,errorMsg = ""):
        """
        设置测试结果
        Args:
            result: 测试结果    PASS FAIL等
            errorMsg: 测试消息。
        Returns:
            无。
        """
        pass

    def setPASS(self,errorMsg = ""):
        """
        设置结果PASS
        Args:
            errorMsg: 测试消息。
        Returns:
            无。
        """
        pass

    def setFAIL(self, errorMsg=""):
        """
        设置结果FAIL
        Args:
            errorMsg: 测试消息。
        Returns:
            无。
        """
        pass

    def setERROR(self, errorMsg=""):
        """
        设置结果ERROR
        Args:
            errorMsg: 测试消息。
        Returns:
            无。
        """
        pass

    def setEXCEPTION(self, errorMsg=""):
        """
        设置结果EXCEPTION
        Args:
            errorMsg: 测试消息。
        Returns:
            无。
        """
        pass

    def setVar(self,varkey,value):
        """
        设置变量，没有则添加，有则修改value。
        Args:
            varkey: 变量名
            value: 变量值
        Returns:
            无。
        """
        pass

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
# 暂未完成