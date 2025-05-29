import React from "react";

function LeftSide({logo, heading, view_button, button_data, description,link }) {
  return (
    <div className="container mt-3 mb-5">
      <div className="row">
        <div className="col-4 mt-5 text-center" style={{ height: "80%" }}>
          {logo}
          <h1 className="p-3">{heading}</h1>
           <a href={link}><button type="button" className="btn btn-primary m-2" style={{ width: "25rem" }}>
           {view_button}
          </button></a>
        </div>

        <div className="col-8 mt-5 mb-5">
          {button_data.map((btn, index) => (
            <span key={index}>
              <a href={link}><button type="button" className="btn btn-primary m-2">
                {btn}
              </button></a>
              <p className="text-muted mb-0 pb-0">{description[index]}</p>
              <hr />

            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
