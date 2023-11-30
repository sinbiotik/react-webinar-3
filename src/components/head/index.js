import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, buttonName, handleClick }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>

      {Boolean(buttonName) &&
        <div className='Head-btn btn'>
          <button
            onClick={() => handleClick()}
          >
            {buttonName}
          </button>
        </div>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  buttonName: PropTypes.node,
  handleClick: PropTypes.func,
};

Head.defaultProps = {
  handleClick: () => {}
}

export default React.memo(Head);
