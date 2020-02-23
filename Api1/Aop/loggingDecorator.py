from functools import wraps
from Configs.app import app


def loggingDecorator():
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # before target function called
            target = None
            try:
                app.logger.info("start {0} with {1} and {2}".format(f.__name__, args, kwargs))
                target = f(*args, **kwargs)  # inner function is called here
            except Exception as ex:
                app.logger.info("oops!! something is wrong at {0} ".format(f.__name__))
                raise ex
            else:
                # after target function called
                app.logger.info("complete {0} with return value of {1}".format(f.__name__, target))
            return target
        return decorated_function
    return decorator
