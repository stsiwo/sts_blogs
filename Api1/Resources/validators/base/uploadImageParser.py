from flask_restful import reqparse
import werkzeug


def uploadImageParser(fileName: str):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument(fileName, type=werkzeug.datastructures.FileStorage, location='files', required=True)

    return parser
