import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

interface Message {
  from: "user" | "ai";
  text: string;
}

const CareerChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const userInput = input;
    setInput("");

    const res = await axios.post("http://localhost:8000/chat", {
      message: userInput,
    });

    const aiMsg: Message = { from: "ai", text: res.data.reply };
    setMessages((prev) => [...prev, aiMsg]);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Career Mentor AI</h1>
        <p className="text-lg text-gray-600">
          Chat with an AI expert to get career guidance, roadmaps, and skill improvement tips.
        </p>
      </section>

      {/* Chat Box */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-xs p-3 rounded-xl ${
                m.from === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {m.text}
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>

        <div className="flex mt-4 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 border p-3 rounded-xl"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </section>
    </main>
  );
};

export default CareerChat;
