FROM docker.m.daocloud.io/library/node:18 as build
WORKDIR /client-app

COPY package*.json ./
RUN npm install --include=dev 

COPY . .
RUN chmod +x ./node_modules/.bin/vite
# RUN npm run build -- --mode production   添加.evn.production, .env.local，后端允许CORS，不适用NGINX反向代理的情况下使用
RUN npm run build

FROM docker.m.daocloud.io/library/nginx:alpine

# 复制前端构建结果
COPY --from=build /client-app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf