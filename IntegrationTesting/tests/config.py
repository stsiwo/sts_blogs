
# add url when create new page
base_url = 'http://dev.stsiwo.com'

signup_url = '{}/signup'.format(base_url)

login_url = '{}/login'.format(base_url)

blog_list_url = '{}/blogs'.format(base_url)

profile_url = '{}/setting/profile'.format(base_url)

blog_management_url = '{}/setting/blogs'.format(base_url)

new_blog_url = '{}/setting/blogs/new'.format(base_url)

update_blog_url = '{}/setting/blogs/update'.format(base_url)

seleniumServerUrl = 'http://127.0.0.1:4444/wd/hub'

animation_duration_sc = 0.5  # sc

ssize_height = 1000

ssize_width_mobile = 425

ssize_width_tablet = 768

ssize_width_laptop = 1024

ssize_width_desktop = 1440

available_driver_options = ['chrome', 'firefox']

# add when new page added
available_page_options = ['home', 'signup', 'login', 'blog_list', 'profile', 'blog_management', 'new_blog', 'update_blog']

available_ssize_options = ['mobile', 'tablet', 'laptop', 'desktop']

# add when new page is member only
member_only_pages = ['profile', 'blog_management', 'new_blog', 'update_blog']

# config relating test data

test_user_name = 'test member'

test_user_email = 'test@member.com'

test_user_password = 'test_member'

test_user_name_for_profile = 'test member1'

test_user_email_for_profile = 'test@member1.com'

test_user_password_for_profile = 'test_member1'

test_blog_item_keyword = 'keyword'

test_blog_item_start_date = '01/01/2050'

test_blog_item_end_date = '01/01/1950'

test_blog_item_tag = 'js'
