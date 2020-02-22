from logging.config import dictConfig

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
                'class': 'logging.FileHandler',
                'filename': 'api.log',
                'mode': 'w',
                'formatter': 'default'
        },
    },
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi', 'file']
    }
})
