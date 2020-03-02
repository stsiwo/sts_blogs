from typing import List
from flask_mail import Message
from Configs.extensions import mail
from Aop.loggingDecorator import loggingDecorator
from Configs.app import app


class EmailClient(object):
    """ please replace with real impl """

    def __init__(self):
        pass

    @loggingDecorator()
    def send(self, subject: str, sender: str, recipients: List[str], html: str):
        message = Message(
                subject=subject,
                html=html,
                sender=sender,
                recipients=recipients
                )

        mail.send(message)
