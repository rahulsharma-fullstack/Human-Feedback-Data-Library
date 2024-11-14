import React from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "./style.css";

export const UserGuidePage = () => {
    return (
        <div className="userguide-page">

            <div className="group2">

                <div className="header-group">

                    <img className="background-image" alt="Path" src="/img/path-1.svg" />
                    <div className="overlap-3">

                        <div className="overlap-group-wrapper">
                            {/* <div className="overlap-group-2">
                                <div className="rectangle-2" />
                                <div className="searchbar-text">Search</div>
                            </div> */}
                            <Form.Control className="overlap-group-2" placeholder="Search"></Form.Control>
                        </div>
                        <Link className="advanced-search-link" to="/search-page">Advanced Search</Link>
                    </div>

                    <div className="userguide">
                        <h1 className="heading">OpenFeedbackVault User Guide</h1>
                        <section className="guide-text">
                            <h2 className="how-to-heading">How to Use OpenFeedbackVault:</h2>
                            <p className="paragraph-1">
                                Welcome to OpenFeedbackVault. If you’re having some trouble navigating or
                                understanding how to use the platform, you’ve reached the right page. To
                                understand how to use our search filters, explore the tags below:<br /><br />
                            </p>
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
                            <br />
                            <h2 className="search-header">
                                Search Results:
                                <br /><br />
                            </h2>
                            <p className="search-results-list">
                                The following describes the columns shown for the search results
                                <br /><br />
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
                                                    <li>Scored</li>
                                                    <li>Classification</li>
                                                    <li>Prompt and response</li>
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
                        </section>
                    </div>

                    <div className="navbar">
                        <Link className="aichatbot-link" to="/ai-chatbot-page">
                            Chatbot
                        </Link>
                        <Link className="searchpage-link" to="/search-page">
                            Datasets
                        </Link>
                        <Link className="landingpage-link" to="/landing-page">
                            Home
                        </Link>
                        <Link className="aboutpage-link" to="/about-page">
                            About Us
                        </Link>
                        <Link className="userguide-page-link" to="/userguide-page">
                            User Guide & Help
                        </Link>

                    </div>

                    <img className="logo" alt="Logo" src="/img/logo.png" />

                </div>


            </div>

        </div>


    );
};
