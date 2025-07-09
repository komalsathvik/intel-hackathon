import React from "react";

function Footer() {
  return (
    <footer className="container-fluid border-top pt-4 mt-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="row px-4">
        {/* Logo Section */}
        <div className="col-md-3 mb-4">
          <img
            src="/Header_logo.jpeg"
            alt="Intel Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Links and Info Section */}
        <div className="col-md-9">
          <div className="row">
            <div className="d-flex flex-wrap gap-3 mb-4">
              {[
                "Company Overview",
                "Contact Intel",
                "Newsroom",
                "Investors",
                "Careers",
                "Corporate Responsibility",
                "Inclusion",
                "Public Policy",
              ].map((text, idx) => (
                <span key={idx} style={{ cursor: "pointer", color: "#0068b5" }}>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="row mb-4">
            <div className="d-flex gap-4">
              <i className="fa-brands fa-facebook-f fs-4" title="Facebook"></i>
              <i className="fa-brands fa-x-twitter fs-4" title="Twitter"></i>
              <i className="fa-brands fa-instagram fs-4" title="Instagram"></i>
              <i className="fa-brands fa-youtube fs-4" title="YouTube"></i>
              <i className="fa-brands fa-linkedin fs-4" title="LinkedIn"></i>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="row">
            <p style={{ fontSize: "0.9rem", color: "#6c757d" }}>
              Intel technologies may require enabled hardware, software or
              service activation. No product or component can be absolutely
              secure. Your costs and results may vary. Performance varies by
              use, configuration, and other factors. Learn more at{" "}
              <a href="https://intel.com/performanceindex" target="_blank" rel="noreferrer">
                intel.com/performanceindex
              </a>. See our complete legal notices and disclaimers. Intel is
              committed to respecting human rights and avoiding causing or
              contributing to adverse impacts on human rights. See Intel’s{" "}
              <a
                href="https://www.intel.com/content/www/us/en/policy/human-rights.html"
                target="_blank"
                rel="noreferrer"
              >
                Global Human Rights Principles
              </a>. Intel’s products and software are intended only to be used
              in applications that do not cause or contribute to adverse impacts
              on human rights.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
