import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import "./style.css";

export const LandingPage = () => {
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
    <div className="landing-page">

      <div className="div-5">
        <div className="overlap-5">
          <img className="path-2" alt="Path" src="/img/path-1.svg" />
          <img className="logo-3" alt="Logo" src="/img/logo-1.png" />

          <div className="group-8">
            <Form.Control
              className="overlap-group-4"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update the search query
              onKeyDown={handleKeyPress} // Listen for the Enter key
            />
            <Link className="AdvancedSearchLink" to="/search-page">
              <div className="text-wrapper-36">Advanced Search</div>
            </Link>
          </div>
          <div className="OpenFeedbackVault">OpenFeedbackVault</div>
          <p className="text-wrapper-35">A Human-Centric AI Feedback Library.</p>


          <nav className="navbar navbar-expand-md navbar-3">
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
        <div className="boxes">
          <Card className="box">
            <Card.Body>
              <Card.Title className="text-wrapper-42">Explore Human Feedback Datasets</Card.Title>
              <Card.Text className="text-wrapper-43">
                Explore and Filter through 100+ Human-Generated Datasets. Filter by size, rating, topics, and more.
              </Card.Text>
            </Card.Body>
          </Card>


          <Card className="box">
            <Card.Body>
              <Card.Title className="text-wrapper-42">Share Your Insights on Human Feedback Datasets</Card.Title>
              <Card.Text className="text-wrapper-43">
                Participate in discussions on human feedback datasets and help others gauge quality by rating datasets
                based on accuracy, completeness, and relevance.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="box">
            <Card.Body>
              <Card.Title className="text-wrapper-42">AI-Powered Dataset Search</Card.Title>
              <Card.Text className="text-wrapper-43">
                Leverage our AI to efficiently identify and explore datasets that align with your specific requirements.
              </Card.Text>
            </Card.Body>
          </Card>


        </div>
      </div>
    </div>
  );
};
