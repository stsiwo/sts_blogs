from Configs.app import app
# from Configs.ygmailConfig import yag
from exceptions.EmailServiceException import EmailServiceException
from urllib.parse import urljoin
from Aop.loggingDecorator import loggingDecorator


class EmailClient(object):
    """ please replace with real impl """

    def __init__(self):
        pass

    def send(self, to, subject, contents):
        pass


class EmailService(object):

    _client: EmailClient

    def __init__(self):
        self._client = EmailClient()
        pass

    @loggingDecorator()
    def sendForgotPasswordEmail(self, to: str, token: str) -> None:

        subject = "Password Reset Request"

        clientResetPasswordUrl = urljoin(app.config['CLIENT_SPA_URL'], '/password-reset?token={}'.format(token))

        html = '<a href="{}">Reset Your Password</a>'.format(clientResetPasswordUrl)

        try:
            self._client.send(to=to, subject=subject, contents=html)
        except Exception as e:
            app.logger.info("*** email service error ***")
            app.logger.info(e)
            raise EmailServiceException()
