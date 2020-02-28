from Configs.app import app
# from Configs.ygmailConfig import yag
from exceptions.EmailServiceException import EmailServiceException
from urllib.parse import urljoin
from Aop.loggingDecorator import loggingDecorator
from Infrastructure.Email.Client.EmailClient import EmailClient
from Infrastructure.Email.Template.EmailTemplateBase import EmailTemplateBase
# need to import all of subclass of this, to use '__subclasses__()'
from Infrastructure.Email.Template.ResetPasswordTemplate import ResetPasswordTemplate


class EmailService(object):

    _client: EmailClient

    template: EmailTemplateBase

    def __init__(self):
        self._client = EmailClient()
        pass

    def _setTemplateFromKey(self, key: str):
        for SubTemplate in EmailTemplateBase.__subclasses__():
            if SubTemplate.key == key:
                self.template = SubTemplate()

    @loggingDecorator()
    def sendForgotPasswordEmail(self, to: str, token: str, recipientName: str) -> None:

        resetLink = urljoin(app.config['CLIENT_SPA_URL'], '/password-reset?token={}'.format(token))

        self._setTemplateFromKey("reset-password")
        self.template.setRecipients([to])
        self.template.makeTemplate(recipient=recipientName, resetLink=resetLink)

        try:
            self._client.send(
                    subject=self.template.subject,
                    sender=self.template.sender,
                    recipients=self.template.recipients,
                    html=self.template.html
                    )

        except Exception as e:
            app.logger.error("*** email service error ***")
            app.logger.error(e.message)
            raise EmailServiceException()
