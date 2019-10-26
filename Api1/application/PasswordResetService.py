from Configs.app import app
from Configs.extensions import api
from flask import abort, jsonify, Response
from utils.forgotPasswordToken import generateForgotPasswordToken, decodeForgotPasswordToken
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db
from application.EmailService import EmailService
from Infrastructure.transactionDecorator import db_transaction
from itsdangerous import BadSignature, SignatureExpired
from Infrastructure.repositories.UserRepository import UserRepository
from utils.util import printObject
from exceptions.SignatureExpiredException import SignatureExpiredException
from exceptions.BadSignatureException import BadSignatureException
from exceptions.EmailNotFoundException import EmailNotFoundException


class PasswordResetService(object):

    _emailService: EmailService

    _userRepository: UserRepository

    def __init__(self):
        self._emailService = EmailService()
        self._userRepository = UserRepository()

    def requestForgotPasswordService(self, email: str):
        app.logger.info("start requestForgotPasswordService service")
        print("start requestForgotPasswordService service")

        user = self._userRepository.find(email=email)

        if user is None:
            raise EmailNotFoundException

        token = generateForgotPasswordToken(user.id)

        self._emailService.sendForgotPasswordEmail(
            to=user.email,
            token=token
            )

    @db_transaction()
    def resetPasswordService(self, token: str, newPassword: str):
        app.logger.info("start resetPasswordService service")
        print("start resetPasswordService service")

        printObject(api.errors)

        try:
            userId = decodeForgotPasswordToken(token)

        except SignatureExpired as e:
            raise SignatureExpiredException
        except BadSignature as e:
            raise BadSignatureException
        else:
            user = db.session.query(User).get(userId)
            user.password = newPassword
