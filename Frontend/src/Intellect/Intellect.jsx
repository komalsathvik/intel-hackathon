import React, { useState, useEffect } from "react";
import "./Intellect.css";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Intellect() {
  const location = useLocation();
  const initialMessage = location.state?.message || "";

  const [input, setInput] = useState(initialMessage);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // <-- add loading state

  useEffect(() => {
    const stored = sessionStorage.getItem("initialMessage") || "";
    if (stored) {
      setInput(stored);
      sessionStorage.removeItem("initialMessage");

      // Delay to ensure input state is updated before sending
      setTimeout(() => {
        handleSend(stored);
      }, 100);
    }
  }, []);

  const handleSend = async (overrideInput) => {
    const messageToSend = overrideInput ?? input;
    if (!messageToSend.trim()) return;

    const userMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://intel-hackathon.onrender.com/api/Intellect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();
      const reply = data.reply || "No response";

      const botMessage = { role: "bot", content: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error reaching backend API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intellect-box" style={{ height: "75vh" }}>
      <div className="container h-100 d-flex flex-column">
        <h1 className="text-center mt-5 mb-4">Chat with Intellect AI</h1>

        <div className="flex-grow-1 overflow-auto mb-3 p-3 bg-light rounded">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded ${
                msg.role === "user"
                  ? " text-black text-end"
                  : " text-black text-start"
              }`}
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-1">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="fw-bold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="fst-italic">{children}</em>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => <ul className="ps-3">{children}</ul>,
                  li: ({ children }) => <li>{children}</li>,
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}

          {/* Loader dots */}
          {loading && (
            <div className="loader-dots text-start mb-2 p-2">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          )}
        </div>

        <div className="chat-input d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Enter Msg"
          />
          <button className="btn btn-primary" onClick={handleSend}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intellect;
