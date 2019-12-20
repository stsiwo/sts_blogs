import marks
import pytest
pytestmark = [pytest.mark.footer]


# FOOTER
@marks.all_ssize
@marks.all_page
def test_should_display_footer_content_of_about_me(responsive_target, TargetPage):

    target_page = TargetPage(responsive_target['driver'])

    assert target_page.get_text_of_element_in_footer('about_me')
