from abc import ABC, abstractmethod
from Infrastructure.DataModels.BlogModel import Blog
from sqlalchemy.orm.query import Query
from typing import List, Dict


class BlogFilter(ABC):

    _entity: Blog = Blog

    _key: str = None

    def __init__(self):
        pass

    @abstractmethod
    def getFilter(self, values: Dict):
        pass
