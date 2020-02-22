from flask import Flask
import os

# must be before flask app is instantiated
import Configs.logConfig

app = Flask(__name__, root_path=os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
