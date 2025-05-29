import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function System() {
  const [Systems, setSystems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/Systems");
        console.log(res.data);
        setSystems(res.data);
      } catch (err) {
        console.error("Error fetching systems:", err);
      }
    };

    fetchSystems();
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
    <div className="Systems-box">
      <div className="container mt-5 mb-5">
        <h1 className="text-center">AI PCs Powered by Intel</h1>
        <div className="row mt-5 mb-5" style={{ width: "100%" }}>
          {Systems.filter(item => item.title === "AI PCs Powered by Intel").map((item, index) => (
            <div className="col d-flex gap-5" key={index}>
              <div className="card d-flex flex-colum" style={{ width: "18rem" }}>
                <img
                  src={item.img_url}
                  className="card-img-top"
                  alt={item.name || "none"}
                  style={{ height: "18rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name || "none"}</h5>
                  <ul>
                    <li>Processor: {item.proccessor || "none"}</li>
                    <li>Graphics: {item.graphics || "none"}</li>
                    <li>Display: {item.Display || "none"}</li>
                    <li>Weight: {item.weight || "none"}</li>
                    <li>Design: {item.Design || "none"}</li>
                    <li>Price: {item.priceINR || "none"}</li>
                  </ul>
                  <div className="mt-auto">
                  <button href="#" className="btn btn-primary mb-2" style={{ width: "100%" }}   onClick={() => handleAddtocart(item)}>
                    Add to Cart
                  </button>
                  <button href="#" className="btn btn-primary" style={{ width: "100%" }}  onClick={() => handleAskIntellect(item)}>
                    Ask Intellect
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-center">Gaming Systems (Intel Inside)</h1>
        <div className="row mt-5 mb-5" style={{ width: "100%" }}>
          {Systems.filter(item => item.title === "Gaming Systems (Intel Inside)").map((item, index) => (
            <div className="col d-flex gap-5" key={index}>
              <div className="card d-flex flex-colum justify-content-between" style={{ width: "18rem" }}>
                <img
                  src={item.img_url}
                  className="card-img-top"
                  alt={item.name || "none"}
                  style={{ height: "18rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name || "none"}</h5>
                  <ul>
                    <li>Processor: {item.proccessor || "none" }</li>
                    <li>Graphics: {item.graphics || "none"}</li>
                    <li>Display: {item.Display || "none"}</li>
                    <li>Weight: {item.weight || "none"}</li>
                    <li>Design: {item.Design || "none"}</li>
                    <li>Price: {item.priceINR || "none"}</li>
                  </ul>
                  <div className="mt-auto ">
                  <button href="#" className="btn btn-primary mb-2" style={{ width: "100%" }}  onClick={() => handleAddtocart(item)}>
                    Add to Cart
                  </button>
                  <button href="#" className="btn btn-primary" style={{ width: "100%" }}  onClick={() => handleAskIntellect(item)}>
                    Ask Intellect
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default System;
