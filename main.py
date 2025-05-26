from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pymongo import MongoClient
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from uuid import uuid4
from pydantic import BaseModel
import random
from auth import (
    User, Token, CompanyUser, AgentUser, LoginRequest,
    get_password_hash, verify_password,
    create_access_token, SECRET_KEY, ALGORITHM
)
from ticket import (
    TicketCreate, TicketUpdate,
    Message, Article
)



# Chat request model
class ChatRequest(BaseModel):
    message: str
sessions = {} # In-memory session store


#----MongoDB global handles--+
client = None                #
db = None                    #  
collection = None            #
ticket_collection = None     # Collection for ticket management
customer_collection = None   # Collection for customer details
agent_collection = None      # Collection for agent details
company_collection = None    # Collection for company details
#----------------------------+

# OAuth2, tells where to find the token in the request
# This token is the JWT token, which is generated after login, which is then used to access protected routes for the customer/user
oauth2_scheme_customer = OAuth2PasswordBearer(tokenUrl="customer_login")
oauth2_scheme_company = OAuth2PasswordBearer(tokenUrl="company_login")
oauth2_scheme_agent = OAuth2PasswordBearer(tokenUrl="agent_login")




# Lifespan to initialize DB, runs only once for the first time -------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db, collection, ticket_collection, customer_collection, agent_collection,company_collection

    dbpass = 'sN5lE6aT8jyLQmpy' # later replace with environment variable  

    client = MongoClient("mongodb://localhost:27017") # Local MongoDB URI
    # print("[INIT] Connecting to MongoDB...")
    # try:
    #     client = MongoClient(f"mongodb+srv://jineshpagariaA:{dbpass}@flipr-sub.wn6wezr.mongodb.net/?retryWrites=true&w=majority&appName=flipr-sub")  # MongoDB Atlas URI
    #     print("[INIT] MongoDB connected successfully")
    # except Exception as e:
    #     print(f"[ERROR] Failed to connect to MongoDB: {e}")
    #     raise HTTPException(status_code=500, detail="Database connection failed")

    db = client["promethia_ai"] # Database name
    collection = ["customer_details", "company_details", "agent_details", "ticket_logs"]  # list of Collections
    for coll in collection:
        if coll not in db.list_collection_names():
            print(f"[INIT] Creating collection: {coll}")
            db.create_collection(coll)

    collection = [db[coll] for coll in collection]  # Convert to collection handles
    print("[INIT] MongoDB connected and ready")
    customer_collection = collection[0]  # Customer details collection
    company_collection = collection[1]    # Company details collection
    agent_collection = collection[2]      # Agent details collection
    ticket_collection = collection[3]     # Ticket logs collection
    yield
    client.close()

#----------------------------------------------------------------------------


app = FastAPI(lifespan=lifespan)
@app.get("/")
def root():
    return {"message": "Server is up and running!"}





#--------------------------------------Customer Authentication--------------------------------------

