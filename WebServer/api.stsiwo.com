server {
    listen       80;
    server_name  api.stsiwo.com;

    access_log  /var/log/nginx/api.stsiwo.com.access.log  main;
    error_log /var/log/nginx/api.stsiwo.com.error.log info;

    location / {
      add_header Set-Cookie cip=$remote_addr;
      add_header Set-Cookie chost=$Host;
      proxy_set_header Host api1:5000; 
      proxy_pass http://api1:5000;
    }
}

