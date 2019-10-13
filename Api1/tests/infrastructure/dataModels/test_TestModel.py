from Infrastructure.DataModels.TestModel import Test


def test_test_model(TestFactory, session):
    print("inside test model test")
    print("content of session")

    sampleTest = TestFactory()
    print(sampleTest)

    session.add(sampleTest)
    queriedTestList = session.query(Test).all()

    print(queriedTestList)

    assert 0
