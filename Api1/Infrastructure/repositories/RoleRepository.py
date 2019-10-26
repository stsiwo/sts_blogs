from Infrastructure.DataModels.RoleModel import Role
from typing import List
from Infrastructure.repositories.BaseRepository import BaseRepository


class RoleRepository(BaseRepository[Role]):

    def getAll(self) -> List[Role]:
        return self._session.query(Role).all()

    def get(self, name: str) -> Role:
        return self._session.query(Role).filter_by(name=name).first()

    # does not throw exception when role name does not exist
    def delete(self, name: str) -> None:
        self._session.query(Role).filter_by(name=name).delete()
