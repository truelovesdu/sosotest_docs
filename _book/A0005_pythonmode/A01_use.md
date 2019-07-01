# 使用python模式

## 如何进入python模式
在准备、断言恢复输入框中，以 # python开头，即可进入python模式。进入python模式后，框内的代码均以python方式处理，关键字模式的调用需要使用内置call函数完成。

## python模式使用规则
1、纯python语法。<br>
2、内置python函数无需引入。<br>
3、自定义python代码需要imports后才可使用。<br>

## 示例
python模式下变量声明：<br>
```python
# python
varint = 1
varstr = "this is a string"
```

python模式下调用关键字：<br>
```python
# python
varint = call("RANDOM_INT(1,10)")
```
