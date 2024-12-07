Backend Documentation

Create a Node.js project with 
    npm init -y

Install dependencies
    npm install express pg cors

To run the backend
    node server.js


Command to update docker image in server:
    First pull updates from git main:
        go to Human-Feedback-Data-Library folder in Feedback
        git branch to confirm you are in main
        git pull


To update deployment:
    docker compose up -d --build  (Run commands inside /home/feedback/Human-Feedback-Data-Library)

To takedown deployment:
    docker compose down (Run commands inside /home/feedback/Human-Feedback-Data-Library)


# Deploying to the domain https://openfeedbackvault.utm.utoronto.ca/ai-chatbot-page
This vm has an apache2 server running and we route the subpaths of the domain to different localhost deployment depending if we want to route to the frontend or backend or chatbot. This is done in /etc/apache2/sites-available/ in default-ssl.conf
`
        ProxyPass /api http://localhost:5000/api
        ProxyPassReverse /api http://localhost:5000/api
        ProxyPass /chat http://localhost:7888/chat
        ProxyPassReverse /chat http://localhost:7888/chat
        ProxyPass / http://localhost:8080/
        ProxyPassReverse / http://localhost:8080/
`
# Backend 
The backend is a JavaScript server with the server.js file importing the routes from the routes/datasets.js file, doing some validation so that requests are only coming from the domain and running the server on port 5000. Lastly it contains a dockerfile that the docker-compose in the main folder picks up when the command is run and starts a docker container on that port
# Chatbot
The chatbot was the part we were not able to fully implement. The progress we made was mainly implementing the structure for it. 

The chatbot implements rag by calling the database, getting all metadata of the datasets and embedding it using a python Library to a json file. This approach is fine given the number of datasets we have in the database and should be fine much more. This is all in the emvedding_json script. 

the openai_chatbot code runs a Flask server, it first authenticates requests by checking the secret of the request against what it should be. The secrets are in the DockerFiles of the backend and chatbot folders and should never be commited to GitHub. Doesn't matter what they are as long as they match. If the request is valid it calls a method that embedds the prompt and compares it using cosine similarity with the embeddings in the json file and returns a string containing the metada of the closest match. This method could use work, the comparison method could be improved or a whole different method or considering only returning if the match percentage is higher than certain percentage. Lastly it calls OPENAI passing the rag result as context and finally returns back the result of the prompt to the backend. 

If the GPUs are found to power it I would suggest implementing some open source model like Llama from HuggingFace with Python's transformers and using something like SocketIO to make a client server connection between wherever the GPUs are and the feedback VM. 

# Frontend
 
    
