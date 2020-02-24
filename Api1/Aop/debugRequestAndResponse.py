from Configs.app import app
from flask import Response, request


@app.after_request
def after(response: Response):
    app.logger.info('***debugging response***')
    app.logger.info('***response status:')
    app.logger.info(response.status)
    app.logger.info('***response header:')
    app.logger.info(response.headers)
    app.logger.info('***response data:')
    # NOTE: request for image (/images) endpoint causes following errors:
    # RuntimeError: Attempted implicit sequence conversion but the response object is in direct passthrough mode.
    # reference: https://github.com/miguelgrinberg/oreilly-flask-apis-video/issues/6
    # many this include no sequence (binary or too big data)
    # solution: below line
    response.direct_passthrough = False

    app.logger.info(response.get_data())

    return response


@app.before_request
def before_request():
    app.logger.info('*** debugging request ***')
    app.logger.info('*** request destination ***')
    app.logger.info(request.url)
    app.logger.info('*** request header ***')
    app.logger.info(request.headers)
    app.logger.info('*** request cookies ***')
    app.logger.info(request.cookies)
    app.logger.info('*** request data ***')
    app.logger.info(request.data)
    app.logger.info('*** request form ***')
    app.logger.info(request.form)
    app.logger.info('*** request files ***')
    app.logger.info(request.files)
