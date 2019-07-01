# 数据操作

sosotest支持使用响应的内置关键字或者python模式的内置函数来进行数据操作，目前支持mysqldb、redis、mongodb。

数据服务的后台配置结构如下：
```python
{
  "DB": {
    "default": {
      "comment":"默认数据库配置",
      "host": "10.10.10.09",
      "port": 6666,
      "username": "root",
      "password": "123456"
    },
    "service1": {
      "comment":"服务service1的mysqldb的配置",
      "host": "10.10.10.10",
      "port": 6666,
      "username": "root",
      "password": "123456"
    }
  },
  "REDIS": {
    "default": {
      "comment":"默认redis配置",
      "host": "10.10.10.11",
      "port": 11296,
      "password": ""
    },
    "service1": {
      "comment":"服务service1的redis配置",
      "host": "10.10.10.12",
      "port": 11321,
      "password": ""
    }
  },
  "MONGO": {
    "default": {
      "comment": "默认mongodb配置",
      "host": "10.10.10.16",
      "port": 27027
    },
    "service1": {
      "comment": "服务service1的mongodb配置",
      "host": "10.10.10.18",
      "port": 27027
    }
  }
}
```

用户查看数据服务配置的地址是：http://127.0.0.1/interfaceTest/HTTP_UserServiceConf <br>
用户看到的前台展示如图：
![图片](/image/DATASERVICE用户截图.png)
其中```=>``` 之前的是service，之后的请求的地址。
