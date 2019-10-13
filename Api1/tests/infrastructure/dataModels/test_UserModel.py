

def test_user_factory(session, UserFactory):
    factory = UserFactory()
    print(factory)

    assert 1 == 2


def test_role_factory(session, RoleFactory):
    factory = RoleFactory()
    print(factory)

    assert 1 == 2
