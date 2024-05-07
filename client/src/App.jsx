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
  return (
    <div className="p-5 h-screen bg-black">
      <div className="container mx-auto bg-gray-900 h-full flex flex-col">
        <div className="flex-1 flex flex-row items-end p-3">
          <div className="w-full">
            <ChatMessage message="Hello how are you?" type="sent" />
            <ChatMessage message="Hello how are you?" type="receive" />
            <ChatMessage message="Hello how are you?" type="sent" />
          </div>
        </div>
        <div className="h-[100px] bg-gray-700 flex justify-center items-center p-3">
          <input
            type="text"
            className="w-full bg-transparent text-white p-2 rounded-md border-2 border-white focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />
          <button className="bg-violet-600 text-white px-3 py-2 rounded-md ml-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
