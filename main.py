from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pymongo import MongoClient
from contextlib import asynccontextmanager
from datetime import datetime
from auth import (
    User, Token,
    get_password_hash, verify_password,
    create_access_token, SECRET_KEY, ALGORITHM
)
from uuid import uuid4
from pydantic import BaseModel



# Chat request model
class ChatRequest(BaseModel):
    message: str

# In-memory session store
sessions = {}


# MongoDB global handles
client = None
db = None
collection = None

# OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Lifespan to initialize DB -------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db, collection
    client = MongoClient("mongodb://localhost:27017")
    db = client["promethia_ai"]
    collection = db["customer_details"]
    print("[INIT] MongoDB connected and ready")
    yield
    client.close()

#-----------------------------------------------------------------------


app = FastAPI(lifespan=lifespan)

# Register user
@app.post("/register")
def register_user(user: User):
    if collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already registered")

    if len(user.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

    hashed_password = get_password_hash(user.password)
    user_doc = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "date_of_joining": datetime.utcnow()
    }
    collection.insert_one(user_doc)
    return {"message": "User registered successfully", "code": "SUCCESS"}

# Login user
@app.post("/login", response_model=Token)
def verify_login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = collection.find_one({"username": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    print('LOGIN SUCCESFU')
    token = create_access_token(data={"sub": user["username"]})
    return {"access_token": token, "token_type": "bearer"}

# Auth helper
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Protected Profile route
@app.get("/profile")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return {
        "message": "User details retrieved",
        "code": "SUCCESS",
        "username": current_user["username"],
        "email": current_user["email"],
        "date_of_joining": current_user["date_of_joining"]
    }



# Directing to the user-session
@app.post("/start_session")
async def start_session():
    # Generate a unique session ID
    session_id = str(uuid4())
    # Initialize session data (e.g., chat history)
    sessions[session_id] = {"history": []}
    # Return the unique session URL
    return {"session_id": session_id, "session_url": f"/chat/{session_id}"}

@app.post("/chat/{session_id}")
async def chat(session_id: str, request: ChatRequest):
    # Check if session exists
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    # Get session data
    session_data = sessions[session_id]
    user_message = request.message

    # Simulate chatbot response (integrate FastAI model here)
    # For now, echo the message and store it in history
    response = f"Bot response to: {user_message}"  # Replace with FastAI model inference
    session_data["history"].append({"user": user_message, "bot": response})
    
    # Update session data
    sessions[session_id] = session_data
    
    return {"response": response, "history": session_data["history"]}

# Endpoint to end a session
@app.delete("/end_session/{session_id}")
async def end_session(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    del sessions[session_id]
    return {"message": f"Session {session_id} ended"}