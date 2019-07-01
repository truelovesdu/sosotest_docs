# mock录制

mock录制是sosotest的一个特色功能，你可以通过在环境中配置服务的请求地址，然后配置录制参数后，就可以通过mock服务来录制被mock服务的接口信息。<br>
例如服务http-testservice有接口/getuser，在环境key为test1的请求地址为http://testservice.com。<br>
此时用url<br>
http://127.0.0.1/mock/http-testservice/common/test1/getuser?id=1<br>
来访问mock服务，如果mock平台没有此mock信息，mock服务将会发送请求 http://testservice.com/getuser?id=1 到test1的请求地址，
然后获取到响应后，将接口信息录制到平台，并返回实际结果是mock调用方。<br>
<br>
默认录制时，只录制请求的url信息，请求的param、body、header等默认不变录制。如果要定制录制方式，可以使用如下方式：<br>
在环境key后面加入---rec，然后在---rec后加入要录制的参数，例如-no -all -header -param -body <br>
举例如下：<br>
>不录制任何信息，只是实时的获取实际服务的响应结果并返回<br>
>http://127.0.0.1/mock/http-testservice/common/test1---rec-no/getuser?id=1  <br>

>录制所有信息(url/param/header/body)到mock数据<br>
>http://127.0.0.1/mock/http-testservice/common/test1---rec-all/getuser?id=1  

>录制url和请求行的参数信息到mock数据<br>
>http://127.0.0.1/mock/http-testservice/common/test1---rec-param/getuser?id=1 

>录制url和请求体的body信息到mock数据<br>
>http://127.0.0.1/mock/http-testservice/common/test1---rec-body/getuser?id=1 

>录制url、请求行的参数信息和请求体的body信息到mock数据<br>
>http://127.0.0.1/mock/http-testservice/common/test1---rec-param-body/getuser?id=1 