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
# add when new page added
home_page = pytest.mark.page(page=['home'])
signup_page = pytest.mark.page(page=['signup'])
login_page = pytest.mark.page(page=['login'])
blog_list_page = pytest.mark.page(page=['blog_list'])
profile_page = pytest.mark.page(page=['profile'])
blog_management_page = pytest.mark.page(page=['blog_management'])
new_blog_page = pytest.mark.page(page=['new_blog'])
update_blog_page = pytest.mark.page(page=['update_blog'])
blog_filter_sort_component = pytest.mark.page(page=['blog_list', 'blog_management'])
all_page = pytest.mark.page(page=cfg.available_page_options)
