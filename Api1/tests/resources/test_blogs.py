

def test_blogs_get_endpoint(client):

    response = client.get('/blogs')
    assert 200 == response.status_code


def test_blogs_post_endpoint(client):

    response = client.post('/blogs')
    assert 200 == response.status_code


def test_blogs_put_endpoint(client):

    response = client.put('/blogs')
    assert 200 == response.status_code


def test_blogs_patch_endpoint(client):

    response = client.patch('/blogs')
    assert 200 == response.status_code


def test_blogs_delete_endpoint(client):

    response = client.delete('/blogs')
    assert 200 == response.status_code
