import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./Intellect.css";

function Intellect() {
  const location = useLocation();
  const initialMessage = location.state?.message || "";

  const [input, setInput] = useState(initialMessage);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("initialMessage");
    if (stored) {
      setInput(stored);
      sessionStorage.removeItem("initialMessage");

      setTimeout(() => {
        handleSend(stored);
      }, 100);
    } else if (initialMessage) {
      handleSend(initialMessage);
    }
  }, []);

  const handleSend = async (overrideInput) => {
    const messageToSend = overrideInput ?? input.trim();
    if (!messageToSend) return;

    const userMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://backend-zh6t.onrender.com/api/intellect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();
      const reply = data.reply || "No response received.";
      const botMessage = { role: "bot", content: reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Could not reach the backend." },
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
              className={`mb-3 p-2 rounded ${
                msg.role === "user"
                  ? "text-end bg-white border"
                  : "text-start bg-secondary bg-opacity-10"
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
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intellect;
