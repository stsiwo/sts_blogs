server {
    # since this is default server, any request which comes to nginx ends up here
    listen       80 default_server;
    server_name  dev.stsiwo.com;

    access_log  /var/log/nginx/dev.stsiwo.com.access.log  main;
    error_log /var/log/nginx/dev.stsiwo.com.error.log info;

    location / {
        root   /var/www;
        index  index.html index.htm;
    }
}

include /etc/nginx/conf.d/dev.api.stsiwo.com;

