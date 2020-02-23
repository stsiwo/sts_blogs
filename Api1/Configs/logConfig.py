from logging.config import dictConfig
from datetime import datetime

# log config
# must before flask app is instanciate
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
                'filename': '/var/log/sts-blogs-api/api.' + datetime.now().strftime("%m-%d-%Y") + ".log",
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
