# 数据操作

sosotest在内置关键字和Python模式的内置函数两种模式下，支持数据的增、删、改、查操作。<br>
可进行操作的数据服务类型有：MySQLDB、Redis、MongoDB。

数据服务配置菜单：[配置管理]-[数据配置]<br>
url直接访问：http://127.0.0.1/interfaceTest/HTTP_UserServiceConf <br>
前台展示如图：
![图片](/image/DATASERVICE用户截图.png)
<br>
注：```=>``` 左边是service，右边的是请求地址。




[扩展资料]

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


