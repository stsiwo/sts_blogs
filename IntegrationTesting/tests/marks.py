import pytest
import tests.config as cfg

# short hand for responsive mark
mobile_ssize = pytest.mark.responsive(size=['mobile'])
lte_tablet_ssize = pytest.mark.responsive(size=['mobile', 'tablet'])
lte_laptop_ssize = pytest.mark.responsive(size=['mobile', 'tablet', 'laptop'])
all_ssize = pytest.mark.responsive(size=['mobile', 'tablet', 'laptop', 'desktop'])
gte_tablet_ssize = pytest.mark.responsive(size=['tablet', 'laptop', 'desktop'])
gte_laptop_ssize = pytest.mark.responsive(size=['laptop', 'desktop'])
desktop_ssize = pytest.mark.responsive(size=['desktop'])

# short hand for page mark
home_page = pytest.mark.page(page=['home'])
signup_page = pytest.mark.page(page=['signup'])
login_page = pytest.mark.page(page=['login'])
blog_list_page = pytest.mark.page(page=['blog_list'])
all_page = pytest.mark.page(page=cfg.available_page_options)
