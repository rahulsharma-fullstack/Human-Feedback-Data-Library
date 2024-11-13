import React from 'react';
import './style.css';
import '../../../styleguide.css';

const GoogleFormPage = () => {
  return (
    <div className="google-form-page container">
      {/* Page Heading */}
      <div className="group-2 header-instance">
        <h1 className="text-wrapper-25">Feedback Form</h1>
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


