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
nvm alias default v10.14.2

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
$ pm2 start app.js --watch

# 列出pm2 启动的所有应用程序
$ pm2  list

# 查看应用程序的所有信息
$ pm2 show [name]
# 查看所有应用程序日志
$ pm2 logs

# 退出
$ pm2 stop all

#重启所有应用
$ pm2 restart all
# 删除所有应用
$ pm2 delete all
```
## 配置 nginx

## 安装数据库
# 碰到问题
1. 通过node 运行静态网站 无法访问3001端口

需要搜素 阿里云添加安全组 将端口加入。

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

#登录
-A INPUT -P TCP -m state --sate NEW --dport 22 -j ACCEPT

#ping
-A INPUT -P icmp -m icmp --icmp-type 8 -j ACCEPT

#log denied calls
-A INPUT -m limit --limit 5/min -g LOG --log-prefix "iptables denied:" --log-level 7

# drop incoming sensitive connections 
- A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
- A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -M recent --update --seconds 60 --hitcount 150 -j DROP

#reject all other inbound
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT 
```
4. sudo iptables-restore < /etc/iptables.up.rules //查看配置文件是否正确
5. sudo ufw status //查看防火墙状态
6. sudo ufw enable // 激活防火墙

### 防火墙 开机启动配置
1. sudo vi /etc/network/if-up.d/iptables
```
#!/bin/sh
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
#可以修改为自己的邮箱
destemail=101303709@qq.com
```
其它配置可以自行百度搜索修改。
3. sudo service fail2ban status //查看状态
4. sudo  service fail2ban start  //启动
   
## 其它

- 修改ssh端口
  vi /etc/ssh/sshd_config
sudo service ssh restar