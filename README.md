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

## 4. Deployment Plan for ODIN

You can find the deployment plan in this document.

https://docs.google.com/document/d/1kp5jibWs9ZfS_SmZ5Qai6auJi3LZnJJFr9BKYX93x4o/edit?tab=t.0