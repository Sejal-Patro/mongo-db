import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    const newMessage = {
      sender: "User1",
      content: message,
      timestamp: new Date(),
    };
    socket.emit("send_message", newMessage);
    setMessage("");
  };

  return (
    <div>
      <div>
        <h2>Chat Room</h2>
        <div>
          {messageList.map((msg, index) => (
            <div key={index}>
              <p>
                <strong>{msg.sender}</strong>: {msg.content} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
              </p>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
