from Configs.appConfig import app
from flask import Response, request


@app.after_request
def after(response: Response):
    print('***debugging response***')
    print('***response status:')
    print(response.status)
    print('***response header:')
    print(response.headers)
    print('***response data:')
    # NOTE: request for image (/images) endpoint causes following errors:
    # RuntimeError: Attempted implicit sequence conversion but the response object is in direct passthrough mode.
    # reference: https://github.com/miguelgrinberg/oreilly-flask-apis-video/issues/6
    # many this include no sequence (binary or too big data)
    # solution: below line
    response.direct_passthrough = False

    print(response.get_data())

    return response


@app.before_request
def before_request():
    print('*** debugging request ***')
    print('*** request header ***')
    print(request.headers)
    print('*** request cookies ***')
    print(request.cookies)
    print('*** request data ***')
    print(request.data)
