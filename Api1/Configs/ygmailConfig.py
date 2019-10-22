import yagmail
from Config.app import app

# yagmail register
yagmail.register(app.config['MYGMAIL_USERNAME'], app.config['MYGMAIL_PASSWORD'])
yag = yagmail.SMTP(app.config['MYGMAIL_USERNAME'])
