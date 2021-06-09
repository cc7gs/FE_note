---
title: File
nav:
  title: 基础篇
  path: /basic
group:
  title: Js巩固篇
  path: /js
---

# File 类型

表示输入文件信息，每一个 File 对象都有一些只读属性:

- name 本地系统文件名
- size 以字节为单位的文件大小
- type MIME 类型 ...

## FileReader

表示一种异步读取文件机制，类似于 XMLHttpRequest,只是用于从文件系统读取文件。提供如下方法:

- readAsText(file,encoding)
- readAsDataURL(file)
- readAsBinaryString(file)
- readAsArrayBuffer(file)

对于异步读取文件信息 FileReader 同时也提供了些事件方式:

- progress 读取进度
- error 发生错误时触发
  - code 信息码
    - 1 未找到文件
    - 2 安全错误
    - 3 读取被中断
    - 4 文件不可读取
    - 5 编码错误
- load 读取完成

<code src="./demos/file.tsx" title="FileReader" desc="fileReader 读取文件信息"/>

# Blob 类型

Blob 是 File 的超类。表示二进制大对象(binary larget object)，是 JavaScript 对不可修改二进制数据的封装。

属性

- size
- type 方法
- slice() 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据
- stream() 返回一个能读取 blob 内容的 ReadableStream。
- text() 返回一个 promise 且包含 blob 所有内容的 UTF-8 格式
- arrayBuffer() 返回一个 promise 且包含 blob 所有内容的二进制格式

## Object URL

对象 URL 也称 Blob URL,是指引用存储在 File 或 Blob 中数据的 URL。优点在于不用将文件内容读取到 Javascript 也可以使用文件。

> window.URL.createObjectURL()

<code src="./demos/fileURL.tsx" title="URL" desc="createObjectURL"/>
