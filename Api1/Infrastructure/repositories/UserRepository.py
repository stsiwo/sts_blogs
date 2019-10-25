from Infrastructure.DataModels.UserModel import User
from Infrastructure.repositories.BaseRepository import BaseRepository
from typing import List, Dict


class UserRepository(BaseRepository[User]):

    def getAll(self) -> List[User]:
        return self._session.query(User).all()

    def get(self, id: str) -> User:
        return self._session.query(User).get(id)

    def find(self, **kwargs: Dict) -> User:
        """ don't include password as args """
        return self._session.query(User).filter_by(**kwargs).first()

    def getByEmail(self, email: str) -> User:
        return self._session.query(User).filter_by(email=email).first()

    def delete(self, id: str):
        self._session.query(User).filter_by(id=id).delete()

    def deleteByEmail(self, email: str):
        self._session.query(User).filter_by(email=email).delete()
