from flask import jsonify, Response
from Configs.app import app
from exceptions.BadSignatureException import BadSignatureException
from exceptions.SignatureExpiredException import SignatureExpiredException
from exceptions.BlogNotFoundException import BlogNotFoundException
from exceptions.EmailNotFoundException import EmailNotFoundException
from exceptions.CommentNotFoundException import CommentNotFoundException


def constructResponse(error):
    response: Response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.errorhandler(BadSignatureException)
def badSignature(error):
    return constructResponse(error)


@app.errorhandler(SignatureExpiredException)
def signatureExpired(error):
    return constructResponse(error)


@app.errorhandler(EmailNotFoundException)
def emailNotFound(error):
    return constructResponse(error)


@app.errorhandler(BlogNotFoundException)
def blogNotFound(error):
    return constructResponse(error)


@app.errorhandler(CommentNotFoundException)
def commentNotFound(error):
    return constructResponse(error)
