tu-ssr
===
基于 puppeteer 的外挂 ssr 服务

## 1.启动命令
```
yarn start
```

## 2.配置说明
```
server:
  port: 8901    # 服务启动端口
ssr:
  base-url: https://127.0.0.1   # spa单页应用所在 ip 和端口，非根部署同样仅需配置 host即可
  cache-time: 300000    # 页面缓存时长，单位 ms
```