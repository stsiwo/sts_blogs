from Configs.app import app
from abc import (ABC, abstractmethod)
from typing import Tuple


class EmailTemplateBase(ABC):

    subject: str

    html: str

    sender: str

    recipients: [str]

    def __init__(self, subject: str = '', html: str = '', sender: Tuple[str, str] = (app.config.get("WEB_APP_TITLE"), app.config.get("MAIL_USERNAME")), recipients: [str] = []):
        self.subject = subject
        self.html = html
        self.sender = sender
        self.recipients = recipients

    def setRecipients(self, recipients: [str]):
        """ don't try to access recipient before calling this function otherwise it return empty
        """
        self.recipients = recipients

    def addRecipient(self, recipient: str):
        """ don't try to access recipient before calling this function otherwise it return empty
        """
        self.recipient.append(recipient)

    @abstractmethod
    def makeTemplate(self, **kwargs):
        """ kwargs of each implementation of ResetPasswordTemplate has different key/value pair so be careful
        """
        pass
