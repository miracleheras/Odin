# ICEYE FULL STACK TECHNICAL CHALLENGE

## 1. Requirements for the project
Build a new ODIN which can help ships to find their ways while providing the position of the lighthouses.

## 2. Technologies Used
- Frontend: React(with TypeScript), Jest(Testing)
- Backend: Python FastAPI, Pytest(Testing)
- Docker

## 3. Installation

### Run the project
The frontend server is a Node project using typescript and React. It needs node (v18) installed and can be run with

```
cd odin-ui
npm install
npm start
```

The backend is a python FastAPI backend. It needs an empty python 3.12 environment (like conda or pyenv) and can be set up and started with

```
cd odin-api
pip install -r requirements.txt
uvicorn main:app --reload
```

Now you can see the ODIN frontend on http://localhost:3000

### Testing

#### Backend Testing
```
cd odin-api
pytest
```
#### Frontend Testing
``` 
cd odin-ui
npm test
```

### Containerization
```
docker compose up
```

