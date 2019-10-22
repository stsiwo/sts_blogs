from itsdangerous import URLSafeTimedSerializer
from Configs.app import app

signer = URLSafeTimedSerializer(app.config['SIGNER_SECRET_KEY'], salt='forgot-password-token')
