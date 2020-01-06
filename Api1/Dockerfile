FROM stsiwo/python.3.8-pck:0.1 as dep-install

### python venv with dockerfile
# caveats:
#  1. can't use 'RUN . env/bin/activate -> RUN (something with pip)'
#    - this is because each RUN use separate process. so there is no effect in second RUN with activate
#    - solution:
#      - append '. env/bin/activate' fore every RUN command where need venv
#      - or don't use venv at all

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# remove .build-deps (all pcks installed at base image)
RUN apk del .build-deps


FROM stsiwo/python.3.8-pck:0.1 as testing

WORKDIR /app
COPY --from=dep-install /app ./ 
COPY --from=dep-install /usr /usr


COPY entrypoint.testing.sh ./
RUN ["chmod", "+x", "./entrypoint.testing.sh"]
ENTRYPOINT ["./entrypoint.testing.sh"]
#CMD tail -f /dev/null 

FROM python:3.8-alpine as development

WORKDIR /app

COPY --from=dep-install /app ./ 
COPY --from=dep-install /usr /usr

COPY entrypoint.development.sh ./
RUN ["chmod", "+x", "./entrypoint.development.sh"]
ENTRYPOINT ["./entrypoint.development.sh"]


FROM ... as staging



FROM ... as production

