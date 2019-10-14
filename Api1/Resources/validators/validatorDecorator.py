from functools import wraps
from Configs.app import app


def validate_request_with(validator):
    """use as decorator and argument must be one of the vaidator function in this directory

    Parameters:
        validator (function): validator function

    Returns:
        None
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            app.logger.info("start validation...")
            validator()
            app.logger.info("validation has done...")
            app.logger.info("calling resource endpoint...")
            return f(*args, **kwargs)
        return decorated_function
    return decorator
