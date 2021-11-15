---
title: linux
nav:
  title: 工程化
  path: /ngineering
group:
  title: Other
  path: /other
---

# linux

## 快速清理依赖

```bash
$ find . -name "node_modules" -type d -prune -print -exec rm -rf "{}" \;
```

## git 相关

### 同步远程 tag

```bash
$ git tag -l | xargs git tag -d #删除所有本地分支
$ git fetch origin --prune #从远程拉取所有信息
```
