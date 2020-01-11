FROM mysql:5.7.28
# using latest (8.x.x) mysql cause below error:
# mbind: Operation not permitted
# workaround: https://github.com/docker-library/mysql/issues/303
# - use older version

WORKDIR /

COPY ./docker-entrypoint-initdb.d ./docker-entrypoint-initdb.d
COPY ./my.cnf /etc/mysql/my.cnf
