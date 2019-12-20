import pytest
import marks
pytestmark = [pytest.mark.common]


# COMMON
@marks.all_ssize
@marks.signup_page
def test_should_have_title_in_target_page(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.is_title_matches('STS')
