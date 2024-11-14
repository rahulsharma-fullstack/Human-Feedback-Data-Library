import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../../styleguide.css';

const GoogleFormPage = () => {
  return (
    <div className="google-form-page container">
      {/* Page Heading */}
      <div className="group-2 header-instance">
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
            About Us
          </Link>
          <Link className="userguide-page-link" to="/userguide-page">
            User Guide & Help
          </Link>
          <Link className="google-form-link" to={"/google-form"}>
          Submit a Dataset
          </Link>
        </div>
        <img className="logo" alt="Logo" src="/img/logo.png" />
      </div>
      
      {/* Embedded Google Form */}
      <div className="form-container dropdown-box items-frame">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScp89LhjoM7v7ONLhZR_5NpbG6VGRPrDSuIEUHeKLdywWdilg/viewform?embedded=true"
          className="embedded-form"
          title="Google Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default GoogleFormPage;


