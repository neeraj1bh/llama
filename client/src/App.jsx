import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function ChatMessage({ message, type }) {
  return (
    <div
      className={`flex w-full ${
        type === "sent" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`${
          type === "sent"
            ? "bg-violet-400  text-white rounded-tl-lg"
            : "bg-white text-black rounded-tr-lg"
        } p-2 rounded-b-lg `}
      >
        {message}
      </div>
    </div>
  );
}

function App() {
  const [socket, setSocket] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", message },
      ]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "sent", message: inputMessage },
    ]);
    socket.emit("message", inputMessage);
  };

  return (
    <div className="p-5 h-screen bg-black">
      <div className="container mx-auto bg-gray-900 h-full flex flex-col">
        <div className="flex-1 flex flex-row items-end p-3">
          <div className="w-full">
            <ChatMessage message="Hello how are you?" type="sent" />
            <ChatMessage message="Hello how are you?" type="received" />
            <ChatMessage message="Hello how are you?" type="sent" />
          </div>
        </div>
        <div className="h-[100px] bg-gray-700 flex justify-center items-center p-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="w-full bg-transparent text-white p-2 rounded-md border-2 border-white focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />
          <button
            onClick={sendMessage}
            className="bg-violet-600 text-white px-3 py-2 rounded-md ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
