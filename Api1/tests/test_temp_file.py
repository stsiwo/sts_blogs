

def test_create_file():
#    f = open("sample.txt", "w+")
#
#    f.write("this is sample text")
#
#    f.close()
    f = open("sample.txt", "r")
    if f.mode == 'r':
        contents = f.read()
        print(contents)

    assert 0
