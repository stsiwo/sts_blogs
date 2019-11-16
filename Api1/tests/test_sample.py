from sqlalchemy.sql.expression import and_


def test_kwargs(client):

    def test(*args, **kwargs):
        print(*args)
        for key, value in kwargs.items():
            print(key)
            print(value)

    test(1, 2, 3, kw1=1, kw2=2, kw3=3)
    assert 0


# class QueryStringValue(TypedDict):
#     value: List[str]
#     orOp: bool
# 
# 
# def test_custom_type():
#     QueryStringValue = TypedDict('TypedDict', {'value': List[str], 'orOp': bool})
# 
#     test: QueryStringValue = {
#             'value': ['test'],
#             'orOp': True
#             }
# 
#     print(test)

def express1(x: str):
    return lambda x: x == 3


def test_expression():

    filters = (
            express1(2)(1),
            express1(1),
            )

    test = and_(1 == 2, 1 == 3)
    print(test)
    assert 0
