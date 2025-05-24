from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/status")
def get_status():
    return {"message": "Server is alive"}

class ChatInput(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatInput):
    return {"response": f"You said: {req.message}"}
