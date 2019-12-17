from Configs.appConfig import app
from flask import Response


@app.after_request
def addCorsResponseHeaders(response: Response):
    # withCredentials in client: only one domain is allowed to communicate
    # response.headers['Access-Control-Allow-Origin'] = [app.config['CLIENT_SPA_URL'], app.config['DEV_CLIENT_SPA_URL'] + ':8080']
    response.headers['Access-Control-Allow-Origin'] = app.config['DEV_CLIENT_SPA_URL']
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    # response.headers['Access-Control-Allow-Methods'] = 'GET POST PUT PATCH DELETE'
    # response.headers['Access-Control-Allow-Headers'] = '*'
    # temply allow all origin: fix this before production
    # response.headers['Access-Control-Allow-Origin'] = '*'
    return response
