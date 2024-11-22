import requests
from sentence_transformers import SentenceTransformer
import json

# Initialize the embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# URL of the dataset
url = "http://localhost:5000/api/datasets"

try:
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Raise an exception if the request was unsuccessful
    response.raise_for_status()
    
    # Parse the JSON response (if JSON format)
    dataset = response.json()
    print(dataset)
    for entry in dataset:
        # Combine fields into a single text for embedding
        text_to_embed = (
                            f"{entry['description']} Tags: {', '.join(entry['tags'])} "
                            f"Link: {entry['link']} Data Type: {entry['data_type']} "
                            f"Language: {entry['language']}"
                            f"Name: {entry['name']}"
                        )
        
        # Generate embedding
        embedding = model.encode(text_to_embed).tolist()  # Convert to list for JSON compatibility
        
        # Add the embedding to the entry
        entry['embedding'] = embedding
    with open('embedded_dataset.json', 'w') as f:
        json.dump(dataset, f, indent=4)

    print("Embeddings saved to embedded_dataset.json")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
