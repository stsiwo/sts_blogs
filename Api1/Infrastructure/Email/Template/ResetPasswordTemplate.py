from Infrastructure.Email.Template.EmailTemplateBase import EmailTemplateBase


class ResetPasswordTemplate(EmailTemplateBase):

    key: str = "reset-password"

    def __init__(self):
        super().__init__(
                subject="Your Password Reset Request",
                )

    def makeTemplate(self, **kwargs):
        """ kwargs of each implementation of ResetPasswordTemplate has different key/value pair so be careful
        """
        self.html = """
            <div style="padding: 10px; width: 70%; margin: 0 auto;">
            <p>Hi {0} &#60; {1} &#62;,</p>
            <p>Here is a link to reset your password. Please click the below link.</p>
            <a href="{2}" >Reset My Password</a>
            <p>Please be advised that the above link will expire in 30 min so please reset password before the token is expired. If you don't need to reset password any more, please just ignore this email.</p>
            <br/>
            <p>Thanks,</p>
            <p>STS team</p>
            </div>
        """.format(kwargs.get("recipient"), kwargs.get("recipientEmail"), kwargs.get("resetLink"))
