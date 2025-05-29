import React from "react";

function Footer() {
  return (
    <div className="container border-top">
      <div className="row">
        <div className="col-3 mr-5">
          <img
            src="/Header_logo.jpeg"
            alt="image"
            style={{ height: "100%", width: "100%" }}
          ></img>
        </div>
        <div className="col-9 mt-5 ml-5 ">
          <div className="row">
            <div className="d-flex flex-wrap gap-3 mb-5">
              <span>Company Overview</span>
              <span>Contact Intel</span>
              <span>Newsroom</span>
              <span>Investors</span>
              <span>Careers</span>
              <span>Corporate Responsibility</span>
              <span>Inclusion</span>
              <span>Public Policy</span>
            </div>
          </div>
          <div className="row mb-5">
            <div className="d-flex gap-3">
              <i className="fa-brands fa-facebook-f fs-3"></i>
              <i className="fa-brands fa-x-twitter fs-3"></i>
              <i className="fa-brands fa-instagram fs-3"></i>
              <i className="fa-brands fa-youtube fs-3"></i>
              <i className="fa-brands fa-linkedin fs-3"></i>
            </div>
          </div>
          <div className="row">
            <p>
              Intel technologies may require enabled hardware, software or
              service activation. // No product or component can be absolutely
              secure. // Your costs and results may vary. // Performance varies
              by use, configuration, and other factors. Learn more at
              intel.com/performanceindex. // See our complete legal Notices and
              Disclaimers. // Intel is committed to respecting human rights and
              avoiding causing or contributing to adverse impacts on human
              rights. See Intel’s Global Human Rights Principles. Intel’s
              products and software are intended only to be used in applications
              that do not cause or contribute to adverse impacts on human
              rights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
