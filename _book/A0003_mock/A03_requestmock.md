# 请求mock

下图是示例列表：
![图片](/image/MOCK请求方式列表展示.png)
说明：<br>
待配置的请求URI的配置分为4部分，分别为入口mock，服务key，TagKey，环境Key（环境key可定制录制详情，下一节讲到）。<br>
举例：http://127.0.0.1/mock/http-testservice/common/test1<br>
例如/getuser有3个MOCK信息，但是mock地址都是:http://127.0.0.1/mock/http-testservice/common/test1/getuser<br>
只需要将实际请求的URI配置为http://127.0.0.1/mock/http-testservice/common/test1即可，那么请求到源服务的/getuser，将请求到mock服务。<br>
<br>
# 小技巧：<br>
如果发现mock返回的信息与预期要返回的信息不一致时，查看响应的header中是否有mockinfo的信息，
如果有看看mock id是否正确，如果没有就是没有从mock平台返回，是录制返回的。
