from itsdangerous import URLSafeTimedSerializer
from Configs.app import app

signer = URLSafeTimedSerializer(app.config['SIGNER_SECRET_KEY'], salt='forgot-password-token')


def generateForgotPasswordToken(data: str):
    return signer.dumps(data)


def decodeForgotPasswordToken(token: str):
    return signer.loads(token, max_age=app.config['FORGOT_PASSWORD_TOKEN_EXPIRY'])
