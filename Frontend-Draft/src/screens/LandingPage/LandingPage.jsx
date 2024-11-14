import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
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
          {/* <div className="group-8">
            <div className="overlap-group-4">
              <div className="rectangle-4" />
              <div className="Search-text">Search</div>
            </div>
          </div> */}
          <div className="group-8">
            <Form.Control
              className="overlap-group-4"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update the search query
              onKeyDown={handleKeyPress} // Listen for the Enter key
            />
          </div>
          <div className="OpenFeedbackVault">OpenFeedbackVault</div>
          <p className="text-wrapper-35">A Human-Centric AI Feedback Library.</p>
          <Link className="AdvancedSearchLink" to="/search-page">
            <div className="text-wrapper-36">Advanced Search</div>
          </Link>

          <div className="navbar-3">
            <Link className="text-wrapper-38" to="/ai-chatbot-page">
              Chatbot
            </Link>
            <Link className="text-wrapper-39" to="/search-page">
              Datasets
            </Link>
            <div className="text-wrapper-40">Home</div>
            <Link className="text-wrapper-41" to="/about-page">
              About Us
            </Link>
            <Link className="userguide-page-link" to="/userguide-page">
              User Guide & Help
            </Link>
          </div>
        </div>
        <div className="group-9">
          <div className="group-10">
            <div className="overlap-group-5">
              <div className="text-wrapper-42">Explore Human Feedback Datasets</div>
              <p className="text-wrapper-43">
                Explore and Filter through 100+ Human-Generated Datasets. Filter by size, rating, topics, and more.
              </p>
            </div>
          </div>
          <div className="group-11">
            <div className="overlap-7">
              <div className="rectangle-5" />
              <p className="text-wrapper-44">Share Your Insights on Human Feedback Datasets</p>
              <p className="text-wrapper-45">
                Participate in discussions on human feedback datasets and help others gauge quality by rating datasets
                based on accuracy, completeness, and relevance.
              </p>
            </div>
          </div>
          <div className="group-12">
            <div className="overlap-8">
              <div className="text-wrapper-46">AI-Powered Dataset Search</div>
              <p className="text-wrapper-47">
                Leverage our AI to efficiently identify and explore datasets that align with your specific requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
