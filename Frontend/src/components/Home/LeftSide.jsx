import React from "react";

function LeftSide({ logo, heading, view_button, button_data, description, link }) {
  return (
    <div className="container mt-3 mb-5">
      <div className="row align-items-center">
        {/* Left Section: Logo & Main Button */}
        <div className="col-md-4 mt-5 text-center">
          {logo}
          <h1 className="p-3">{heading}</h1>
          <a href={link}>
            <button
              type="button"
              className="btn btn-primary m-2"
              style={{ width: "100%" }}
            >
              {view_button}
            </button>
          </a>
        </div>

        {/* Right Section: Feature Buttons & Descriptions */}
        <div className="col-md-8 mt-5 mb-5">
          {button_data.map((btn, index) => (
            <div key={index} className="mb-4">
              <a href={link}>
                <button type="button" className="btn btn-outline-primary">
                  {btn}
                </button>
              </a>
              <p className="text-muted mt-2">{description[index]}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
