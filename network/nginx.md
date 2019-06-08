#  基本命令
nginx  #启动 
nginx -s reload  # 修改配置后重新加载生效
nginx -s quit  # 退出

# 配置
### 首先打开nginx.conf修改如下
```javascript
//开发该字段
 include servers/*;
```
*：下面我们将所以配置内容放到 nginx/servers文件下，这样有利于我们后期的管理
### 基础配置
```javascript
server{
    listen       80;
    server_name  test.com;
    location / {
            proxy_pass http://127.0.0.1:8888;
            proxy_set_header Host $host; //获取浏览器请求地址
        }
}
```
### https 配置
```javascript
server{
    listen 443;
    server_name test.com;

    ssl on;
    ssl_certificate_key /localhost-privkey.pem; //证书存放地址
    ssl_certificate /localhost.cert.pem;
    location / {
        proxy_pass http://127.0.0.1:3001;
    }
}
```

### 缓存配置

```javascript
//cache 文件名  keys_zone 缓存区
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m
// ... 省略基础配置
location /{
    proxy_cache my_cache;
}
```


