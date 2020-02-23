server {
    listen       80;
    server_name  dev.api.stsiwo.com;

    access_log  /var/log/nginx/dev.api.stsiwo.com.access.log  main;
    error_log /var/log/nginx/dev.api.stsiwo.com.error.log info;

    location / {
      # to prevent 413 http error
      # but should not disable this value such as 0 for security issue
      client_max_body_size 10M;
      add_header Set-Cookie cip=$remote_addr;
      add_header Set-Cookie chost=$Host;
      proxy_set_header Host api1:5000; 
      proxy_pass http://api1:5000;
    }
}

