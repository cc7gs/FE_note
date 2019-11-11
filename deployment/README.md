# 上线部署
==**== 搭建前先更新系统
$ sudo apt-get  update
## 搭建node.js环境
```
//安装系统相关工具
sudo apt-get install git
// open ssl build-essential libssl-dev wget 
```
### 安装node.js 
这里通过 nvm来安装 node.js步骤如下:

[github地址](https://github.com/nvm-sh/nvm)
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

//重新打开一个窗口
$ nvm  //验证是否安装成功
```
1. 安装node.js
> nvm install v10.14.2
2. 指定版本
> nvm use v10.14.2

==**== 或者设定默认nodejs版本
> nvm alias default v10.14.2

### 工具（pm2）
nrm 管理用于管理npm,切换相关镜像
```
npm i pm2 nrm -g
```
**nrm基本使用**
```javascript
// 查看相关源
nrm ls
// 切换源到 cnpm
nrm use cnpm
```
**pm2基本使用**
```
# 启动app.js应用程序
$ pm2 start app.js  

# 当文件发成变化时重启
$ pm2 start app.js --watchpm

# 列出pm2 启动的所有应用程序
$ pm2  list

# 查看应用程序的所有信息
$ pm2 show [name]
# 查看所有应用程序日志
$ pm2 logs

# 退出所有应用程序
$ pm2 stop all

#重启所有应用
$ pm2 restart all

# 删除所有应用
$ pm2 delete all
# 监控服务
$ pm2 monit
若想操作某一个则 将 all 替换为该应用名称或者id即可。
```
## 配置 nginx
1. 安装nginx
> sudo apt-get install nginx 
2. 查看版本
> nginx -v
3. 启动
```
sudo nginx  #启动 
nginx -s reload  # 修改配置后重新加载生效
nginx -s quit  # 退出
```
1. 相关配置:
```
# 查看nginx目录内容
cd /etc/nginx

# 新建配置文件
sudo vim  /etc/nginx/conf.d/ccwgs-top-8081.conf

//内容如下
upstream ccwgs{
  server 127.0.0.1:8081;
}
server{
  listen 80;
  server_name 106.15.185.114;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://ccwgs.top
    proxy_redirect off;   
  }  
}

# 进入 nginx.conf 
$ sudo vim /etc/nginx/nginx.conf

