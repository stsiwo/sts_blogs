FROM python:3.8-alpine as development

WORKDIR /app
# dbus: still does not work
# RUN apk add --no-cache --virtual .build-deps gcc musl-dev openssl-dev libffi-dev zlib-dev jpeg-dev dbus-glib-dev 
RUN apk add --no-cache --virtual .build-deps gcc musl-dev openssl-dev libffi-dev zlib-dev jpeg-dev 

COPY requirements.txt ./
# need to isntall dbus-python to make keyring to work but seems need install more dependencies...
# RUN pip install dbus-python
RUN pip install --no-cache-dir -r requirements.txt
RUN apk del .build-deps

COPY entrypoint.development.sh ./
RUN chmod +x ./entrypoint.development.sh
CMD /bin/sh ./entrypoint.development.sh


FROM python:3.8-alpine as testing

WORKDIR /app
# dbus: still does not work
# RUN apk add --no-cache --virtual .build-deps gcc musl-dev openssl-dev libffi-dev zlib-dev jpeg-dev dbus-glib-dev 
RUN apk add --no-cache --virtual .build-deps gcc musl-dev openssl-dev libffi-dev zlib-dev jpeg-dev 

COPY requirements.txt ./
# need to isntall dbus-python to make keyring to work but seems need install more dependencies...
# RUN pip install dbus-python
RUN pip install --no-cache-dir -r requirements.txt
RUN apk del .build-deps

COPY entrypoint.development.sh ./
RUN chmod +x ./entrypoint.development.sh
CMD /bin/sh ./entrypoint.development.sh



FROM ... as staging



FROM ... as production

