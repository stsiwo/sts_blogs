from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from Configs.extensions import db
from typing import TypeVar, List, Generic

T = TypeVar('T')


class BaseRepository(ABC, Generic[T]):

    _session: Session

    def __init__(self):
        self._session = db.session

    @abstractmethod
    def get(self, id: str) -> T:
        pass

    @abstractmethod
    def getAll(self) -> List[T]:
        pass

    @abstractmethod
    def delete(self, id: str) -> None:
        pass

    def add(self, model: T) -> None:
        self._session.add(model)

    def flush(self) -> None:
        self._session.flush()
