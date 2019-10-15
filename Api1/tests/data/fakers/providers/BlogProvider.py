# first, import a similar Provider or use the default one
from faker.providers import BaseProvider


# create new provider class. Note that the class name _must_ be ``Provider``.
class BlogProvider(BaseProvider):
    def blogTitle(self):
        return 'my first test blog title'
