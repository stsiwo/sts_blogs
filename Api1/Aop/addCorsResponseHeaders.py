from Configs.appConfig import app
from flask import Response


@app.after_request
def addCorsResponseHeaders(response: Response):
    response.headers['Access-Control-Allow-Origin'] = app.config['CLIENT_SPA_URL']
    return response
