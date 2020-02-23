from functools import wraps
from Configs.extensions import db
from Configs.app import app


def db_transaction():
    """use as decorator and argument must be one of the vaidator function in this directory

    Parameters:
        validator (function): validator function

    Returns:
        None
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # before target function called
            # db.session.begin(subtransactions=True)
            # don't need to call above. flask-sqlclchemy automatically begin when request start
            # nesting (subtransaction is also available but for now don't need to implement this
            # if you need to subtransaction feature, remove the above comment for the code
            target = None
            app.logger.info("start db transaction although already started")
            try:
                app.logger.info("calling inner service {0}...".format(f.__name__))
                target = f(*args, **kwargs)
                app.logger.info("inner service {0} has done".format(f.__name__))
                # after target function called
            except:
                app.logger.info("something is wrong about inner service and catching in db transaction decorator")
                app.logger.info("db transaction rollback")
                db.session.rollback()
                # this might need to change to handle exception like return 5xx response
                # REFACTOR
                raise
            else:
                app.logger.info("inner service has completed successfully")
                app.logger.info("db transaction commit")
                db.session.commit()
            return target
        return decorated_function
    return decorator
