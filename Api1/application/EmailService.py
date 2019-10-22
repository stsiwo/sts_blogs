from Configs.app import app
from Configs.ygmailConfig import yag
from exceptions.EmailServiceException import EmailServiceException


class EmailService(object):

    def __init__(self):
        self._client = yag
        pass

    def sendForgotPasswordEmail(self, to: str, link: str) -> None:
        app.logger.info("start email service")
        print("start email service")

        subject = "Password Reset Request"

        html = "<a href={}>Reset Your Password</a>".format(link)

        try:
            self._client.send(to=to, subject=subject, contents=html)
        except Exception as e:
            raise EmailServiceException()
