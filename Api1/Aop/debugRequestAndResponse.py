from Configs.appConfig import app
from flask import Response


@app.after_request
def after(response: Response):
    print('***debugging response***')
    print('***response status:')
    print(response.status)
    print('***response header:')
    print(response.headers)
    print('***response data:')
    print(response.get_data())

    return response
