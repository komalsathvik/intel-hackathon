import React from "react";
import "./Products.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Proccessors() {
  const [processors, setProcessors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcessors = async () => {
      try {
        const res = await axios.get("https://intel-hackathon.onrender.com/api/proccessors");
        console.log(res.data);
        setProcessors(res.data);
      } catch (err) {
        console.error("Error fetching processors:", err);
      }
    };

    fetchProcessors();
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
      `Cores: ${item.cores || "N/A"}`,
      `Max Turbo Frequency: ${item.maxTurboFrequencyGHz || "N/A"} GHz`,
      `Cache: ${item.cacheMB || "N/A"} MB`,
      `Graphics: ${item.graphics || "N/A"}`,
      `Launch Date: ${item.launchDate || "N/A"}`,
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
    <div className="processors-box">
      <div className="container mt-5 mb-5">
        <div
          className="row mt-5 mb-5"
          style={{ height: "100%", width: "100%" }}
        >
          <h1 className="text-center mb-5">Intel® Core™ Ultra Processors</h1>
          <div className="col d-flex justify-content-evenly flex-wrap">
            {processors
              .filter((item) => item.title === "Intel® Core™ Ultra Processors")
              .map((item, index) => (
                <div
                  className="card d-flex flex-column"
                  style={{ width: "18rem", height: "100%" }}
                  key={item._id || index}
                >
                  <img
                    src={item.img_url}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text flex-grow-1">
                      <ul>
                        <li>Cores: {item.cores}</li>
                        <li>
                          Max Turbo Frequency: {item.maxTurboFrequencyGHz} 
                        </li>
                        <li>Cache: {item.cacheMB} </li>
                        <li>Graphics: {item.graphics}</li>
                        <li>Launch Date: {item.launchDate}</li>
                        <li>Price: {item.priceINR}</li>
                      </ul>
                    </p>
                    <button href="#" className="btn btn-primary mb-2 w-100" onClick={() => handleAddtocart(item)}>
                      Add to Cart
                    </button>
                    <button href="#" className="btn btn-primary w-100" onClick={() => handleAskIntellect(item)}>
                      Ask Intellect
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div
          className="row mt-5 mb-5"
          style={{ height: "100%", width: "100%" }}
        >
          <h1 className="text-center mb-5"> Intel® Core™ Processors</h1>
          <div className="col d-flex justify-content-evenly flex-wrap">
            {processors
              .filter((item) => item.title === "Intel® Core™ Processors")
              .map((item, index) => (
                <div
                  className="card d-flex flex-column"
                  style={{ width: "18rem", height: "100%" }}
                  key={item._id || index}
                >
                  <img
                    src={item.img_url}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text flex-grow-1">
                      <ul>
                        <li>Cores: {item.cores}</li>
                        <li>
                          Max Turbo Frequency: {item.maxTurboFrequencyGHz} 
                        </li>
                        <li>Cache: {item.cacheMB} </li>
                        <li>Graphics: {item.graphics}</li>
                        <li>Launch Date: {item.launchDate}</li>
                        <li>Price: {item.priceINR}</li>
                      </ul>
                    </p>
                    <button href="#" className="btn btn-primary mb-2 w-100" onClick={() => handleAddtocart(item)} >
                      Add to Cart
                    </button>
                    <button href="#" className="btn btn-primary w-100" onClick={() => handleAskIntellect(item)}>
                      Ask Intellect
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div
          className="row mt-5 mb-5"
          style={{ height: "100%", width: "100%" }}
        >
          <h1 className="text-center mb-5">Intel® Xeon® Processors</h1>
          <div className="col d-flex justify-content-evenly flex-wrap">
            {processors
              .filter((item) => item.title === "Intel® Xeon® Processors")
              .map((item, index) => (
                <div
                  className="card d-flex flex-column"
                  style={{ width: "18rem", height: "100%" }}
                  key={item._id || index}
                >
                  <img
                    src={item.img_url}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text flex-grow-1">
                      <ul>
                        <li>Cores: {item.cores}</li>
                        <li>
                          Max Turbo Frequency: {item.maxTurboFrequencyGHz} 
                        </li>
                        <li>Cache: {item.cacheMB} </li>
                        <li>Graphics: {item.graphics}</li>
                        <li>Launch Date: {item.launchDate}</li>
                        <li>Price: {item.priceINR}</li>
                      </ul>
                    </p>
                    <button href="#" className="btn btn-primary mb-2 w-100" onClick={() => handleAddtocart(item)}>
                      Add to Cart
                    </button>
                    <button href="#" className="btn btn-primary w-100" onClick={() => handleAskIntellect(item)}>
                      Ask Intellect
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div
          className="row mt-5 mb-5"
          style={{ height: "100%", width: "100%" }}
        >
          <h1 className="text-center mb-5">Intel® Xeon® CPU Max Series</h1>
          <div className="col d-flex justify-content-evenly flex-wrap">
            {processors
              .filter((item) => item.title === "Intel® Xeon® CPU Max Series")
              .map((item, index) => (
                <div
                  className="card d-flex flex-column"
                  style={{ width: "18rem", height: "100%" }}
                  key={item._id || index}
                >
                  <img
                    src={item.img_url}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title mt-5">{item.name}</h5>
                    <p className="card-text flex-grow-1 ">
                      <ul >
                        <li>Cores: {item.cores}</li>
                        <li>
                          Max Turbo Frequency: {item.maxTurboFrequencyGHz} 
                        </li>
                        <li>Cache: {item.cacheMB} </li>
                        <li>Graphics: {item.graphics}</li>
                        <li>Launch Date: {item.launchDate}</li>
                        <li>Price: {item.priceINR}</li>
                      </ul>
                    </p>
                    <button href="#" className="btn btn-primary mb-2 w-100" onClick={() => handleAddtocart(item)}>
                      Add to Cart
                    </button>
                    <button href="#" className="btn btn-primary w-100" onClick={() => handleAskIntellect(item)}>
                      Ask Intellect
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proccessors;
