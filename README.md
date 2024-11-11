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

    
