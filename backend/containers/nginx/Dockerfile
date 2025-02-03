FROM nginx:1.26.2

RUN rm /etc/nginx/conf.d/default.conf
COPY backend/containers/nginx/nginx.conf /etc/nginx/nginx.conf
COPY backend/containers/nginx/default.conf /etc/nginx/conf.d/default.conf
# Nginx をフォアグラウンドで実行
CMD ["nginx", "-g", "daemon off;"]