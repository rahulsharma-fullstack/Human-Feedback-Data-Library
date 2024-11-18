import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import "./style.css";

export const UserGuidePage = () => {
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
    <div className="user-guide-page">
      <div className="div-3">
        <div className="text-wrapper-5">OpenFeedbackVault User Guide</div>
        <div className="overlap">
          <p className="p">
          Welcome to OpenFeedbackVault. If you’re having some trouble navigating or 
          understanding how to use the platform, you’ve reached the right page. To
            understand how to use our search filters, explore the tags below:
            <ul className="filters-list" style={{ listStyle: "disc", paddingLeft: "20px" }}>
                                 <li>
                                     Date:
                                     <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                         <li> The date filter lets you select the oldest date you want to see
                                             datasets for. </li>
                                         <li> For example: if you only want to see datasets that were made after
                                             February 14th 2023, this is the date you would enter into the date
                                             selector. You won't see any earlier made datasets. </li>
                                     </ul>
                                 </li>
                                 <li>Keywords:
                                     <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                         <li>The keywords filter lets you select specific keywords you want
                                             to search for. This search looks for all of the keywords you select.</li>
                                         <li>For example: if you want to look for datasets that have both RHLF and
                                             Science as a keyword, you would select these two. </li>
                                     </ul>
                                 </li>
                                 <li>Languages:
                                     <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                         <li> The languages filter lets you select the language of the dataset
                                             you wish to find. All the datasets listed will be in the language you select,
                                             the default will be English </li>
                                     </ul>
                                 </li>
                                 <li>Data Length:
                                     <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                         <li>The data length slider is a filter for how long you want the
                                             dataset to be in terms of the number of rows. This filter allows you to select
                                             a minimum amount of rows and a maximum amount of rows indicated by the
                                             two dots on the slider.</li>
                                     </ul>
                                 </li>
                             </ul>
          </p>
          <div className="text-wrapper-6">How to Use OpenFeedbackVault:</div>
        </div>
        <div className="overlap-group">
          <p className="text-wrapper-7">
          <p className="search-results-list">
                                 The following describes the columns shown for the search results
                                 <br />
                                 <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                                     <li>Title:
                                         <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                             <li>The title shown provides a quick glimpse at what the
                                                 dataset may be about.
                                             </li>
                                         </ul>
                                     </li>
                                     <li> Type:
                                         <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                             <li>The type listed for the dataset shows the format of
                                                 the data you may find inside. Below are explanations
                                                 of the types you may find.
                                                 <ul style={{ listStyle: "disc", paddingLeft: "60px" }}>
                                                     <li>Accepted/Rejected response: dataset consists
                                                         of rows of data in which there will be a response
                                                         to a prompt. There will be a response that was
                                                         accepted, and a response that was rejected.
                                                     </li>
                                                     <li>Scored: dataset consists of rows of data in which the 
                                                         response given by the model will be ranked or given a 
                                                         score.
                                                     </li>
                                                     <li>Classification</li>
                                                     <li>Prompt and response: dataset consists of rows of data
                                                         in which there will be a prompt given to the model, and 
                                                         the corresponding response given by the model.
                                                     </li>
                                                 </ul>
                                             </li>
                                         </ul>
                                     </li>
                                     <li>Number of Rows:
                                         <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                             <li>The number of rows shows how many rows of data are
                                                 within the dataset itself. </li>
                                         </ul>
                                     </li>
                                     <li>Selecting a result:
                                         <ul style={{ listStyle: "disc", paddingLeft: "40px" }}>
                                             <li>When selecting a result from the search a popup will appear. Within
                                                 this popup the following information will be displayed: dataset
                                                 description, keywords the dataset falls under, the size of the dataset.
                                                 It will also show a button that says "Go to Dataset Website". By
                                                 clicking this button you will be taken directly to the dataset where
                                                 you will be able to download the dataset and retrieve additional
                                                 information.</li>
                                         </ul>
                                     </li>
                                 </ul>
                                 <br /><br />
                             </p>
          </p>
          <div className="text-wrapper-8">Looking Through Search Results</div>
        </div>
        
        <div className="overlap-3">
          <div className="overlap-group-wrapper">
            <Form.Control className="overlap-group-2" placeholder="Search" value={query}
              onChange={(e) => setQuery(e.target.value)} // Update the search query
              onKeyDown={handleKeyPress}></Form.Control>
          </div>
          <Link className="text-wrapper-20" to="/search-page">Advanced Search</Link>
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
    </div>
  );
};
