import React, { useEffect, useState } from "react";
import "./Cart.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
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
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    saveToSession(updated);
  };

  const decreaseItem = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCartItems(updated);
    saveToSession(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    saveToSession(updated);
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    alert("This is just a placeholder. Connect to backend to store orders.");
  };

  return (
    <div className="Cart-box">
      <div className="container" style={{ background: "whitesmoke", minHeight: "80vh" }}>
        <div className="row">
          {/* Left: Cart items */}
          <div className="col-md-8 p-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <h1 className="text-center">Products in Cart</h1>
            {cartItems.length === 0 ? (
              <h4 className="text-center mt-5">No items in cart.</h4>
            ) : (
              cartItems.map((item) => (
                <div className="row border mb-3" key={item._id}>
                  <div className="col-md-4 p-2">
                    <img
                      src={item.img_url || item.image || "/placeholder.jpg"}
                      alt="Product"
                      width="100%"
                    />
                  </div>
                  <div className="col-md-8 mt-2">
                    <ul style={{ listStyleType: "disc" }}>
                      {item.attributes?.length ? (
                        item.attributes.map((attr, idx) => <li key={idx}>{attr}</li>)
                      ) : (
                        <li>No attributes available</li>
                      )}
                      <li>₹{item.price}</li>
                      <li>Qty: {item.quantity}</li>
                    </ul>
                    <div className="mb-2">
                      <button className="btn btn-primary me-2" onClick={() => increaseItem(item._id)}>Add Item</button>
                      <button className="btn btn-secondary me-2" onClick={() => decreaseItem(item._id)}>Remove One</button>
                      <button className="btn btn-danger" onClick={() => removeItem(item._id)}>Remove From Cart</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Summary */}
          <div className="col-md-4 p-5">
            <h2>Total Summary</h2>
            <p>Total: ₹{getTotal()}</p>
            <p>GST: 20%</p>
            <hr />
            <p>Net Total: ₹{Math.round(getTotal() * 1.2)}</p>
            <p>Expected delivery: 19-02-2026</p>
            <button className="btn btn-success w-100 mt-4" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
