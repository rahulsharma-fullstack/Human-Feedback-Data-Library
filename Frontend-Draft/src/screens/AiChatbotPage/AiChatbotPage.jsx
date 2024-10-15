import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const AiChatbotPage = () => {
  return (
    <div className="AI-chatbot-page">
      <div className="div-6">
        <div className="overlap-9">
          <div className="group-13">
            <div className="overlap-group-6">
              <div className="rectangle-6" />
              <div className="text-wrapper-48">Search</div>
            </div>
          </div>
          <div className="text-wrapper-49">Advanced Search</div>
        </div>
        <img className="logo-4" alt="Logo" src="/img/logo.png" />
        <div className="group-14">
          <div className="overlap-10">
            <div className="rectangle-7" />
            <div className="text-wrapper-50">Enter Message</div>
          </div>
        </div>
        <div className="overlap-11">
          <div className="group-15" />
          <p className="text-wrapper-51">
            Hi, I’m looking for a dataset that specializes in training harmlessness in an AI chat bot. Do you have any
            Recommendations?
          </p>
        </div>
        <div className="group-16">
          <div className="is-pulvinar-augue-wrapper">
            <p className="is-pulvinar-augue">
              {" "}
              is pulvinar augue felis, in iaculis sem dapibus ultrices. Duis elementum libero sit amet felis gravida
              facilisis.
            </p>
          </div>
        </div>
        <div className="overlap-12">
          <div className="group-17" />
          <div className="flexcontainer">
            <p className="text">
              <span className="span">
                Sure! Here are a few:
                <br />
              </span>
            </p>
            <p className="text">
              <span className="text-wrapper-52">
                Dataset_Link1, Dataset_Link2, DatasetLink3
                <br />
              </span>
            </p>
            <p className="text">
              <span className="text-wrapper-53">AI Description of Datasets: </span>
              <span className="text-wrapper-54">
                is pulvinar augue felis, in iaculis sem dapibus ultrices. Duis elementum libero sit amet felis gravida
                facilisis. Vivamus quis sem vel velit aliquet varius sed eu sem. Proin mattis ipsum quis tortor
                elementum rhoncus. Mauris eget interdum diam. Ut ullamcorper vehicula arcu nec pulvinar. In hac
                habitasse
              </span>
            </p>
          </div>
        </div>
        <div className="navbar-4">
          <Link className="text-wrapper-55" to="/ai-chatbot-page">
            Chatbot
          </Link>
          <Link className="text-wrapper-56" to="/search-page">
            Datasets
          </Link>
          <Link className="text-wrapper-57" to="/landing-page">
            Home
          </Link>
          <Link className="text-wrapper-58" to="/about-page">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};
