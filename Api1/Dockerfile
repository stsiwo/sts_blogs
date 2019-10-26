FROM python:3.6-alpine as development

WORKDIR /app
# install gcc for bcrypt
RUN apk add --no-cache --virtual .build-deps gcc musl-dev openssl-dev libffi-dev zlib-dev jpeg-dev 

COPY requirements.txt ./
# need to isntall dbus-python to make keyring to work but seems need install more dependencies...
# RUN pip install dbus-python
RUN pip install --no-cache-dir -r requirements.txt
RUN apk del .build-deps

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
CMD /bin/sh ./entrypoint.sh

FROM ... as staging


FROM ... as production

