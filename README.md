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

    To save backend change: 
        in backend folder 
        docker build -t backend-iamge . # create image
        docker ps # find the already running image should be called backend image
        docker stop "container_id"
        docker rm "container_id" 
        docker run -d --network host backend-image
    To save frontend change:
        in frontend folder
        docker build -t frontend-image .
        docker ps # find the already running image should be called frontend image
        docker stop "container_id"
        docker rm "container_id" 
        docker run -d --network host frontend-image

    
