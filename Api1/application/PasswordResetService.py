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
from exceptions.ResetPasswordTokenExpiredException import ResetPasswordTokenExpiredException
from exceptions.BadSignatureException import BadSignatureException
from exceptions.EmailNotFoundException import EmailNotFoundException
from Aop.loggingDecorator import loggingDecorator


class PasswordResetService(object):

    _emailService: EmailService

    _userRepository: UserRepository

    def __init__(self):
        self._emailService = EmailService()
        self._userRepository = UserRepository()

    @loggingDecorator()
    def requestForgotPasswordService(self, email: str):

        user = self._userRepository.find(email=email)

        # TODO: remove this and use 'email detection feature (type ahead) in front end
        # https://app.clickup.com/t/3m56ux
        if user is None:
            raise EmailNotFoundException

        token = generateForgotPasswordToken(user.id)

        self._emailService.sendForgotPasswordEmail(
            to=user.email,
            token=token,
            recipientName=user.name
            )

    @db_transaction()
    @loggingDecorator()
    def resetPasswordService(self, token: str, newPassword: str):
        app.logger.info("start resetPasswordService service")

        try:
            userId = decodeForgotPasswordToken(token)

        except SignatureExpired as e:
            raise ResetPasswordTokenExpiredException
        except BadSignature as e:
            raise BadSignatureException
        else:
            app.logger.info("*** user password of userId ***")
            app.logger.info(userId)
            user = db.session.query(User).get(userId)
            user.password = newPassword
