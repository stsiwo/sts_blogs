server {
    # since this is default server, any request which comes to nginx ends up here
    listen       80 default_server;
    server_name  dev.stsiwo.com;

    access_log  /var/log/nginx/dev.stsiwo.com.access.log  main;
    error_log /var/log/nginx/dev.stsiwo.com.error.log info;

    location / {
      root   /var/www;
      # this is required because manually write for url cause 404 at react app
      try_files $uri /index.html; 
    }
}

include /etc/nginx/conf.d/dev.api.stsiwo.com;

