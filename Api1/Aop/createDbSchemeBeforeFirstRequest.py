import Configs.appConfig
import Configs.dbConfig
import sys


# not working
def createDbSchemeBeforeFirstRequest():
    @Configs.appConfig.app.before_first_request
    def createDbScheme():
        print('setup db tables', file=sys.stdout)
        Configs.dbConfig.db.create_all()
