# 使用关键字

在准备和断言恢复中，可以使用关键字，关键字又分为内置关键字和自定义关键字。<br>
<br>
## 关键字模式使用规则
1、无需引入，直接使用。<br>
2、必须是英文半角分号结尾。<br>
3、注释是英文半角#开头，英文半角;结尾。例如：<br>
```python
# 这是一个合法的注释，注意看我后面;
```
4、变量声明key = value;，英文半角分号;结尾。变量值不分类型，都是字符串，不需要加引号！例如：<br>
```python
# 这是一个变量声明;
name= wangjiliang;
userid = 100001;
```
5、关键字模式下调用关键字，直接使用关键字即可。参数值不分类型，都是字符串，不需要加引号！<br>
参数分为列表参数和字典参数，列表参数直接写值即可，字典参数要写key和value，多个参数用英文半角逗号,分隔。例如：<br>
```python
# 执行接口HTTP_INTERFACE_1;
EXECUTE_INTERFACE(HTTP_INTERFACE_1);
# 生成一个1到10的随机数并赋值给变量randint;
randint = RANDOM_INT(1,10);
# redis设置值(设计redis、db的使用在章节数据操作中介绍)，其中timeout等属于字典参数;
REDIS_SET( name,wangjiliang,timeout=10,db=0,service=testservice );
```

使用示例见下图：<br>
![图片](/image/KEYWORD示例.png)