from fastapi import FastAPI, HTTPException, Depends, status, WebSocket, WebSocketDisconnect
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Dict, Optional
import uvicorn
from transformers import pipeline


###########  CHATBOT LANGCHAIN  #########################################3

from models import Eunoia
from models.eunoia.summarizer import run_once as summarizer
from models.document_loader import web_loader

from langchain_cohere import CohereEmbeddings
from langchain.chat_models import init_chat_model
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_core.messages import SystemMessage, HumanMessage

llm = init_chat_model("llama3-8b-8192", model_provider="groq")
embeddings = CohereEmbeddings(model="embed-english-v3.0")
vector_store = InMemoryVectorStore(embeddings)

# Bulkload the VectorDB for the moment being
docs = {
    "mavic": [
        "https://www.dji.com/global/support/product/mavic-4-pro",
        "https://www.dji.com/global/support/product/mavic-3-pro"
    ]
}

for company, urls in docs.items():
    web_loader(urls, vector_store, company)

model = Eunoia(llm, embeddings, vector_store)
sessions: Dict[str, Dict] = {}

#######################################################################

app = FastAPI()

# List of end points that I need to implement

@app.post("/register")
async def register_user(user: User):
    """
    Register a new user.
    - Endpoint: POST /register
    - Request Body: User (username, email, password)
    - Response: User (username, email, disabled)
    """

    # TODO: Check if user already in DB
    if(True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )

    if user.email and "@" not in user.email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )

    if len(user.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long"
        )

    hashed_password = get_password_hash(user.password)

    # TODO: Store User in the DB
    # Ensure that you use the hashed_password
    # DB.insert(user)

    return {
        "message": "User registered successfully",
        "code": "SUCCESS"
    }

@app.post("/login")
async def verify_login(user: User) {
    # TODO: Requires DB implementation
    # Ensure that we create a new token which we can use
}


# Dependency to get current user from token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account disabled"
        )
    return user


# After Login the user can see his/her user profile
@app.get("/profile", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return {
        "message": "User details retrieved",
        "code": "SUCCESS",
        "username": current_user.username,
        "email": current_user.email
        "past_chats" : current_user.chat_history
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



# ============================== Sentiment Analysis ==============================
class SentimentRequest():

    def __init__(self, num_agents: int):
        self.num_agents = num_agents
        self.pipes = pipeline(
                "text-classification",
                model="tabularisai/multilingual-sentiment-analysis"
            )

    def analyze_sentiment(self, text: str):
        results = self.pipes(text)
        if results[0]['label'] in ['Negative', 'Very Negative']:
            return "Negative"
        else:
            return "Positive"

########################## ChatBot Websocket ##########################
@app.websocket("/chat/{session_id}")
async def websocket_chat(websocket: WebSocket, session_id: str):
    print ("GOT REQUEST FOR STREAMING !!!")

    await websocket.accept()
    if session_id not in sessions:
        sessions[session_id] = {"history": []}

    try:
        while True:
            data = await websocket.receive_text()
            message = data.strip()
            if not message:
                continue

            async for token in model(message, session_id): 
                await websocket.send_text(token)

            # session histories
            sessions[session_id]["history"].append({
                "user": message,
                "bot": "STREAMED"
            })

    except WebSocketDisconnect:
        print(f"WebSocket disconnected for session {session_id}")


@app.get("/chat/{session_id}")
async def get_chat(session_id: str):
    print("GOT REQUEST FOR CHAT HISTORY !!!")

    # Get full history from LangGraph memory
    try:
        messages = await model.get_history(session_id)  # `model` is your Eunoia instance

        # Format messages into a simplified role-based structure
        formatted = [
            {"role": "user" if "message" in msg else "assistant", "content": msg}
            for msg in messages['history']
        ]

        long_chat = ""
        for msg in messages["history"]: long_chat+=msg
        summ_state = {
            "messages": [HumanMessage(content=long_chat)]
        }
        result = await summarizer(summ_state)
        print(f'RESULT: {result}')
        result['history'] = formatted

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Failed to retrieve chat history: {str(e)}"}
        )

#######################################################################


@app.post("/chat/{session_id}")
async def chat(session_id: str, request: ChatRequest, sentiment_request: SentimentRequest):
    # Check if session exists
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    # Get session data
    session_data = sessions[session_id]
    user_message = request.message

    # Sentiment Analysis
    sentiment = sentiment_request.analyze_sentiment(user_message)

    if sentiment == "Positive":
        # Simulate chatbot response (integrate FastAI model here)
        # For now, echo the message and store it in history
        response = f"Bot response to: {user_message}"  # Replace with FastAI model inference
        session_data["history"].append({"user": user_message, "bot": response})
    else:
        # If sentiment is negative, provide a different response
        response = "It seems like you're feeling down. How can I assist you better?"
        # Involve the call agent code here

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




