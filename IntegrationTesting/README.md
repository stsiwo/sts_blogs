# Browser Testing With Pytest & Selenium

## HOW TO USE
  1. define test function. 
  2. add marks about which page and screen size (ssize) to be applied for the test function
    * ignoring adding marks of page/ssize end up running the test function in all cases (all pages & all ssize & all drivers)
  3. run pytest with custom options. 
    * only run test whose marks match with this option.
    ex)
      command) pytest --page=home
      running tests) test whose marks are '@marks.home_page'
    * available options are listed below:
    - --page: specify which page you want to test
      * available values:
        - all (default)
        - home 
        - signup 
        - login 
        - blog_list
      * available marks:
        - please refer to marks.py
    - --ssize: specify which sszie you want to test
      * available values:
        - all (default)
        - mobile
        - tablet
        - laptop
        - desktop
      * available marks:
        - please refer to marks.py
    - --driver: specify which driver you want to test with
      * available values:
        - all (default)
        - chrome
        - firefox

## HOW IT WORKS 
  - I implemented this with pytest & its fixtures
  1. before running specific test function, a fixture called ''
