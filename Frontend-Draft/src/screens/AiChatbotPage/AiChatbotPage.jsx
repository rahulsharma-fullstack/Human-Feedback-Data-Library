import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from "react-icons/fa";
import "./style.css";
/** FEATURE/PAGE IS NOT IMPLEMENTED */


export const AiChatbotPage = () => {
  // Quicksearch functionality
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Chatbot functionality
  const [messages, setMessages] = useState([{
    sender: "OpenFeedbackVault",
    text: "Welcome to OpenFeedbackVault's chatbot! How can I help you today?"
  }]);
  const [input, setInput] = useState("");
  const [loadingResponse, setLoading] = useState(false); // Track loading state of AI response
  const chatWindowRef = useRef(null);

  // Quick search press enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Navigate to the results page and pass the search query as state
      navigate("/search-page", { state: { searchQuery: query } });
    }
  };

  // Scroll to the bottom of the chat window when messages update
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);


  // Handle send message
  const handleSend = () => {
    if (input.trim() === "") return;

    // Add the user's message
    const userMessage = { sender: "You", text: input };
    setMessages([...messages, userMessage]);
    setInput(""); // Clear the input field
    setLoading(true); // Start loading animation

    // Get bot response
    fetch('https://openfeedbackvault.utm.utoronto.ca/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage.text
      })
    })
      .then(response => response.json())
      .then(data => {
        const botResponse = {
          sender: "OpenFeedbackVault",
          text: data.reply,
        };

        setTimeout(() => {
          setMessages((prev) => [...prev, botResponse]);
          setLoading(false); // Stop loading animation
        }, 1000);
      })
      .catch(error => console.error('Error:', error));
  };

  // Key down for chatbot
  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSend();
  };

  // Chatbot styles
  const styles = {
    container: {
      height: "600px", // Fixed height for the entire chat container
      position: "relative",

      margin: "auto",
      border: "1px solid #ddd",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      fontFamily: "Roboto",
      fontSize: 25,
    },
    chatWindow: {
      flex: 1, // Ensures it fills the available space
      padding: "10px",
      display: "flex",
      flexDirection: "column", // Keep messages in a column
      overflowY: "scroll",
    },
    scrollContainer: {
      height: "200px",
      overflowY: "scroll",
      backgroundColor: "green"
    },
    sender: {
      fontFamily: "Roboto",
      fontSize: "10px",
      marginBottom: "5px",
    },
    message: {
      maxWidth: "100%",
      margin: "5px",
      padding: "10px",
      borderRadius: "10px",
      fontFamily: "Roboto",
      fontSize: "20px",
    },
    inputContainer: {
      display: "flex",
      padding: "10px",
      borderTop: "1px solid #ddd",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      marginRight: "10px",
      fontFamily: "Roboto",
      fontSize: "20px",
    },
    sendButton: {
      backgroundColor: "#23662a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px",
      cursor: "pointer",
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px",
    },
    dot: {
      width: "8px",
      height: "8px",
      margin: "0 5px",
      backgroundColor: "#888",
      borderRadius: "50%",
      animation: "loading 1.2s infinite",
    },
  };

  return (
    <div className="AI-chatbot-page">
      <div className="div-6">

        <div className="overlap-3">

          <Form.Control className="overlap-group-2" placeholder="Search" value={query}
            onChange={(e) => setQuery(e.target.value)} // Update the search query
            onKeyDown={handleKeyPress}></Form.Control>

          <Link className="text-wrapper-20" to="/search-page">Advanced Search</Link>
        </div>



        <img className="logo-4" alt="Logo" src="/img/logo.png" />

        <div style={styles.container} id="chatbotContainer" >
          <div style={{ flex: 1, overflow: "scroll" }} ref={chatWindowRef}>

            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: message.sender === "You" ? "flex-start" : "flex-end",
                  backgroundColor: message.sender === "You" ? "#cef2dc" : "#f1f1f1",
                }}
              >
                <div style={styles.sender}>{message.sender}</div>
                {message.text}
              </div>
            ))}

            {loadingResponse && (
              <div style={styles.loading}>
                <div style={styles.dot}></div>
                <div style={styles.dot}></div>
                <div style={styles.dot}></div>
              </div>
            )}

          </div>

          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.sendButton}>
              <FaPaperPlane />
            </button>
          </div>
        </div>


        <nav className="navbar navbar-expand-lg navbar-3">
          <div className="container-fluid">

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/search-page">
                    Datasets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-page">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userguide-page">
                    User Guide & Help
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/google-form">
                    Submit a Dataset
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};


