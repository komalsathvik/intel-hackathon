import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Accelerators() {
  const [accelerators, setAccelerators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccelerators = async () => {
      try {
        const res = await axios.get("https://backend-4usk.onrender.com/Acceleraters");
        setAccelerators(res.data);
      } catch (err) {
        console.error("Error fetching accelerators:", err);
      }
    };

    fetchAccelerators();
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
        `Configuration: ${item.Configuration || "none"}`,
        `Availability: ${item.Availability || "none"}`,
        `Performance: ${item.Performance || "none"}`,
        `Per-unit Estimate: ${item.Per_unit_Estimate || "none"}`,
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
    const message = `Can you please give info about "${item.name}" ?`;
    sessionStorage.setItem("initialMessage", message);
    navigate("/intellect");
  };

  const renderProduct = (item, index) => {
    const isEven = index % 2 === 0;

    return (
      <div className="row mt-5 mb-5" key={index}>
        {isEven ? (
          <>
            <div className="col-2" />
            <div className="col-4">
              <img
                className="mt-5"
                src={item.img_url || "none"}
                alt={item.name}
                style={{ width: "70%", borderRadius: "40%" }}
              />
            </div>
            <div className="col-6 pt-5">
              {renderProductDetails(item)}
            </div>
          </>
        ) : (
          <>
            <div className="col-2" />
            <div className="col-6 pt-5 text-right">
              {renderProductDetails(item)}
            </div>
            <div className="col-4">
              <img
                className="mt-5"
                src={item.img_url || "none"}
                alt={item.name}
                style={{ width: "70%", borderRadius: "40%" }}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const renderProductDetails = (item) => (
    <>
      <h2 className="p-3">{item.name || "none"}</h2>
      <ul>
        <li>{item.Configuration || "none"}</li>
        <li>Price: ₹{item.priceINR || "none"} per kit</li>
        <li>Per-unit Estimate: {item.Per_unit_Estimate || "none"}</li>
        <li>Availability: {item.Availability || "none"}</li>
        <li>Performance: {item.Performance || "none"}</li>
      </ul>
      <div className="d-flex gap-2 flex-wrap">
        <button
          className="btn btn-primary"
          style={{ width: "30%" }}
          onClick={() => handleAddToCart(item)}
        >
          Add to Cart
        </button>
        <button
          className="btn btn-secondary"
          style={{ width: "30%" }}
          onClick={() => handleAskIntellect(item)}
        >
          Ask Intellect
        </button>
      </div>
    </>
  );

  return (
    <div className="acc-box">
      <div className="container">
        <h1 className="text-center mb-5">Intel® Gaudi® AI Accelerators</h1>
        {accelerators
          .filter((item) => item.title === "Intel® Gaudi® AI Accelerators")
          .map((item, index) => renderProduct(item, index))}

        <hr />

        <h1 className="text-center mb-5">Intel® Data Center GPU Flex Series</h1>
        {accelerators
          .filter((item) => item.title === "Intel® Data Center GPU Flex Series")
          .map((item, index) => renderProduct(item, index))}
      </div>
    </div>
  );
}

export default Accelerators;
