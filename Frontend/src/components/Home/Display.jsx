import React from "react";
import "./Display.css";

function Display() {
  return (
    <div className=" mt-5 display ">
      <div className="box">
        <div className="box-row">
          <h1>Welcome To Intel</h1>
          
        </div>
        <div className="box-row-2">
          
          <div className="box-row-2">
            <h3>
              Scroll Down to see more <i class="fa-solid fa-angle-down"></i>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
