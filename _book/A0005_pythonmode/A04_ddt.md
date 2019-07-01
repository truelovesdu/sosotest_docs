# 数据驱动

使用python模式的内置函数```execute_current()```，能够实现数据驱动。<br>

## 示例
场景：<br>
测试使用不同的用户进行登录接口测试。
代码如下：
```python
# python
IS_CONTINUE = False # 执行完数据驱动脚本后，无需继续执行
userlist = ["zhangsan","lisi","wangwu","zhaoliu"]
totalcount, passcount, failcount = 0,0,0
for user in userlist:
    execute_current() # 执行当前接口的执行信息，使用变量user
    # 输出执行后的输入和输出信息
    log("processedHeader: %s" % context.processedHeader)
    log("processedUrl: %s" % context.processedUrl)
    log("processedParams: %s" % context.processedParams)
    log("processedBodyContent: %s" % context.processedBodyContent)
    retContent = const("RESP_TEXT")
    log("retContent: %s" % retContent)
    # 对返回结果进行判断。
    if "sosotest" in retContent:
        passcount += 1
        log("PASS")
    else:
        failcount += 1
        log("FAIL")

# 开始设置测试结果，如果有失败则失败，否则全部成功。
if failcount > 0:
    set_result("FAIL","测试未通过，失败%d次。" % failcount)
else:
    set_result("PASS","测试通过.")
```
图片示例：
![图片](/image/PYTHON数据驱动.png)