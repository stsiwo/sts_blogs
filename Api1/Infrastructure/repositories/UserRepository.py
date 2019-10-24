from sqlalchemy.orm import Session
from Configs.extensions import db
from Infrastructure.DataModels.UserModel import User
from Infrastructure.DataModels.RoleModel import Role
from typing import List, Dict


class UserRepository(object):

    _session: Session

    def __init__(self):
        self._session = db.session

    def getAll(self) -> List[User]:
        return self._session.query(User).all()

    def get(self, id: str) -> User:
        return self._session.query(User).get(id)

    def getByEmail(self, email: str) -> User:
        return self._session.query(User).filter_by(email=email).first()

    def create(self, name: str, email: str, password: str, avatarUrl: str = None, roles: List[str] = ['member']):

        roles = [self._session.query(Role).filter_by(name=name).first() for name in roles]
        user = User(name=name, email=email, avatarUrl=avatarUrl, roles=roles)
        user.password = user.hashPassword(password)
        self._session.add(user)

    def updateById(self, id: str, **kwargs: Dict[str, str]):
        user = self.get(id)
        self.updateByObject(user, **kwargs)

    def updateByEmail(self, email: str, **kwargs: Dict[str, str]):
        user = self.getByEmail(email)
        self.updateByObject(user, **kwargs)

    def updateByObject(self, user: User, **kwargs: Dict[str, str]):
        for key, value in kwargs.items():
            if key in User.__dict__:
                if key == 'password':
                    setattr(user, key, user.hashPassword(value))
                else:
                    setattr(user, key, value)

    def delete(self, id: str):
        self._session.query(User).filter_by(id=id).delete()

    def deleteByEmail(self, email: str):
        self._session.query(User).filter_by(email=email).delete()
