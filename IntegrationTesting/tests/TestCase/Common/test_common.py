import pytest
import marks
pytestmark = [pytest.mark.common]


# COMMON
@marks.all_ssize
@marks.all_page
def test_should_have_title_in_target_page(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.is_title_matches('STS')


@pytest.mark.scroll
@marks.all_ssize
@marks.all_page
def test_should_not_display_scroll_y(responsive_target, TargetPage):
    """
        this is to detect any overflow element and cause scroll y appears in window
            - if this test failed, it means there is some elements overflow in window
            and cause scrollable y
    """

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.is_scrollable_y() is not True
