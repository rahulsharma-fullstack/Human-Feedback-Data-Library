from transformers import pipeline
from sklearn.metrics.pairwise import cosine_similarity
import json
from sentence_transformers import SentenceTransformer
import numpy as np
import logging
from flask import Flask, request, jsonify, abort 
from openai import OpenAI
import json
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY")
client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY"),  # This is the default and can be omitted
)
# Set up logging configuration
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
 
app = Flask(__name__)
 
 # Load your JSON file containing dataset information
logging.info("Loading embedded dataset from JSON file.")
with open('embedded_dataset.json', 'r') as f:
    embedded_data = json.load(f)
logging.info(f"Loaded {len(embedded_data)} entries from the dataset.")

# encoding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to retrieve the most relevant info
def retrieve_info(user_input, embedded_data, top_k=1):
    logging.info("Generating embedding for the user input.")
    user_embedding = model.encode(user_input)
    
    similarities = []
    logging.info("Calculating cosine similarities.")
    for idx, item in enumerate(embedded_data):
        item_embedding = np.array(item['embedding'])
        similarity = cosine_similarity([user_embedding], [item_embedding])[0][0]
        similarities.append(similarity)
    
    # Find top_k most similar items
    top_indices = np.argsort(similarities)[-top_k:]
    
    logging.info(f"Top {top_k} similar entries found with indices: {top_indices}.")
    
    # Gather retrieved information with name, link, tags, and description
    retrieved_info = []
    for i in top_indices:
        item = embedded_data[i]
        retrieved_info.append({
            # "name": item.get("name", "N/A"),
            "link": item.get("link", "N/A"),
            "tags": item.get("tags", []),
            "description": item.get("description", "N/A")
        })
    
    logging.info(f"Retrieved information: {retrieved_info}")
    return retrieved_info

def check_api_key():
    api_key = request.headers.get('X-API-KEY')
    if api_key != API_KEY:
        abort(403, description="Forbidden: Invalid API Key")
# Endpoint for chatbot
@app.route('/chat', methods=['POST'])
def chat():
    check_api_key()
    data = request.json
    user_input = data.get('question')  # Expecting a single string as "question"

    if not user_input or not isinstance(user_input, str):
        return jsonify({"error": "Invalid input format. 'question' should be a non-empty string."}), 400

    # Perform RAG search
    retrieved_info = retrieve_info(user_input, embedded_data)

    # Construct messages for OpenAI API
    messages = [
    {
        "role": "system",
        "content": (
            "You are an AI assistant. The server has provided some additional context. "
            "Focus only on answering the client's question directly and concisely based on the context or your own knowledge. "
            "Avoid including disclaimers or information that is not directly related to the user's input. "
            f"Here is the additional context: {retrieved_info}"
        )
    },
    {"role": "user", "content": user_input},
    ]

    # Send messages to OpenAI
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        temperature=0.7,
        max_tokens=200,
    )

    # Extract the response text
    reply_text = response.choices[0].message.content

    # Return as JSON response
    return jsonify({"reply": reply_text})


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=7888)