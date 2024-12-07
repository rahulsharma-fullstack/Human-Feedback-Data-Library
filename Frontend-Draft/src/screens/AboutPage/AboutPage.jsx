import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import "./style.css";

export const AboutPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Navigate to the results page and pass the search query as state
      navigate("/search-page", { state: { searchQuery: query } });
    }
  };
  return (
    <div className="about-page">
      <div className="div-3">
        <div className="text-wrapper-5">What is OpenFeedbackVault?</div>
        <div className="overlap">
          <p className="p">
            At OpenFeedbackVault, we believe that the future of artificial intelligence and machine learning should be
            rooted in the rich tapestry of human experience. Our mission is to make human feedback datasets more
            accessible to engineers and developers, empowering them to create models that reflect diverse perspectives
            and better serve humanity.
          </p>
          <div className="text-wrapper-6">Our Goal</div>
        </div>
        <div className="overlap-group">
          <p className="text-wrapper-7">
            The Human Feedback Foundation’s Data Trust work stream is dedicated to harnessing the power of human
            feedback as a crucial component of the AI development process. As AI technology continues to reshape modern
            software, integrating public input into AI models has become vital for creating resilient and well-aligned
            systems. Our mission is to establish a comprehensive global database of human feedback, serving as an
            authoritative and democratic resource for AI developers worldwide.
          </p>
          <div className="text-wrapper-8">About the Foundation</div>
        </div>

        <div className="student-about">
          <h2>Our Team</h2>

          <div className="student-pictures">
            <Card className="student-card">
              <Card.Body>
                <Card.Title>Aleksandra <br /> Kalas</Card.Title>
                <Card.Img src="/img/aleksandra.png" alt="Aleksandra Image" className="student-image" />
                <Card.Subtitle>Frontend Engineer</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="student-card">
              <Card.Body>
                <Card.Title>Assad <br /> Usman</Card.Title>
                <Card.Img src="/img/assad.jpg" alt="Assad Image" className="student-image" />
                <Card.Subtitle>Fullstack Engineer</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="student-card">
              <Card.Body>
                <Card.Title>Humza <br /> Iqbal</Card.Title>
                <Card.Img src="/img/humza.png" alt="Humza Image" className="student-image" />
                <Card.Subtitle>Backend Engineer</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="student-card">
              <Card.Body>
                <Card.Title>Modaser <br /> Mojadiddi</Card.Title>
                <Card.Img src="/img/modaser.jpg" alt="Modaser Image" className="student-image" />
                <Card.Subtitle>Backend Engineer</Card.Subtitle>
              </Card.Body>
            </Card>

            <Card className="student-card">
              <Card.Body>
                <Card.Title>Aditya <br /> Kumar</Card.Title>
                <Card.Img src="/img/aditya.jpg" alt="Aditya Image" className="student-image" />
                <Card.Subtitle>Project Manager</Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
        </div>


        <div className="overlap-3">

          <Form.Control className="overlap-group-2" placeholder="Search" value={query}
            onChange={(e) => setQuery(e.target.value)} // Update the search query
            onKeyDown={handleKeyPress}></Form.Control>

          <Link className="text-wrapper-20" to="/search-page">Advanced Search</Link>
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
        <img className="logo" alt="Logo" src="/img/logo.png" />
      </div>
    </div >
  );
};
