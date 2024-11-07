import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Frame } from "../../components/Frame";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
//import {SliderField} from "../../components/SliderField"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./style.css";


export const SearchPage = () => {
  // State to store datasets
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [languages, setLanguages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [date, setDate] = useState(null);

  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);
  const dateRef = useRef(null);
  const langref = useRef(null);
  const searchRef = useRef(null);

  const num_per_page = 21

  const keyword_options = [
    { value: 'RLHF', label: 'RLHF' },
    { value: 'Helpfulness', label: 'Helpfulness' },
    { value: 'Harmless', label: 'Harmless' },
    { value: 'Science', label: 'Science' },
    { value: 'Educational', label: 'Educational' },
    { value: 'Comparison', label: 'Comparison' },
    { value: 'TOOL/instruction', label: 'TOOL/instruction' },
    { value: 'DPO', label: 'DPO' },
    { value: 'NLG', label: 'NLG' },
    { value: 'News', label: 'News' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Translation', label: 'Translation' },
    { value: 'Bias', label: 'Bias' },
    { value: 'Truthfulness', label: 'Truthfulness' },
    { value: 'Fairness', label: 'Fairness' },
    { value: 'Safety', label: 'Safety' },
    { value: 'Dialogue', label: 'Dialogue' },
    { value: 'Task Prompts', label: 'Task Prompts' },
    { value: 'Reddit', label: 'Reddit' },
    { value: 'Evaluation', label: 'Evaluation' },
    { value: 'Structured Tasks', label: 'Structured Tasks' },
    { value: 'Math', label: 'Math' },
    { value: 'EcoFriendly', label: 'EcoFriendly' },
    { value: 'Sustainability', label: 'Sustainability' },
    { value: 'Alignment', label: 'Alignment' },
    { value: 'Quantitative Reasoning', label: 'Quantitative Reasoning' },
    { value: 'Summarization', label: 'Summarization' },
    { value: 'Transparency', label: 'Transparency' },
    { value: 'Process Supervision', label: 'Process Supervision' },
    { value: 'QA', label: 'QA' },
    { value: 'NLP', label: 'NLP' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Human Feedback', label: 'Human Feedback' },
    { value: 'Visual QA', label: 'Visual QA' },
    { value: 'Accuracy', label: 'Accuracy' },
    { value: 'Instruction', label: 'Instruction' },
    { value: 'Multilingual', label: 'Multilingual' },
    { value: 'Toxicity', label: 'Toxicity' },
    { value: 'Social Reasoning', label: 'Social Reasoning' },
    { value: 'Psychology', label: 'Psychology' },
    { value: 'Mental Health', label: 'Mental Health' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Sentiment Analysis', label: 'Sentiment Analysis' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Benchmarking', label: 'Benchmarking' },
    { value: 'Preference Learning', label: 'Preference Learning' },
    { value: 'Technical Queries', label: 'Technical Queries' },
    { value: 'Red Teaming', label: 'Red Teaming' },
    { value: 'Text-to-Image', label: 'Text-to-Image' },
    { value: 'Feedback', label: 'Feedback' },
    { value: 'Coding', label: 'Coding' },
    { value: 'SQL', label: 'SQL' },
    { value: 'Expert Feedback', label: 'Expert Feedback' },
    { value: 'Training', label: 'Training' },
    { value: 'Search', label: 'Search' }
  ];
  const [value, setValue] = React.useState([0, 31284837]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }

  // Fetch datasets from the backend when the component mounts
  useEffect(() => {
    fetch('https://openfeedbackvault.utm.utoronto.ca/api/datasets') // Update the URL if necessary
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
        // setKeywords(Array.from(key_set));
        setMax(max);
        setMin(min);
        console.log(temp_arr);
        console.log(lang_set);
        console.log("MAX:\n")
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
    let chosenMin = value[0]
    let chosenMax = value[1]
    let keys = keywords;

    // let date = (dateRef.current && isDateFormatValid(dateRef.current.value)) ? dateRef.current.value : null;
    let chosenDate = date;
    console.log(chosenDate);
    if (chosenDate == "Invalid Date" || chosenDate == null) {
      chosenDate = null;
    }
    else {
      chosenDate = date

    }

    let lang = langref.current ? langref.current.value : null;
    let searchText = searchRef.current ? searchRef.current.value : null;
    console.log(searchText);


    const searchParams = {
      endDate: chosenDate, // Format: DD/MM/YYYY
      minRows: chosenMin,
      maxRows: chosenMax,
      language: lang,
      tags: keys
    };
    fetch('http://localhost:8082/api/datasets/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchParams)
    }).then(response => response.json())
      .then(data => {
        // Filter the response data by seeing if its descriptions contain key words or words in search bar.
        let searchWords = searchText.split(/\s+/); // Splits by one or more spaces
        let searchedData = null;
        if (searchText != null) {
          searchedData = [];
          for (let i = 0; i < data.length; i++) {
            let description = data[i].description.toLowerCase();
            let found = searchWords.some(word => description.includes(word.toLowerCase()));
            if (found) {
              searchedData.push(data[i]);
            }
          }
        }
        else {
          searchedData = data;
        }
        console.log(searchedData);
        //split data into pages, fill languages, and set min and max rows
        let count = 0;
        let page_arr = [];
        let temp_arr = [];


        while (count < searchedData.length) {

          if (searchedData[count].number_of_rows == 0) {
            searchedData[count].number_of_rows = null;
          }
          else if (searchedData[count].number_of_rows > max) {
            max = searchedData[count].number_of_rows;
          }
          else if (searchedData[count].number_of_rows < min) {
            min = searchedData[count].number_of_rows;
          }
          if (searchedData[count].data_type == "NaN") {
            searchedData[count].data_type = "";
          }
          page_arr.push(searchedData[count]);


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


      }).catch(error => {
        console.log("Unable to fetch datasets. Please check formatting");
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
                      // onClick={window.open(dataset.link, "_blank")}
                      onClick={() => {
                        window.open(dataset.link, "_blank");
                      }}
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
            <Form.Control ref={searchRef} className="overlap-group-3" placeholder="Search"></Form.Control>
          </div>


          <div className="text-wrapper-26">Date</div>
          <div className="Data_length_text">Data Length</div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Select date"
              onChange={(dateInput) => {
                if (dateInput != null) {
                  console.log(dateInput.format("DD/MM/YYYY"));
                  setDate(dateInput.format("DD/MM/YYYY"))
                }
                else {
                  setDate(null);
                }
              }} />
          </LocalizationProvider>


          <Box className="max-min-holder" sx={{ width: 400 }}>

            <Slider className="max-min-slider"
              //getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={31284837}
              step={1000}

            />
          </Box>
          {/*<Form.Control placeholder="dd/mm/yyyy" ref={dateRef} className="input-date-picker-instance"></Form.Control> */}
          <div className="keywords-dropdown">
            <div className="keywords-text">Keywords</div>
            <Select className="Keywords-Select"
              isMulti
              options={keyword_options}
              onChange={(options) => {

                let stateArray = []
                if (options != null) {
                  for (let i = 0; i < options.length; i++) {
                    stateArray.push(options[i].value);
                  }
                }
                setKeywords(stateArray);
              }}
            />

          </div>

        </div>
        <div className="text-wrapper-28">Language</div>
        <Form.Select ref={langref} className="Language-Select">
          {languages.map((lang, index) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}

        </Form.Select>



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

      { /*    <Form.Select
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
    */}
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
  );
};
