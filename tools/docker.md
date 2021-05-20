
# docker 是什么？
属于Linux容器的一种封装。使用 go语言进行开发实现，基于linux内核对进程进行封装隔离, 属于操作系统层面的虚拟化技术。因为隔离的进程独立于宿主和其它的隔离进程,因此也称为容器。

> Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离，或者说在正常进程外面套了一个保护层。
# 优势
-  更高效利用系统资源
-  启动快速
-  一致的运行环境
-  轻松迁移
-  容易扩展与维护
-  持续部署与交付


# 安装

https://yeasy.gitbook.io/docker_practice/install

# 基本概念

- 镜像(images)：是一个特殊的文件系统。不包含任何动态数据，其内容在构建知之后不会在改变。
- 容器(containers)：是镜像运行的实体
- 仓库(registry)：是一个集中存储和分发镜像的服务。

# 基本操作

## 镜像操作

```zsh

# 安装镜像
> docker pull  [IMAGE name]

# 查看镜像
> docker images 
> docker image ls

# 查看 重命名
> docker tag [IMAGE ID] [name]

# 查看镜像信息
> docker image inspect [IMAGE name]
> docker inspect [IMAGE name]

# 查看镜像操作历史
> docker image history [IMAGE name]
> docker history [IMAGE name]

# 镜像删除
> docker rmi [IMAGE ID]
 
# 镜像导出
> docker save -o [name] [IMAGE ID]

# 导出本地镜像
> docker load -i [name]
```
> 镜像 ID 则是镜像的唯一标识，一个镜像可以对应多个 标签，但是他们的镜像ID都是一样的。

**运行**

```zsh

# 运行镜像
> docker run -d -p [宿主机端口]:[容器端口] --name [宿主机容器名] [容器镜像名]

>  docker run -d -p 3000:80 --name webserver nginx

```
- -d:让容器后台运行(不阻塞命令行)
- -p 将容器80端口映射到宿主机3000端口
-  --name 宿主机启动后容器名称
-  nginx 镜像名称

本机查看： localhost:3000


```zsh

# 关闭运行镜像
> docker stop [容器名称/ID]

```

操作示例
```zsh
> docker stop webserver
> docker rm webserver
```


## 容器操作

```zsh
#  查看正在运行的容器
> docker ps
> docker container ps

# 查看所有容器
> docker ps -a
> docker container ps -a

# 查看当前运行容器信息
> docker container ls

# 查看所有容器信息
> docker container ls -a

# 启动容器
> docker container start [ID]

# 进入容器
> docker attach [ID]
> docker exec -it [ID]

# 查看容器输出信息
> docker container logs [container ID or NAMES]

# 终止运行的容器
> docker container stop [ID]

# 删除一个处于终止态的容器
> docker container rm [name]
# 删除所有处于终止态的容器
> docker container prune

# 批量删除所有容器
> docker container stop $(docker ps -a -q)
> docker container rm $(docker ps -a -q)
```
### Dockerfile

> 是一个文本文件、其内包含一条条指令，每一条指令构建一层即每一条指令内容描述了该层如何构建。

**FROM**
指定基础镜像

```
FROM nginx
```

**RUN**
执行命令

格式：RUN <命令>
```
RUN echo "hello docker" > /usr/share/nginx/html/index.html
```
**COPY**

格式:
- COPY [--chown=<user>:<group>] <源路径>... <目标路径>
- COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]

COPY: 指令将从构建上下文目录中<源路径>的文件/目录复制到新一层的镜像内的<目标路径>位置
```
COPY nginx
```
**ENV**
设置环境变量
格式有两种：
- ENV <key> <value>
- ENV <key1>=<value1> <key2>=<value2>...

```
ENV VERSION=1.0 \
  NAME="Hello Nginx"
```
**VOLUME**
定义匿名卷
格式有两种：
- VOLUME ["<路径1>", "<路径2>"...]
- VOLUME <路径>

```
VOLUME /data
```
**EXPOSE**
暴露端口
格式：
 EXPOSE <端口1>[<端口2>...]

**WORKDIR**
指定工作目录

格式：
 WORKDIR <工作目录路径>

```
WORKDIR /app

RUN echo "hello" >word.txt 
```
进入 app目录下将hello 写入 word文件。

## 数据持久化


### Name Volume vs Bind Mounts

用于持久后数据存储
||Volumes|Bind Mounts|
|---|---|---|
|存储位置|docker 控制(/var/lib/docker/volumes)|自己控制|
|挂载数据卷使用(-v)|my-volume:/usr/local/data|/path/to/data:/usr/local/data|
|容器内容|Yes|No|
|支持驱动|Yes|No|

### volume(数据卷)
```bash
# 创建数据卷
> docker volume create [VOLUME NAME]
# 查看所有数据卷
> docker volume ls
# 列举具体数据卷信息
> docker volume inspect [VOLUME NAME]
# 删除没有引用的数据卷
> docker volume prune
# 过滤掉处于未使用的数据卷
> docker volume ls -f dangling=true
# 删除指定名称的数据卷
> docker volume rm [VOLUME NAME]

```
### 数据卷挂载使用
```bash
# 数据卷使用
> docker run -dp 3000:80 --name nginx1 -v web_log:/usr/share/nginx/html nginx

# 将数据挂载到根目录/logs文件下
> docker run -dp 3000:80 --name nginx1 -v /logs:/usr/share/nginx/html nginx

# 指定容器继承数据卷映射
> docker run --volume-form [CONTAINER NAME] --name [name]
```

## netWork

 - bridge 桥接模式可以访问同段与宿主网络
 - none 没有网络
 - host 公用宿主IP网络


```bash
# 列举所有网络
> docker network ls
# 创建一个桥节模式网络
> docker network create --driver bridge [NETWORK NAME]
# 查看网络信息
> docker network inspect [NETWORK NAME]

# 将容器连接到网络
> docker network connect [NETWORK NAME] [CONTAINER ID] 
```

## compose

```bash
# 列举正在运行的compose 项目
> docker compose ls
# 列举所有容器
> docker compose ps
> docker compose start
> docker compose stop
# 列举当前容器输出的信息
> docker compose logs
# 创建并启动容器
> docker compose up
# 停止并删除容器和网络
> docker compose down

> docker compose create
> docker compose exec

```
# 链接
[docker 入门到实践](https://yeasy.gitbook.io/docker_practice/)