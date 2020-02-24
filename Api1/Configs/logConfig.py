from logging.config import dictConfig
from datetime import datetime
from Configs.settings import currentEnv

# testing & development: put log file at root directory of this project
# staging & production: put log file at /var/log/sts-blogs-api/
logFilePath = '/var/log/sts-blogs-api/api.' + datetime.now().strftime("%m-%d-%Y") + ".log" if currentEnv == 'STAGING' or currentEnv == 'PRODUCTION' else "api." + datetime.now().strftime("%m-%d-%Y") + ".log"

# log config
# must before flask app is instanciate
# if need config after flask app is instantiated, need to remove default logger config
dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s [process id: %(process)d - thread id: %(thread)d thread]: %(message)s',
    }},
    'handlers': {
        'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        },
        'file': {
                'class': 'logging.handlers.RotatingFileHandler',
                'filename': logFilePath,
                'mode': 'w',
                'formatter': 'default',
                'maxBytes': 10*1024*1024,
                'backupCount': 100,
        },
    },
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi', 'file']
    }
})
