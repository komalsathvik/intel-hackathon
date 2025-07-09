import React from "react";

function RightSide({ logo, heading, view_button, button_data, description, link }) {
  return (
    <div className="container mt-3 mb-5">
      <div className="row align-items-center">
        {/* Content (Feature buttons + descriptions) */}
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

        {/* Right Logo and Main Button */}
        <div className="col-md-4 mt-5 text-center">
          {logo}
          <h1 className="p-4 mb-4">{heading}</h1>
          <a href={link}>
            <button type="button" className="btn btn-primary" style={{ width: "100%" }}>
              {view_button}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
