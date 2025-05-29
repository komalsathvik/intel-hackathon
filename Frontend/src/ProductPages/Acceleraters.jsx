import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Accerleraters() {
  const [acceleraters, setacceleraters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchacceleraters = async () => {
      try {
        const res = await axios.get("https://intel-hackathon.onrender.com/api/Acceleraters");
        console.log(res.data);
        setacceleraters(res.data);
      } catch (err) {
        console.error("Error fetching processors:", err);
      }
    };

    fetchacceleraters();
  }, []);

const handleAddtocart = (item) => {
  const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const cartItem = {
    id: item._id || item.id || Math.random().toString(36).substring(2, 9), // fallback id
    name: item.name,
    image: item.img_url || "none",
    price: item.priceINR || 0,
    quantity: 1,
    attributes: [
      `Configuration: ${item.Configuration || "none"}`,
      `Availability: ${item.Availability || "none"}`,
      `Performance: ${item.Performance || "none"}`,
      `Per-unit Estimate: ${item.Per_unit_Estimate || "none"}`,
    ],
  };

  // Check if item already exists by id
  const existingIndex = existingCart.findIndex((ci) => ci.id === cartItem.id);

  if (existingIndex !== -1) {
    // Increase quantity if exists
    existingCart[existingIndex].quantity += 1;
  } else {
    existingCart.push(cartItem);
  }

  sessionStorage.setItem("cart", JSON.stringify(existingCart));
  navigate("/Cart");
};


  const handleAskIntellect = (item) => {
    const message = `Can you please give info about "${item.name}" ?`;
    sessionStorage.setItem("initialMessage", message);
    navigate("/intellect");
  };

  return (
    <div className="acc-box ">
      <div className="container">
        <h1 style={{ textAlign: "center" }} className="mb-5">
          Intel® Gaudi® AI Accelerators
        </h1>
        {acceleraters
          .filter((item) => item.title === "Intel® Gaudi® AI Accelerators")
          .map((item, index) => {
            const isEven = index % 2 === 0;
            return isEven ? (
              <div className="row mt-5 mb-5" key={index}>
                <div className="col-2 "></div>
                <div className="col-4">
                  <img
                    className="mt-5"
                    src={item.img_url || "none"}
                    style={{ width: "70%", borderRadius: "40%" }}
                  />
                </div>
                <div className="col-6 mb-5 pt-5">
                  <h2 className="p-3">{item.name || "none"}</h2>
                  <ul>
                    <li>{item.Configuration || "none"}</li>
                    <li>Price:{item.priceINR || "none"} per kit</li>
                    <li>
                      Per-unit Estimate: {item.Per_unit_Estimate || "none"}
                    </li>
                    <li>Availability: {item.Availability || "none"} </li>
                    <li>Performance: {item.Performance || "none"}</li>
                  </ul>
                  <span className="p-3">
                    <a
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAddtocart(item)}
                    >
                      Add to Cart
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAskIntellect(item)}
                    >
                      Ask Intellect
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              <div className="row mb-5 mt-5" key={index}>
                <div className="text-right col-2 mr-5 pr-5"></div>
                <div className="text-right col-6 pt-5">
                  <h2 className="p-3">{item.name || "none"}</h2>
                  <ul>
                    <li>Configuration: {item.Configuration || "none"}</li>
                    <li>Price: {item.priceINR || "none"} per kit</li>
                    <li>
                      Per-unit Estimate:{item.Per_unit_Estimate || "none"}
                    </li>
                    <li>Availability:{item.Availability || "none"} </li>
                    <li>Performance: {item.Performance || "none"}</li>
                  </ul>
                  <span className="p-3">
                    <button
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAddtocart(item)}
                    >
                      Add to Cart
                    </button>
                  </span>
                  <span>
                    <button
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAskIntellect(item)}
                    >
                      Ask Intellect
                    </button>
                  </span>
                </div>
                <div className="col-4">
                  <img
                    className="mt-5"
                    src={item.img_url || "none"}
                    style={{ width: "70%", borderRadius: "40%" }}
                  />
                </div>
              </div>
            );
          })}

        <hr />
        <h1 style={{ textAlign: "center" }} className="mb-5">
          Intel® Data Center GPU Flex Series
        </h1>
        {acceleraters
          .filter((item) => item.title === "Intel® Data Center GPU Flex Series")
          .map((item, index) => {
            const isEven = index % 2 === 0;
            return isEven ? (
              <div className="row mt-5 mb-5" key={index}>
                <div className="col-2 "></div>
                <div className="col-4">
                  <img
                    className="mt-5"
                    src={item.img_url || "none"}
                    style={{ width: "70%", borderRadius: "40%" }}
                  />
                </div>
                <div className="col-6 mb-5 pt-5">
                  <h2 className="p-3">{item.name || "none"}</h2>
                  <ul>
                    <li>{item.Configuration || "none"}</li>
                    <li>Price:{item.priceINR || "none"} per kit</li>
                    <li>
                      Per-unit Estimate: {item.Per_unit_Estimate || "none"}
                    </li>
                    <li>Availability: {item.Availability || "none"} </li>
                    <li>Performance: {item.Performance || "none"}</li>
                  </ul>
                  <span className="p-3">
                    <a
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAddtocart(item)}
                    >
                      Add to Cart
                    </a>
                  </span>
                  <span>
                    <button
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAskIntellect(item)}
                    >
                      Ask Intellect
                    </button>
                  </span>
                </div>
              </div>
            ) : (
              <div className="row mb-5 mt-5" key={index}>
                <div className="text-right col-2 mr-5 pr-5"></div>
                <div className="text-right col-6 pt-5">
                  <h2 className="p-3">{item.name || "none"}</h2>
                  <ul>
                    <li>Configuration: {item.Configuration || "none"}</li>
                    <li>Price: {item.priceINR || "none"} per kit</li>
                    <li>
                      Per-unit Estimate:{item.Per_unit_Estimate || "none"}
                    </li>
                    <li>Availability:{item.Availability || "none"} </li>
                    <li>Performance: {item.Performance || "none"}</li>
                  </ul>
                  <span className="p-3">
                    <a
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAddtocart(item)}
                    >
                      Add to Cart
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      className="btn btn-primary mb-2"
                      style={{ width: "30%" }}
                      onClick={() => handleAskIntellect(item)}
                    >
                      Ask Intellect
                    </a>
                  </span>
                </div>
                <div className="col-4">
                  <img
                    className="mt-5"
                    src={item.img_url || "none"}
                    style={{ width: "70%", borderRadius: "40%" }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Accerleraters;
