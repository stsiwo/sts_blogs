from flask import Flask

app = Flask(__name__)

@app.route("/api1")
def hello():
    html = "<h3>Hello {name} from api1 api!</h3>" 
    return html.format(name="satoshi")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
