import Configs.appConfig
import Configs.dbConfig
import sys


def createDbSchemeBeforeFirstRequest():
    @Configs.appConfig.app.before_first_request
    def createDbScheme():
        print('setup db tables', file=sys.stdout)
        Configs.dbConfig.db.create_all()
