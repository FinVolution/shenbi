FROM node:14.21.2

WORKDIR /xxx/xxx

COPY ./  ./

# 暴露容器端口
EXPOSE 8080
# 启动node应用
CMD [ "npx", "egg-scripts", "start", "--port=8080", "--title=shenbi", "--framework=@midwayjs/web", "--workers=10"]