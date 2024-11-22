# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Install required system packages
RUN apt-get update && apt-get install -y \
    gcc \
    make \
    g++ \
    python3-dev \
    && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY requirements.txt .

# Install any necessary dependencies
RUN pip install setuptools
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .

# Set environment variables (you can add more if needed)
ENV FLASK_APP=openai_chatbot.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose the port that Flask runs on
EXPOSE 7888

# Run the Flask application with Python
CMD ["python", "openai_chatbot.py"]
