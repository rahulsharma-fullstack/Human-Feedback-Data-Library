import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const UserGuidePage = () => {
  return (
    <div className="userguide-page">
        
      <div className="header-group">
      <img className="background-image" alt="Path" src="/img/path-1.svg" />
        <div className="overlap-3">
          <div className="overlap-group-wrapper">
            <div className="overlap-group-2">
              <div className="rectangle-2" />
              <div className="text-wrapper-19">Search</div>
            </div>
          </div>
          <Link className="advanced-search-link" to="/search-page">Advanced Search</Link>
        </div>
        <div className="navbar">
          <Link className="text-wrapper-21" to="/ai-chatbot-page">
            Chatbot
          </Link>
          <Link className="text-wrapper-22" to="/search-page">
            Datasets
          </Link>
          <Link className="text-wrapper-23" to="/landing-page">
            Home
          </Link>
          <Link className="text-wrapper-24" to="/about-page">
            About
          </Link>
          <Link className="userguide-page-link" to="/userguide-page">
            User Guide & Help
            </Link>
        </div>
        <img className="logo" alt="Logo" src="/img/logo.png" />
      </div>
    </div>
  );
};
