from flask import Flask
import os

app = Flask(__name__, root_path=os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
