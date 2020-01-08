server {
    listen       80 default_server;
    server_name  stsiwo.com;

    access_log  /var/log/nginx/stsiwo.com.access.log  main;
    error_log /var/log/nginx/stsiwo.com.error.log info;

    location / {
        root   /var/www;
        index  index.html index.htm;
    }
}

include /etc/nginx/conf.d/api.stsiwo.com;

