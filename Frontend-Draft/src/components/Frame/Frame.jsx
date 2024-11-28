

import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Frame = ({
  className,

  divClassNameOverride,
  text1 = "Founder Break-Even Calculator",
  divClassName1,
  text2 = "Comparable",
  divClassName2,
  text3 = "Bank",

  frameClassName,
  divClassName4,
  text5 = "21.03.2021",
  divClassName5,
  text6 = "14.07.2021",
  onClick
}) => {
  return (
    <div className={`frame ${className} container-fluid`} onClick={onClick}>

      <div className="row data-row">
        <div className="col-2 name-col">
          <div className={'dataset-name'}>{text1}</div>
        </div>

        <div className="col-2 type-col">
          <div className={`dataset-type`}>{text2}</div>
        </div>

        <div className="col-2">
          <div className={`dataset-date`}>{text3}</div>
        </div>



        <div className="col-2">
          <div className={`dataset-language`}>{text5}</div>
        </div>

        <div className="col-2">
          <div className={`dataset-rownum`}>{text6}</div>
        </div>
      </div>


    </div>
  );
};

Frame.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  text5: PropTypes.string,
  text6: PropTypes.string,
};
