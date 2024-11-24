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
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLocation } from 'react-router-dom';


import "./style.css";
import { element } from "prop-types";


export const SearchPage = () => {
  // State to store datasets
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [languages, setLanguages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [date, setDate] = useState(null);
  const [loading_lengths, setLoading] = useState(true);

  const [keyword_options, setKeyOptions] = useState(null);

  // handles opening dataset frames
  const [openModalIndex, setOpen] = useState(null);

  //quicksearching
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;

  // style for dataset frame popup
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const langref = useRef(null);
  const searchRef = useRef(null);

  const num_per_page = 21


  const [value, setValue] = React.useState([0, 31284837]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }

  // chatbot initialization
  const id = "my-chatbot-id" // if not specified, will auto-generate uuidv4

  const flow = {
    "start": {
      message: "Hello there! What ",
      path: "end"
    },
    "end": {
      message: "See you, goodbye!"
    }
  }

  // Fetch datasets from the backend when the component mounts
  useEffect(() => {


    fetch('https://openfeedbackvault.utm.utoronto.ca/api/datasets') // Update the URL if necessary
      .then(response => response.json())
      .then(data => {

        //split data into pages, fill languages, and set min and max rows
        let chosenMin = Infinity
        let chosenMax = -Infinity;
        let count = 0
        let page_arr = []
        let temp_arr = []
        const lang_set = new Set();
        const key_set = new Set();
        while (count < data.length) {
          data[count].tags.forEach(element => {
            key_set.add(element);
          });
          if (data[count].number_of_rows == 0) {
            data[count].number_of_rows = null;
          }
          else if (data[count].number_of_rows > chosenMax) {
            chosenMax = data[count].number_of_rows;
          }
          else if (data[count].number_of_rows < chosenMin) {
            chosenMin = data[count].number_of_rows;
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
        setKeywords(Array.from(key_set));
        //set keyword options
        let options = [];
        for (e of key_set) {
          console.log(e);
          options.push({ value: e, label: e });
        }
        console.log("OPTIONS:");
        console.log(options);
        setKeyOptions(options);

        setMax(chosenMax);
        setMin(chosenMin);

        // if quicksearching, go straight to search
        if (searchQuery) {
          searchRef.current.value = searchQuery;
          searchFunction(); // Trigger search with the query

        }


      })
      .catch(error => {
        console.error('Error fetching datasets:', error);

      });

  }, [searchQuery]);

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
    fetch('https://openfeedbackvault.utm.utoronto.ca/api/datasets/search', {
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
                text1="Dataset Name"
                text2="Type"
                text3="Date Posted"
                text4=""
                text5="Language"
                text6="# of Rows"
              />
              {pages[currentPage] && (
                <div key={currentPage} className="page" id="dataset-page">
                  {pages[currentPage].map((dataset, datasetIndex) => (
                    <React.Fragment key={datasetIndex}>
                      <Frame
                        // onClick={window.open(dataset.link, "_blank")}
                        onClick={() => { setOpen(datasetIndex) }}
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
                          dataset.name.length < 50
                            ? dataset.name
                            : dataset.name.slice(0, 60).concat("...")
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
                      <Modal
                        open={openModalIndex === datasetIndex}
                        onClose={() => { setOpen(-1) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Button className="modal-button" onClick={() => { window.open(dataset.link, "_blank") }}>Go to Dataset Website</Button>

                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {dataset.description} <br />  <br />  {"Key words: " + dataset.tags} <br /> Size: {dataset.data_size_mb} mbs
                          </Typography>
                        </Box>

                      </Modal>
                    </React.Fragment>

                  ))}
                </div>
              )}
            </div>
          </div>
          {/* <div className="group-2">
            <Form.Control ref={searchRef} className="overlap-group-3" placeholder="Search"></Form.Control>
          </div> */}


          <div className="container-fluid filters">

            <div className="row searchbar-row">
              <div className="col-3"></div>
              <div className="col-6">
                <Form.Control ref={searchRef} className="overlap-group-3" placeholder="Search"></Form.Control>
              </div>
              <div className="col-3"></div>
            </div>

            <div className="row first-filter-row">
              <div className="col-1"></div>
              <div className="col-3">
                <div className="text-wrapper-26">Date</div>
                <div className="date-subscript">Please enter the oldest date for
                  published datasets</div>
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
              </div>

              <div className="col-3">

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
              <div className="col-1">
                <div className="keywordOptions">
                  <Form.Check
                    inline
                    label="AND"
                    name="keyword"
                    type='radio'
                    id='keywordAnd'
                  />
                  <Form.Check
                    inline
                    label="OR"
                    name="keyword"
                    type='radio'
                    id='keywordOr'
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="text-wrapper-28">Language</div>
                <Form.Select ref={langref} className="Language-Select">
                  {languages.map((lang, index) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}

                </Form.Select>
              </div>
              <div className="col-1"></div>

            </div>

            <div className="row second-filter-row">
              <div className="col-1"></div>
              <div className="col-4">
                <div className="Data_length_text">Data Length</div>
                <div className="length-subscript">Please enter a minimum and maximum
                  for number of rows.
                </div>
                <Box className="max-min-holder" sx={{ width: 400 }}>



                  <Slider
                    className="max-min-slider"
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={min}
                    max={max}
                    step={1000}
                  />

                </Box>
                {/* <div className="length-minimum-text">Minimum</div>
                <div className="length-maximum-text">Maximum</div> */}
              </div>
              <div className="col-3"></div>
              <div className="col-2">
                <Button className="search-button" onClick={() => searchFunction()} variant="success">Submit Filters</Button>{' '}
              </div>
              <div className="col-2"></div>





            </div>



          </div>



          {/* <div className="text-wrapper-26">Date</div>
          <div className="date-subscript">Please enter the oldest date for
            published datasets</div> */}
          {/* <div className="Data_length_text">Data Length</div>
          <div className="length-subscript">Please enter a minimum and maximum
            for number of rows.
          </div> */}
          {/* <div className="length-minimum-text">Minimum</div>
          <div className="length-maximum-text">Maximum</div> */}

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider> */}


          {/* <Box className="max-min-holder" sx={{ width: 400 }}>



            <Slider
              className="max-min-slider"
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={min}
              max={max}
              step={1000}
            />

          </Box> */}
          {/*<Form.Control placeholder="dd/mm/yyyy" ref={dateRef} className="input-date-picker-instance"></Form.Control> */}
          {/* <div className="keywords-dropdown">
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

          </div> */}

        </div>
        {/* <div className="text-wrapper-28">Language</div>
        <Form.Select ref={langref} className="Language-Select">
          {languages.map((lang, index) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}

        </Form.Select> */}



        {/* <Button className="search-button" onClick={() => searchFunction()} variant="success">Submit</Button>{' '} */}
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

        }} className="group-7 Dataset-Button">Back</Button>
        {/* <div className="navbar-2">
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
            About Us
          </Link>
          <Link className="userguide-page-link" to="/userguide-page">
            User Guide & Help
          </Link>
          <Link className="google-form-link" to={"/google-form"}>
            Submit a Dataset
          </Link>

        </div> */}

        <nav className="navbar navbar-expand-lg navbar-3">
          <div className="container-fluid">

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ai-chatbot-page">
                    Chatbot
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search-page">
                    Datasets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-page">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userguide-page">
                    User Guide & Help
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/google-form">
                    Submit a Dataset
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <img className="logo-2" alt="Logo" src="/img/logo.png" />
      </div>

    </div>
  );
};
