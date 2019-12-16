import pytest

mobile_ssize = pytest.mark.responsive(size=['mobile'])
lte_tablet_ssize = pytest.mark.responsive(size=['mobile', 'tablet'])
lte_laptop_ssize = pytest.mark.responsive(size=['mobile', 'tablet', 'laptop'])
all_ssize = pytest.mark.responsive(size=['mobile', 'tablet', 'laptop', 'desktop'])
gte_tablet_ssize = pytest.mark.responsive(size=['tablet', 'laptop', 'desktop'])
gte_laptop_ssize = pytest.mark.responsive(size=['laptop', 'desktop'])
desktop_ssize = pytest.mark.responsive(size=['desktop'])
