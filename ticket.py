from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Message(BaseModel): # Represents a message in a ticket chat-history
    id: int
    sender: str
    content: str
    timestamp: str

class Article(BaseModel): # Represents an article related to a ticket
    title: str
    description: str

class TicketCreate(BaseModel):
    user_id: str
    username: str
    company_name: str
    title: str
    description: str

class TicketUpdate(BaseModel):
    ticket_id: str
    status: Optional[str]
    lastUpdate: Optional[str]
    messages: Optional[List[Message]]
    suggestedResponses: Optional[List[str]]
    relatedArticles: Optional[List[Article]]
