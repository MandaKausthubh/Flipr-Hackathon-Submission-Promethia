import chromadb
from chromadb.config import Settings

#############################################################################3
# TESTING ONLY
#############################################################################


# Initialize Chroma client with persistent storage
client = chromadb.PersistentClient(path="/home/jinesh14/chroma_data")

# Use get_or_create_collection to avoid duplicate errors
collection = client.get_or_create_collection(name="my_collection")

# Sample data: documents, metadata, and IDs
documents = [
    "The sun sets slowly behind the mountain.",
    "A bright moon illuminates the night sky.",
    "Stars twinkle in the clear evening sky."
]
metadatas = [
    {"category": "sunset"},
    {"category": "moonlight"},
    {"category": "stars"}
]
ids = ["doc1", "doc2", "doc3"]

# Add documents to the collection
collection.add(
    documents=documents,
    metadatas=metadatas,
    ids=ids
)

# Query the collection
results = collection.query(
    query_texts=["How does the sky look at night?"],
    n_results=2
)

# Print the results
print("Query Results:")
for i, result in enumerate(results['documents'][0]):
    print(f"Result {i+1}: {result} (ID: {results['ids'][0][i]}, Distance: {results['distances'][0][i]})")