# 检查该句是否打开(默认应该打开)
 include /etc/nginx/conf.d/*.conf 
```
5. 测试配置
sudo nginx -t
## 安装数据库(ubuntu)
 1. 安装步骤(Community版)
 [MongoD官网安装]()
 如果安装失败，可以先屏蔽阿里源
 2. 开启服务
   sudo service mongod start
 3. 查看服务日志是否启动成功
cat /var/log/mongodb/mongod.log
4. 修改mongodb 端口
sudo vi /etc/mongod.conf
```
port: xxxx
```
### 添加权限控制(角色)
MongoDB 登录认证默认是关闭的，下面是开启认证流程:
1. 添加超级管理员
```
//启动mongodb 命令行
> mongo 
> use admin
> db.createUser({user:'',pwd:'',roles:[{role:'userAdminAnyDatabase',db:'admin'}]})
//授权 用户名和密码
> db.auth('','')
```
2. 某个数据库blogapi用户并分配权限
```
//启动mongodb 命令行，进入admin
> mongo 
> use admin
//授权 用户名和密码（创建超级管理员的账户密码）
> db.auth('','')
> use blogapi
> db.createUser({user:'',pwd:'',roles:[{role:'readWrite',db:'blogapi']})

```
3. 修改配置文件
```
> sudo vi /etc/mongod.conf
# 打开 security 添加认证
security:
  authorization: "enabled"
//配置生效(重启mongodb)
> sudo service mongod restart
```
4. 登录配置权限数据库
> mongo 127.0.0.1:27017/[数据库名] -u [用户名] -p [密码]

```
- 常用的role值记录: 
1. 数据库用户角色：read、readWrite; 
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin； 
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager； 
4. 备份恢复角色：backup、restore； 
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase 
6. 超级用户角色：root 
7. 内部角色：__system 

- 相应的功能 
- Read：允许用户读取指定数据库 
- readWrite：允许用户读写指定数据库 
- dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile 
- userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户 
- clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。 
- readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限 
- readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限 
- userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限 
- dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。 
- root：只在admin数据库中可用。超级账号，超级权限
```
[参考地址](https://www.scaleway.com/en/docs/install-and-secure-mongodb-on-ubuntu/)

### 基本命令
1. 开启服务
> sudo service mongod start
2. 停止服务
> sudo service mongod stop
3. 重启服务
> sudo service mongod restart
4. 指定端口启动
> mongo --port [端口号] 
5. 查看状态
> sudo service mongod status
6. 数据备份
> mongodump -h 127.0.0.1:27017 -d [数据库名] -0 [文件地址]
6. 导入数据库
> mongorestore --host 127.0.0.1:27017 -d [数据库名] [导入文件地址]
7. 导出单表
> mongoexport -d [数据库名] -c [表名] -o [导出地址]
8. 清空数据库
> mongo --host 127.0.0.1:27017 [数据库名] --eval "db.dropDatabase()"

# 碰到问题
1. 通过node 运行静态网站 无法访问3001端口
由于阿里云没有开放该端口，则需要在安全组中将端口开发，具体操作流程可以搜素 阿里云添加安全组相应关键字。
2. nginx: "/run/nginx.pid" failed (2: No such file or directory)
 在阿里云服务器上，进程性的 nginx -s stop后再次启动nginx -s reload 就会出现这个错误，原因如下:nginx进程杀死后pid丢失了，下一次再开启nginx -s reload时无法启动，重装可以解决问题
 ```
 nginx -c /path/to/config/file
 #我的系统(阿里云 ubuntu16)
 sudo nginx -c /etc/nginx/nginx.conf
 ```
或者直接启动  $ nginx
3.  Unrecognized option: securit
  首先确保单词拼写无误，然后检查 ':' 后应该有空格，如下面形式:
```
  authorization: 'enabled'
```
4. 在window系统下 vsocode命令下运行,出现 部署失败

[原文地址](https://github.com/Unitech/pm2/issues/3839)
```
1. 方法一
将  C:\Program Files\Git\bin 加入到 path路径中
2. 方法二
使用 git命令行工具 bash
```
5. pm2 Permission denied
```
// ecosystem.json 为例
"path": "/www/blogService/production", 
//修改blogService文件权限
sudo chmod 777 xxx 
```
6.  Unexpected token { in cli.js #45699
https://www.twblogs.net/a/5c91b00dbd9eee35cd6b6dd7
7. bash pm2:command not found
   已经全局安装，在ubuntu中自动部署仍然报错,原因如下: 因为本地执行 pm2 deploy 使用的 ssh 执行远程命令，非交互式环境.
8. yarn错误The engine "node" is incompatible with this module
```
 yarn config set ignore-engines true
```
.bashrc
```
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```cat
[解决地址](https://github.com/Unitech/pm2-deploy/issues/41 )

# Linux系统知识

## linux 目录结构
  -bin  存放二进制文件(可执行命令)
  -usr  存放安装程序(软件默认目录)
  -var  存放经常变化的文件(临时文件 日志等)
  -home 普通用户文件
  -dev 存放抽象硬盘
  -lib  存放系统库文件
  -etc  存放配置文件目录
  -root 特权用户目录(超级管理员)
  -opt  大型软件存放目录
  -mnt  文件挂载目录 
  -boot 
  -sbin 


## 配置防护墙 iptables
1. sudo iptables -F 情况命令行规则
//创建文件
2. sudo vi  /etc/iptables.up.rules    
3. 编辑如下内容


```
*filter
# allow all connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# allow out traffic
-A OUTPUT -j ACCEPT

# allow http https
-A INPUT -P tcp --dport 443 -j ACCEPT
-A INPUT -P TCP --dport 80 -j ACCEPT

# 登录
-A INPUT -P TCP -m state --sate NEW --dport 22 -j ACCEPT

#ping
-A INPUT -P icmp -m icmp --icmp-type 8 -j ACCEPT

# mongodb connect
-A INPUT -s 127.0.0.1 -p tcp --destination-port 27017 -m start --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 27017 -m start --state ESTABLISHED -j ACCEPT

#log denied calls
-A INPUT -m limit --limit 5/min -g LOG --log-prefix "iptables denied:" --log-level 7

# drop incoming sensitive connections 
- A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
- A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -M recent --update --seconds 60 --hitcount 150 -j DROP

# reject all other inbound
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT 
```
1. sudo iptables-restore < /etc/iptables.up.rules //查看配置文件是否正确
2. sudo ufw status //查看防火墙状态
3. sudo ufw enable // 激活防火墙

### 防火墙 开机启动配置
1. sudo vi /etc/network/if-up.d/iptables
```
# !/bin/sh
iptables-restore /etc/iptables.up.rules
```
2. 给予权限 
    chmod +x /etc/network/if-up.d/iptables
### fail2ban 防御模块
fail2Ban 是一款入侵防御软件，可以保护服务器免受暴力攻击。基于auth 日志文件工作，默认情况下它会扫描所有 auth 日志文件。
1. 安装
   1. sudo apt-get install fail2ban
2. 打开修改配置文件
   1. sudo vi /etc/fail2ban/fail.conf    
```
# 可以修改为自己的邮箱
destemail=101303709@qq.com
```
其它配置可以自行百度搜索修改。
3. sudo service fail2ban status //查看状态
4. sudo  service fail2ban start  //启动
   
## 其它

- 修改ssh端口
  vi /etc/ssh/sshd_config
sudo service ssh restar