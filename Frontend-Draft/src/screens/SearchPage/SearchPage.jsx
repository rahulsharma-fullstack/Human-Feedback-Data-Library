import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DropdownBox } from "../../components/DropdownBox";
import { InputDatePicker } from "../../components/InputDatePicker";
import { SliderField } from "../../components/SliderField";
import { Frame } from "../../components/Frame";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import "./style.css";


export const SearchPage = () => {
  // State to store datasets
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  let pages = []
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
  
  // Fetch datasets from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:8082/api/datasets') // Update the URL if necessary
      .then(response => response.json())
      .then(data => {
        setDatasets(data);  // Save datasets to state
        setLoading(false);  // Set loading to false once data is fetched

        //split data into pages
        let count = 0
        let page_arr = []
        while (count < datasets.length) {
          page_arr.push(datasets[count]);

          if (page_arr.length == num_per_page) {
            pages.push(page_arr);
            page_arr = [];
          }
          count += 1;

        }
        if (page_arr.length != 0) {
          pages.push(page_arr);

        }
        console.log(pages);
      })
      .catch(error => {
        console.error('Error fetching datasets:', error);
        setLoading(false);
      });
  }, []);

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
                text1="Master Template"
                text2="Type"
                text3="Industry"
                text4="Author"
                text5="Created"
                text6="Edited"
              />
              <Frame
                className="frame-9"
                text="Asset Allocation"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Internet Services"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />
              <Frame
                className="frame-10"
                text="Analysis Name"
                text1="Founder Break-Even Calculator"
                text2="Comparable"
                text3="Bank"
                text4="John Smith"
                text5="21.03.2021"
                text6="14.07.2021"
              />


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
          />

          <div className="keywords-dropdown">
            <div className="keywords-text">Keywords</div>
            <Select className="Keywords-Select"
              isMulti
              options={keyword_options}/>
          </div>
          
          <div className="group-3">
            <div className="text-wrapper-28">Language</div>
            <Select className="Language-Select"
            isMulti 
            options={lang_set}
            />
          </div>
          
          <SliderField
            blockClassName="slider-field-2"
            className="slider-field-instance"
            description="Number of Data Objects in Dataset"
            knobEndClassName="slider-field-3"
            knobStartClassName="slider-field-3"
            label=""
            state="default"
            text=""
            text1="Min Number-Max Number"
          />

          {/* <DropdownBox
            className="dropdown-box-15"
            headerIconsRegularChevronDownS75StyleOverrideClassName="dropdown-box-18"
            headerMenuLabelMenuLabelClassName="dropdown-box-16"
            headerMenuLabelText="Page 1"
            headerStateEmptyClassName="dropdown-box-17"
            itemsListItemHoverLabelText="Page 2"
            itemsListItemHoverStateDefaultClassName="dropdown-box-19"
            itemsListItemHoverStateDefaultClassNameOverride="dropdown-box-20"
            itemsListItemHoverStateHoverClassName="dropdown-box-22"
            itemsListItemHoverStateHoverClassNameOverride="dropdown-box-23"
            itemsListItemHoverStatePressingClassName="dropdown-box-24"
            itemsListItemsListClassName="dropdown-box-21"
            stateProp="closed"
          /> */}

          <Form.Select className="Dataset-Pages" id="pages-top">
            <option>Page 1</option>
            <option>Page 2</option>
            <option>Page 3</option>
            <option>Page n</option>
          </Form.Select>

          <Button className="group-4 Dataset-Button">Next</Button>
          <Button className="group-5 Dataset-Button">Back</Button>
        </div>
        <img className="logo-2" alt="Logo" src="/img/logo-1.png" />
        {/* <DropdownBox
          className="dropdown-box-25"
          headerIconsRegularChevronDownS75StyleOverrideClassName="dropdown-box-18"
          headerMenuLabelMenuLabelClassName="dropdown-box-16"
          headerMenuLabelText="Page 1"
          headerStateEmptyClassName="dropdown-box-26"
          itemsListItemHoverLabelText="Page 2"
          itemsListItemHoverStateDefaultClassName="dropdown-box-19"
          itemsListItemHoverStateDefaultClassNameOverride="dropdown-box-20"
          itemsListItemHoverStateHoverClassName="dropdown-box-22"
          itemsListItemHoverStateHoverClassNameOverride="dropdown-box-23"
          itemsListItemHoverStatePressingClassName="dropdown-box-24"
          itemsListItemsListClassName="dropdown-box-21"
          stateProp="closed"
        /> */}
        <Form.Select className="Dataset-Pages" id="pages-bottom">
          <option>Page 1</option>
          <option>Page 2</option>
          <option>Page 3</option>
          <option>Page n</option>
        </Form.Select>
        <Button className="group-6 Dataset-Button">Next</Button>
        <Button className="group-7 Dataset-Button">Back</Button>
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
