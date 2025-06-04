def test_read_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Welcome to ODIN API",
        "status": "active",
        "version": "1.0.0"
    }

def test_lighthouses_endpoint(client):
    response = client.get("/api/lighthouses")
    assert response.status_code == 200

def test_images_endpoint(client):
    response = client.get("/api/images")
    assert response.status_code == 200 