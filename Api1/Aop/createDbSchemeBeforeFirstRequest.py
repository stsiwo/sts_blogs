from Configs.app import app
import Configs.dbConfig
import sys


# not working
def createDbSchemeBeforeFirstRequest():
    @app.before_first_request
    def createDbScheme():
        app.logger.info('setup db tables', file=sys.stdout)
        Configs.dbConfig.db.create_all()
