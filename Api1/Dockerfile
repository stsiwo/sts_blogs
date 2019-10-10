FROM python:3-alpine as development

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT ["./docker-entrypoint.sh"]

FROM ... as staging


FROM ... as production

