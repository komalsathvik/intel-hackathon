import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Products.css";

function Proccessors() {
  const [processors, setProcessors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcessors = async () => {
      try {
        const res = await axios.get("https://backend-4usk.onrender.com/api/proccessors");
        setProcessors(res.data);
      } catch (err) {
        console.error("Error fetching processors:", err);
      }
    };
    fetchProcessors();
  }, []);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const cartItem = {
      id: item._id || item.id || Math.random().toString(36).substring(2, 9),
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

    const index = existingCart.findIndex((ci) => ci.id === cartItem.id);
    if (index !== -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    sessionStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/Cart");
  };

  const handleAskIntellect = (item) => {
    const message = `Can you please give info about "${item.name}"?`;
    sessionStorage.setItem("initialMessage", message);
    navigate("/intellect");
  };

  const sections = [
    "Intel® Core™ Ultra Processors",
    "Intel® Core™ Processors",
    "Intel® Xeon® Processors",
    "Intel® Xeon® CPU Max Series",
  ];

  return (
    <div className="processors-box">
      <div className="container mt-5 mb-5">
        {sections.map((section) => (
          <div className="row mt-5 mb-5" key={section}>
            <h1 className="text-center mb-5">{section}</h1>
            <div className="col d-flex justify-content-evenly flex-wrap">
              {processors
                .filter((item) => item.title === section)
                .map((item, index) => (
                  <div
                    className="card d-flex flex-column m-2"
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
                      <ul className="card-text flex-grow-1">
                        <li>Cores: {item.cores}</li>
                        <li>Max Turbo Frequency: {item.maxTurboFrequencyGHz}</li>
                        <li>Cache: {item.cacheMB}</li>
                        <li>Graphics: {item.graphics}</li>
                        <li>Launch Date: {item.launchDate}</li>
                        <li>Price: ₹{item.priceINR}</li>
                      </ul>
                      <button
                        className="btn btn-primary mb-2 w-100"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-secondary w-100"
                        onClick={() => handleAskIntellect(item)}
                      >
                        Ask Intellect
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proccessors;
