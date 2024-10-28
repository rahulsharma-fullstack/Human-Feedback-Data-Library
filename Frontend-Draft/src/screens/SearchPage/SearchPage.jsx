import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { DropdownBox } from "../../components/DropdownBox";
import { InputDatePicker } from "../../components/InputDatePicker";
import { SliderField } from "../../components/SliderField";
import Slider from '@mui/material/Slider';
import { Frame } from "../../components/Frame";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./style.css";


export const SearchPage = () => {
  // State to store datasets
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [languages, setLanguages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);
  const dateRef = useRef(null);
  const langref = useRef(null);

  const num_per_page = 21
  // Fetch datasets from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:8082/api/datasets') // Update the URL if necessary
      .then(response => response.json())
      .then(data => {

        //split data into pages, fill languages, and set min and max rows
        let min = Infinity
        let max = -Infinity;
        let count = 0
        let page_arr = []
        let temp_arr = []
        const lang_set = new Set();
        const key_set = new Set();
        while (count < data.length) {
          data[count].tags.forEach(element => {
            key_set.add(element.toLowerCase());
          });
          if (data[count].number_of_rows == 0) {
            data[count].number_of_rows = null;
          }
          else if (data[count].number_of_rows > max) {
            max = data[count].number_of_rows;
          }
          else if (data[count].number_of_rows < min) {
            min = data[count].number_of_rows;
          }
          if (data[count].data_type == "NaN") {
            data[count].data_type = "";
          }
          page_arr.push(data[count]);

          lang_set.add(data[count].language)
          console.log(data[count].language)

          if (page_arr.length == num_per_page) {

            temp_arr.push(page_arr);
            page_arr = [];
          }
          count += 1;

        }
        if (page_arr.length != 0) {
          temp_arr.push(page_arr);

        }
        setPages(temp_arr);
        setLanguages(Array.from(lang_set));
        setKeywords(Array.from(key_set));
        setMax(max);
        setMin(min);
        console.log(temp_arr);
        console.log(lang_set);
        console.log(max);
        console.log(min);


        console.log(key_set);
      })
      .catch(error => {
        console.error('Error fetching datasets:', error);

      });

  }, []);

  const searchFunction = () => {
    setCurrentPage(0);
    let min = minInputRef.current ? minInputRef.current.value : null;
    let max = maxInputRef.current ? maxInputRef.current.value : null;

    let date = dateRef.current ? dateRef.current.value : null;
    let lang = langref.current ? langref.current.value : null;


    const searchParams = {
      endDate: date, // Format: DD/MM/YYYY
      minRows: min,
      maxRows: max,
      language: lang
    };
    fetch('http://localhost:8082/api/datasets/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchParams)
    }).then(response => response.json())
      .then(data => {
        //split data into pages, fill languages, and set min and max rows
        let min = Infinity
        let max = -Infinity;
        let count = 0
        let page_arr = []
        let temp_arr = []

        while (count < data.length) {

          if (data[count].number_of_rows == 0) {
            data[count].number_of_rows = null;
          }
          else if (data[count].number_of_rows > max) {
            max = data[count].number_of_rows;
          }
          else if (data[count].number_of_rows < min) {
            min = data[count].number_of_rows;
          }
          if (data[count].data_type == "NaN") {
            data[count].data_type = "";
          }
          page_arr.push(data[count]);


          if (page_arr.length == num_per_page) {

            temp_arr.push(page_arr);
            page_arr = [];
          }
          count += 1;

        }
        if (page_arr.length != 0) {
          temp_arr.push(page_arr);

        }
        setPages(temp_arr);

        setMax(max);
        setMin(min);
      })

  }
  return (
    <div className="search-page">
      <div className="div-4">
        <div className="overlap-4">
          <img className="path" alt="Path" src="/img/path.svg" />
          <div className="element">
            <div className="div2">
              <Frame
                className="frame-34"
                divClassName="frame-instance"
                divClassName1="frame-instance"
                divClassName2="frame-instance"
                divClassName3="frame-instance"
                divClassName4="design-component-instance-node"
                divClassName5="frame-instance"
                divClassNameOverride="frame-instance"
                frameClassName="frame-34-instance"
                text="Dataset Name"
                text1="Description"
                text2="Type"
                text3="Date Posted"
                text4=""
                text5="Language"
                text6="# of Rows"
              />
              {pages[currentPage] && (
                <div key={currentPage} className="page" id="dataset-page">
                  {pages[currentPage].map((dataset, datasetIndex) => (
                    <Frame
                      key={datasetIndex}
                      className="frame"
                      divClassName="frame-instance"
                      divClassName1="frame-instance"
                      divClassName2="frame-instance"
                      divClassName3="frame-instance"
                      divClassName4="design-component-instance-node"
                      divClassName5="frame-instance"
                      divClassNameOverride="frame-instance"
                      frameClassName="frame-34-instance"
                      text1={
                        dataset.description.length < 50
                          ? dataset.description
                          : dataset.description.slice(0, 60).concat("...")
                      }
                      text2={
                        dataset.data_type.length < 25
                          ? dataset.data_type
                          : dataset.data_type.slice(0, 25).concat("...")
                      }
                      text3={
                        dataset.date_posted == null
                          ? ""
                          : dataset.date_posted.slice(0, 10)
                      }
                      text5={dataset.language}
                      text6={
                        dataset.number_of_rows
                          ? dataset.number_of_rows.toString()
                          : ""

                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="group-2">
            <Form.Control className="overlap-group-3" placeholder="Search"></Form.Control>
          </div>


          <div className="text-wrapper-26">Date</div>
          <div className="text-wrapper-27">Data Length</div>
          <InputDatePicker
            className="input-date-picker-instance"
            hasButtonContainer={false}
            hasHeader={false}
            textFieldHasLabelTextContainer={false}
            textFieldTextFieldClassName="design-component-instance-node"
            type="range"
            ref={dateRef}

          />
          <div className="keywords-dropdown">
            <div className="keywords-text">Keywords</div>
            <Form.Select className="Keywords-Select">
              <option>Psychology</option>
              <option>Math</option>
              <option>Etc</option>
            </Form.Select>
          </div>

          <div className="group-3">
            <div className="text-wrapper-28">Language</div>

          </div>
          <Form.Select ref={langref} className="Language-Select">
            {languages.map((lang, index) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Form.Select>



          <Form.Control ref={minInputRef} className="slider-field-instance" placeholder="Minimum"></Form.Control>
          <Form.Control ref={maxInputRef} className="max-field-instance" placeholder="Maximum"></Form.Control>
          <Button className="search-button" onClick={() => searchFunction()} variant="success">Search</Button>{' '}
          <Form.Select
            className="Dataset-Pages"
            id="pages-top"
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            value={currentPage}  // Keep in sync with current page
          >
            {pages.map((_, index) => (
              <option key={index} value={index}>
                Page {index + 1}
              </option>
            ))}
          </Form.Select>

          <Button onClick={(e) => {
            if (currentPage + 1 < pages.length) {
              setCurrentPage(currentPage + 1)
            }
          }} className="group-4 Dataset-Button">Next</Button>
          <Button onClick={(e) => {
            if (currentPage - 1 >= 0) {
              setCurrentPage(currentPage - 1)
            }
          }} className="group-5 Dataset-Button">Back</Button>
        </div>
        <img className="logo-2" alt="Logo" src="/img/logo-1.png" />

        <Form.Select
          className="Dataset-Pages"
          id="pages-bottom"
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          value={currentPage}
        >
          {pages.map((_, index) => (
            <option key={index} value={index}>
              Page {index + 1}
            </option>
          ))}
        </Form.Select>
        <Button onClick={(e) => {
          if (currentPage + 1 < pages.length) {
            setCurrentPage(currentPage + 1)
          }
        }} className="group-6 Dataset-Button">Next</Button>
        <Button onClick={(e) => {
          if (currentPage - 1 >= 0) {
            setCurrentPage(currentPage - 1)
          }
        }} className="group-7 Dataset-Button">Back</Button>
        <div className="navbar-2">
          <Link className="text-wrapper-29" to="/ai-chatbot-page">
            Chatbot
          </Link>
          <Link className="text-wrapper-30" to="/search-page">
            Datasets
          </Link>
          <Link className="text-wrapper-31" to="/landing-page">
            Home
          </Link>
          <Link className="text-wrapper-32" to="/about-page">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};
