import React, { useEffect, useState } from "react";
import "./Cart.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      // Parse and fix missing quantity
      const parsedCart = JSON.parse(storedCart).map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(parsedCart);
    }
  }, []);

  const saveToSession = (items) => {
    sessionStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseItem = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updated);
    saveToSession(updated);
  };

  const decreaseItem = (id) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) - 1;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setCartItems(updated);
    saveToSession(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    saveToSession(updated);
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="Cart-box">
      <div
        className="container"
        style={{ background: "whitesmoke", height: "80vh" }}
      >
        <div className="row">
          <div className="col-8 p-5 " style={{ height: "100%" }}>
            <h1 className="text-center ">Products in Cart</h1>
            <div className="cart-items-scroll">
            {cartItems.length === 0 ? (
              <h3 className="text-center mt-5">No items in cart.</h3>
            ) : (
              cartItems.map((item) => (
                <div className="row border mb-3 " key={item.id}>
                  <div className="col p-2">
                    <img src={item.image} alt="" width="100%" />
                  </div>
                  <div className="col mt-2">
                    <ul style={{ listStyleType: "disc" }}>
                      {item.attributes && item.attributes.length > 0 ? (
                        item.attributes.map((attr, index) => (
                          <li key={index}>{attr}</li>
                        ))
                      ) : (
                        <li>No attributes available</li>
                      )}
                      <li>₹{item.price}</li>
                      <li>Qty: {item.quantity || 1}</li>
                    </ul>
                    <span>
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => increaseItem(item.id)}
                      >
                        Add Item
                      </button>
                      <button
                        className="btn btn-secondary m-2"
                        onClick={() => decreaseItem(item.id)}
                      >
                        Remove One
                      </button>
                    </span>
                    <span>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove From Cart
                      </button>
                    </span>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>

          <div className="col-4 p-5">
            <h1 className="m-4">Total Summary</h1>
            <p className="m-4">Total: ₹{getTotal()}</p>
            <p className="m-4">ID: {Math.random().toString(36).substring(2, 18)}</p>
            <p className="m-4">GST: 20%</p>
            <hr />
            <p className="m-4">Net Total: ₹{Math.round(getTotal() * 1.2)}</p>
            <div>Expected delivery date: 19-02-2026</div>
            <button className="btn btn-primary mt-5" style={{ width: "100%" }}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
