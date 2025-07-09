import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function System() {
  const [systems, setSystems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const res = await axios.get("https://backend-4usk.onrender.com/api/Systems");
        setSystems(res.data);
      } catch (err) {
        console.error("Error fetching systems:", err);
      }
    };
    fetchSystems();
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
        `Processor: ${item.proccessor || "none"}`,
        `Graphics: ${item.graphics || "none"}`,
        `Display: ${item.Display || "none"}`,
        `Weight: ${item.weight || "none"}`,
        `Design: ${item.Design || "none"}`,
      ],
    };

    const existingIndex = existingCart.findIndex((ci) => ci.id === cartItem.id);
    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
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

  const renderCard = (item, index) => (
    <div className="col d-flex justify-content-center mb-4" key={index}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={item.img_url}
          className="card-img-top"
          alt={item.name || "none"}
          style={{ height: "18rem", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name || "none"}</h5>
          <ul className="card-text">
            <li>Processor: {item.proccessor || "none"}</li>
            <li>Graphics: {item.graphics || "none"}</li>
            <li>Display: {item.Display || "none"}</li>
            <li>Weight: {item.weight || "none"}</li>
            <li>Design: {item.Design || "none"}</li>
            <li>Price: ₹{item.priceINR || "none"}</li>
          </ul>
          <button
            className="btn btn-primary mb-2 mt-auto"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleAskIntellect(item)}
          >
            Ask Intellect
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="Systems-box">
      <div className="container mt-5 mb-5">
        <h1 className="text-center mb-5">AI PCs Powered by Intel</h1>
        <div className="row">
          {systems
            .filter((item) => item.title === "AI PCs Powered by Intel")
            .map((item, index) => renderCard(item, index))}
        </div>

        <h1 className="text-center mt-5 mb-5">Gaming Systems (Intel Inside)</h1>
        <div className="row">
          {systems
            .filter((item) => item.title === "Gaming Systems (Intel Inside)")
            .map((item, index) => renderCard(item, index))}
        </div>
      </div>
    </div>
  );
}

export default System;
