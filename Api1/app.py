import Configs.appConfig

app = Configs.appConfig.configureApp()

if __name__ == "__main__":
    Configs.appConfig.app.run(host='0.0.0.0', port=5000, debug=True)
