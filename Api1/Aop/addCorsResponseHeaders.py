from Configs.app import app
from flask import Response


@app.after_request
def addCorsResponseHeaders(response: Response):
    app.logger.info("*** add cors header to responses ***")
    # withCredentials in client: only one domain is allowed to communicate
    # response.headers['Access-Control-Allow-Origin'] = app.config['CLIENT_SPA_URL']
    response.headers['Access-Control-Allow-Origin'] = app.config['CLIENT_SPA_URL']
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    # response.headers['Access-Control-Allow-Methods'] = 'GET POST PUT PATCH DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'content-type, Set-Cookie, x-csrf-token'
    # temply allow all origin: fix this before production
    # response.headers['Access-Control-Allow-Origin'] = '*'
    app.logger.info(response.headers)
    return response
