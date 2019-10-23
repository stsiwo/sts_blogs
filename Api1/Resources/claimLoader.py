from Configs.extensions import jwt
from typing import Dict
from utils.util import printObject


@jwt.user_claims_loader
def add_claims_to_access_token(identity: Dict):
    print("constructing claim in jwt")
    printObject(identity)
    return {
        'id': identity['id'],
        'name': identity['name'],
        'roles': identity['roles'],
    }
