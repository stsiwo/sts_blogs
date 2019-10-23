from Configs.app import app
from exceptions.EmailAddressNotFoundException import EmailAddressNotFoundException
from exceptions.ForgotPasswordTokenExpiredException import ForgotPasswordTokenExpiredException
from utils.forgotPasswordToken import generateForgotPasswordToken, decodeForgotPasswordToken
from Infrastructure.DataModels.UserModel import User
from Configs.extensions import db
from application.EmailService import EmailService
from Infrastructure.transactionDecorator import db_transaction
from itsdangerous import BadSignature, SignatureExpired


class PasswordResetService(object):

    _emailService: EmailService

    def __init__(self):
        self._emailService = EmailService()

    def requestForgotPasswordService(self, email: str):
        app.logger.info("start requestForgotPasswordService service")
        print("start requestForgotPasswordService service")

        user = db.session.query(User).filter_by(email=email).first()

        if user is None:
            raise EmailAddressNotFoundException()
        else:
            token = generateForgotPasswordToken(user.id)

            self._emailService.sendForgotPasswordEmail(
                to=user.email,
                token=token
                )

    @db_transaction()
    def resetPasswordService(self, token: str, newPassword: str):
        app.logger.info("start resetPasswordService service")
        print("start resetPasswordService service")

        try:
            userId = decodeForgotPasswordToken(token)
        except SignatureExpired as e:
            print("SignatureExpired is called")
            raise e
        except BadSignature as e:
            print("BadSignature is called")
            raise e
        else:
            user = db.session.query(User).get(userId)
            user.password = newPassword
