import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="div-5">
        <div className="overlap-5">
          <img className="path-2" alt="Path" src="/img/path-1.svg" />
          <img className="logo-3" alt="Logo" src="/img/logo-1.png" />
          <div className="group-8">
            <div className="overlap-group-4">
              <div className="rectangle-4" />
              <div className="Search-text">Search</div>
            </div>
          </div>
          <div className="OpenFeedbackVault">OpenFeedbackVault</div>
          <p className="text-wrapper-35">A Human-Centric AI Feedback Library.</p>
          <Link className="AdvancedSearchLink" to="/search-page">
            <div className="text-wrapper-36">Advanced Search</div>
          </Link>
          <Link className="overlap-wrapper" to="/about-page">
            <div className="overlap-6">
              <div className="text-wrapper-37">About Us</div>
            </div>
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
              About
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
