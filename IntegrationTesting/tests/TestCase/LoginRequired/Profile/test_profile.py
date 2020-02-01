from tests.Pages.ProfilePage import ProfilePage
from tests.Pages.LoginPage import LoginPage
from tests.Pages.HomePage import HomePage
from tests.Pages.BlogManagementPage import BlogManagementPage
import pytest
import marks
import tests.config as cfg
import itertools
from datetime import datetime
from tests.data.faker import fake
import os
pytestmark = [marks.profile_page, pytest.mark.profile]

# caveats:
# - this test share the login state for this entire module, so each test function might affect each other.
#   so please keep the state original if you modify the state during a test function
# ex)
#   if you add avatar image during a test function, as cleanup, you should remove the avatar image after assertion


# BLOGLISTPAGE
@marks.all_ssize
def test_profile_page_should_display_profile_page_heading(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    # check page title does exist
    assert profile_page.does_have_text_in_page('Profile Management')


@marks.all_ssize
def test_profile_page_should_display_updated_name_after_only_name_change_request(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    # enter random name
    # must be random name since this test is run multiple times
    profile_page.enter_text_in_element(fake.name(), 'user_name_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')


@marks.all_ssize
def test_profile_page_should_display_update_email_after_only_email_change_request(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    # enter random name
    # must be random name since this test is run multiple times
    profile_page.enter_text_in_element(fake.email(), 'user_email_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')

    # reset email to original one for the sake of continuous testing without rebuild docker
    profile_page.enter_text_in_element(cfg.test_user_email_for_profile, 'user_email_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_display_update_password_after_only_password_change_reques(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    newPassword = fake.password()

    # enter random name
    # must be random name since this test is run multiple times
    profile_page.enter_text_in_element(newPassword, 'user_password_input', clear=True)
    profile_page.enter_text_in_element(newPassword, 'user_confirm_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')

    # reset password to original one for the sake of continuous testing without rebuild docker
    profile_page.enter_text_in_element(cfg.test_user_password_for_profile, 'user_password_input', clear=True)
    profile_page.enter_text_in_element(cfg.test_user_password_for_profile, 'user_confirm_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_display_all_updated_user_info_after_all_user_info_change_request(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    newPassword = fake.password()

    # enter random name
    # must be random name since this test is run multiple times
    profile_page.enter_text_in_element(fake.name(), 'user_name_input', clear=True)
    profile_page.enter_text_in_element(fake.email(), 'user_email_input', clear=True)
    profile_page.enter_text_in_element(newPassword, 'user_password_input', clear=True)
    profile_page.enter_text_in_element(newPassword, 'user_confirm_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')

    # reset password to original one for the sake of continuous testing without rebuild docker
    profile_page.enter_text_in_element(cfg.test_user_name_for_profile, 'user_name_input', clear=True)
    profile_page.enter_text_in_element(cfg.test_user_email_for_profile, 'user_email_input', clear=True)
    profile_page.enter_text_in_element(cfg.test_user_password_for_profile, 'user_password_input', clear=True)
    profile_page.enter_text_in_element(cfg.test_user_password_for_profile, 'user_confirm_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_create_avatar_image(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    dummyImage = "test_image.jpg"

    # create image
    profile_page.enter_text_in_element(os.getcwd()+"/tests/data/" + dummyImage, 'user_avatar_image_input')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')
    assert profile_page.get_attribute_of_element('user_avatar_image', 'src') is not None

    # clean up (delete image)
    profile_page.click_element('avatar_image_delete_icon')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_unchange_the_state_of_no_avatar_image(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    # enter random name
    # must be random name since this test is run multiple times
    profile_page.enter_text_in_element(fake.name(), 'user_name_input', clear=True)

    profile_page.click_element('update_btn')

    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')
    assert profile_page.get_attribute_of_element('user_avatar_image', 'src') is None

    profile_page.enter_text_in_element(cfg.test_user_name_for_profile, 'user_name_input', clear=True)
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_update_existing_avatar_image_with_new_one(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    # prepare existing avatar image
    profile_page.enter_text_in_element(os.getcwd()+"/tests/data/test_image.jpg", 'user_avatar_image_input')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # update existing avatar image with new one
    profile_page.enter_text_in_element(os.getcwd()+"/tests/data/test_image1.jpg", 'user_avatar_image_input')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')

    # clean up (delete image)
    profile_page.click_element('avatar_image_delete_icon')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_delete_existing_avatar_imag(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    # prepare existing avatar image
    profile_page.enter_text_in_element(os.getcwd()+"/tests/data/test_image.jpg", 'user_avatar_image_input')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # clean up (delete image)
    profile_page.click_element('avatar_image_delete_icon')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')


@marks.all_ssize
def test_profile_page_should_unchange_existing_avatar_image(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    dummyImage = "test_image.jpg"
    dummyImagePath = os.getcwd()+"/tests/data/" + dummyImage

    # prepare existing avatar image
    profile_page.enter_text_in_element(dummyImagePath, 'user_avatar_image_input')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # try to change another info such as name and update
    profile_page.enter_text_in_element(fake.name(), 'user_name_input', clear=True)
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # check still image input has value
    assert profile_page.get_attribute_of_element('user_avatar_image', 'src') is not None

    # reset password to original one for the sake of continuous testing without rebuild docker
    profile_page.enter_text_in_element(cfg.test_user_name_for_profile, 'user_name_input', clear=True)
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_display_all_updated_user_info_after_all_user_info_change_request_with_avatar_image(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)

    newPassword = fake.password()

    # enter random name
    # must be random name since this test is run multiple times
    profile_page.enter_text_in_element(fake.name(), 'user_name_input', clear=True)
    profile_page.enter_text_in_element(fake.email(), 'user_email_input', clear=True)
    profile_page.enter_text_in_element(newPassword, 'user_password_input', clear=True)
    profile_page.enter_text_in_element(newPassword, 'user_confirm_input', clear=True)
    profile_page.enter_text_in_element(os.getcwd()+"/tests/data/test_image.jpg", 'user_avatar_image_input')

    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')

    # check page title does exist
    assert profile_page.does_have_text_in_page('updating user profile success')

    # reset password to original one for the sake of continuous testing without rebuild docker
    profile_page.enter_text_in_element(cfg.test_user_name_for_profile, 'user_name_input', clear=True)
    profile_page.enter_text_in_element(cfg.test_user_email_for_profile, 'user_email_input', clear=True)
    profile_page.enter_text_in_element(cfg.test_user_password_for_profile, 'user_password_input', clear=True)
    profile_page.enter_text_in_element(cfg.test_user_password_for_profile, 'user_confirm_input', clear=True)
    profile_page.click_element('avatar_image_delete_icon')
    profile_page.click_element('update_btn')
    profile_page.wait_for_text('updating user profile success')


@marks.all_ssize
def test_profile_page_should_route_user_blog_management_page_when_click_the_link(responsive_target, login_for_profile):

    profile_page = ProfilePage(responsive_target['driver'], independent=False)
    profile_page.click_element('to_manage_button')

    blog_management_page = BlogManagementPage(responsive_target['driver'], independent=False)

    # stuck!! need to review this one
    # blog_management_page.wait_for_element('page_title')

    assert blog_management_page.does_have_text_in_page('Blog Management')

    blog_management_page.click_element('profile_link')
    # blog_management_page.wait_for_element('page_title')