@app.post("/customer_register") # Register customer
def register_user(user: User):
    if collection[0].find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already registered")

    if len(user.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

    hashed_password = get_password_hash(user.password)
    uid = "UID"+str(uuid4())  # Generate a unique user ID
    user_doc = {
        "user_id": uid,  # Generate a unique user ID
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "date_of_joining": datetime.now(timezone.utc)
    }
    collection[0].insert_one(user_doc)
    print('REGISTERED SUCCESFULLY')
    return {"message": "User registered successfully", "userId": uid,"code": "SUCCESS"}

@app.post("/customer_login", response_model=Token)  # Login customer
def verify_login(data: LoginRequest):
    user = collection[0].find_one({"username": data.username})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_access_token(data={"sub": user["username"]})
    print(f'LOGIN SUCCESSFUL, created JWT token for {user["username"]}, user_id: {user["user_id"]}')
    return {"access_token": token, "token_type": "customer"}

# Auth helper ##########################################################################
def get_current_user(token: str = Depends(oauth2_scheme_customer)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = collection[0].find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Protected Profile route
@app.get("/customer_profile")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return {
        "message": "User details retrieved",
        "code": "SUCCESS",
        "user_id": current_user["user_id"],
        "username": current_user["username"],
        "email": current_user["email"],
        "date_of_joining": current_user["date_of_joining"]
    }
#########################################################################################

#-----------------------------Customer Authentication Ends--------------------------------------

#-------------------------------------Company Authentication--------------------------------------
@app.post("/company_register")
def register_company(company: CompanyUser):
    if collection[1].find_one({"username": company.username}):
        raise HTTPException(status_code=400, detail="Username already registered")

    if len(company.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

    hashed_password = get_password_hash(company.password)
    cid = "CID" + str(uuid4())
    company_doc = {
        "company_id": cid,
        "company_name": company.company_name,
        "username": company.username,
        "email": company.email,
        "password": hashed_password,
        "date_of_registration": datetime.now(timezone.utc)
    }
    collection[1].insert_one(company_doc)
    print('COMPANY REGISTERED SUCCESSFULLY')
    return {"message": "Company registered successfully", "companyId": cid, "code": "SUCCESS"}

@app.post("/company_login", response_model=Token)
def verify_company_login(data: LoginRequest):
    company = collection[1].find_one({"username": data.username})
    
    if not company or not verify_password(data.password, company["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    token = create_access_token(data={"sub": company["username"], "token_type": "company"})
    print(f'COMPANY LOGIN SUCCESSFUL, created JWT token for {company["username"]}, company_id: {company["company_id"]}')
    
    return {"access_token": token, "token_type": "company"}

def get_current_company(token: str = Depends(oauth2_scheme_company)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    company = collection[1].find_one({"username": username})
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    return company


@app.get("/company_profile")
def read_company_profile(current_company: dict = Depends(get_current_company)):
    return {
        "message": "Company profile retrieved",
        "code": "SUCCESS",
        "company_id": current_company["company_id"],
        "company_name": current_company["company_name"],
        "username": current_company["username"],
        "email": current_company["email"],
        "date_of_registration": current_company["date_of_registration"]
    }
#-------------------------------------Company Authentication Ends--------------------------------------

#--------------------------------------Agent Authentication--------------------------------------

@app.post("/register_agent")
def register_agent(agent: AgentUser, current_company: dict = Depends(get_current_company)):
    if collection[2].find_one({"username": agent.username}):
        raise HTTPException(status_code=400, detail="Agent username already registered")

    if len(agent.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

    if agent.company_id != current_company["company_id"]:
        raise HTTPException(status_code=403, detail="You are not authorized to register agents for other companies")

    hashed_password = get_password_hash(agent.password)
    aid = "AID" + str(uuid4())

    agent_doc = {
        "agent_id": aid,
        "company_id": agent.company_id,
        "username": agent.username,
        "email": agent.email,
        "password": hashed_password,
        "tickets_resolved": 0,
        "date_of_joining": datetime.now(timezone.utc)
    }

    collection[2].insert_one(agent_doc)
    print(f"AGENT REGISTERED SUCCESSFULLY under company {agent.company_id}")
    return {"message": "Agent registered successfully", "agentId": aid, "code": "SUCCESS"}

@app.post("/agent_login", response_model=Token)
def verify_agent_login(data: LoginRequest):
    agent = collection[2].find_one({"username": data.username})
    
    if not agent or not verify_password(data.password, agent["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_access_token(data={"sub": agent["username"], "token_type": "agent"})
    print(f"AGENT LOGIN SUCCESSFUL, created JWT token for {agent['username']}, agent_id: {agent['agent_id']}")
    
    return {"access_token": token, "token_type": "agent"}


def get_current_agent(token: str = Depends(oauth2_scheme_agent)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    agent = collection[2].find_one({"username": username})
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    return agent

@app.get("/agent_profile")
def read_agent_profile(current_agent: dict = Depends(get_current_agent)):
    return {
        "agent_id": current_agent["agent_id"],
        "company_id": current_agent["company_id"],
        "username": current_agent["username"],
        "tickets_resolved": current_agent["tickets_resolved"]
    }
#--------------------------------------Agent Authentication Ends--------------------------------------



#--------------------------------------Ticket Management--------------------------------------

@app.post("/generate_ticket")
def generate_ticket(data: TicketCreate):
    ticket_id = "TKT" +str(uuid4())  # Generate a unique ticket ID
    ticket_doc = {
        "ticket_id": ticket_id,
        "userId": data.user_id,
        "username": data.username,
        "companyName": data.company_name,
        "title": data.title,
        "description": data.description,
        "status": "In Progress",
        "date": datetime.utcnow().strftime("%B %d, %Y"),
        "lastUpdate": "Just now",
        "messages": [],
        "aiHandled": False,
        "suggestedResponses": [],
        "relatedArticles": []
    }
    ticket_collection.insert_one(ticket_doc)
    print(f'TICKET CREATED: {ticket_id} for user {data.username}')
    return {"message": "Ticket created", "ticket_id": ticket_id}

@app.post("/update_ticket")
def update_ticket(data: TicketUpdate):
    existing = ticket_collection.find_one({"ticket_id": data.ticket_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Ticket not found")

    update_fields = {}

    if data.status:
        update_fields["status"] = data.status
    update_fields["lastUpdate"] = datetime.utcnow().strftime("%B %d, %Y %H:%M:%S")

    if data.suggestedResponses:
        update_fields["suggestedResponses"] = data.suggestedResponses

    if data.relatedArticles:
        # Convert each Article Pydantic model to a dict
        update_fields["relatedArticles"] = [article.dict() for article in data.relatedArticles]

    if update_fields:
        ticket_collection.update_one(
            {"ticket_id": data.ticket_id},
            {"$set": update_fields}
        )

    if data.messages:
        ticket_collection.update_one(
            {"ticket_id": data.ticket_id},
            {"$push": {"messages": {"$each": [msg.dict() for msg in data.messages]}}}
        )

    return {"message": "Ticket updated", "ticket_id": data.ticket_id}

#--------------------------------------Ticket Management Ends--------------------------------------





































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