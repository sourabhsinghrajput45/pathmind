import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AnalysisResult {
  recommended_field: string;
  strong_skills: string[];
  top_roles: string[];
  improvement_plan: string[];
}

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");

  // Upload Resume Function
  const uploadResume = async () => {
    if (!file) return alert("Please upload a PDF first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/analyze-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);

      // Inject system resume summary into chat
      setMessages([
        {
          sender: "ai",
          text: "Your resume analysis is ready! You can now chat with me about your strengths, career options, and next steps. How can I help you?",
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume.");
    }

    setLoading(false);
  };

  // Chat Message Sending
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: userMessage,
      });

      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I couldn't process your request." },
      ]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-12 relative">
        {/* Page Heading */}
        <section className="text-center space-y-6">
          <div className="inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume Analyzer
            </h1>
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mt-2"></div>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Upload your resume to get personalized AI-powered insights and career guidance.
          </p>
        </section>

        {/* Upload Box */}
        <section className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-12 text-center border border-white/50 hover:shadow-3xl transition-all duration-300">
          <div className="border-3 border-dashed border-purple-400 p-12 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform hover:rotate-6 transition-transform">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Resume</h3>
              <p className="text-gray-600">PDF format only</p>
            </div>
            
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border-2 border-purple-300 p-4 rounded-xl w-full mb-6 cursor-pointer bg-white hover:border-purple-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer file:hover:bg-purple-700"
            />

            {file && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
                ✓ {file.name}
              </div>
            )}

            <button
              onClick={uploadResume}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : "✨ Analyze Resume"}
            </button>
          </div>
        </section>

        {/* AI Results */}
        {result && (
          <section className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-12 space-y-8 border border-white/50 animate-fadeIn">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your AI-Powered Career Insights
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-xl font-bold text-blue-900">Recommended Field</h3>
                </div>
                <p className="text-gray-800 text-lg font-medium">{result.recommended_field}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">💪</span>
                  <h3 className="text-xl font-bold text-purple-900">Strong Skills</h3>
                </div>
                <p className="text-gray-800 text-lg font-medium">{result.strong_skills.join(", ")}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-600 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🚀</span>
                  <h3 className="text-xl font-bold text-green-900">Suggested Roles</h3>
                </div>
                <p className="text-gray-800 text-lg font-medium">{result.top_roles.join(", ")}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">📈</span>
                  <h3 className="text-xl font-bold text-orange-900">Improvement Roadmap</h3>
                </div>
                <ul className="space-y-2 text-gray-800">
                  {result.improvement_plan.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-0.5">•</span>
                      <span className="font-medium">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Floating Chat Button */}
        {result && (
          <>
            {/* Chat Toggle Button - Enhanced with Pulse Animation */}
            {!chatOpen && (
              <button
                onClick={() => setChatOpen(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-7 rounded-full shadow-2xl hover:scale-110 transition-all transform z-50 animate-bounce-slow group"
              >
                <MessageCircle className="h-10 w-10" />
                
                {/* Notification Badge */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center animate-pulse border-4 border-white">
                  AI
                </span>
                
                {/* Ripple Effect */}
                <span className="absolute inset-0 rounded-full bg-purple-400 opacity-75 animate-ping"></span>
                
                {/* Tooltip */}
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-5 py-3 rounded-xl text-base font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                  💬 Chat with AI Assistant
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-900"></span>
                </span>
              </button>
            )}

            {/* Chat Window - Expanded and More Prominent */}
            {chatOpen && (
              <div className="fixed inset-4 md:inset-8 lg:right-8 lg:left-auto lg:w-[600px] bg-white rounded-3xl shadow-2xl border-2 border-purple-200 z-50 flex flex-col overflow-hidden animate-slideIn">
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                      <MessageCircle className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">AI Career Assistant</h3>
                      <p className="text-sm text-white/90 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Online & Ready to Help
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setChatOpen(false)}
                    className="hover:bg-white/20 p-3 rounded-full transition-colors"
                  >
                    <X className="h-7 w-7" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      <div
                        className={`p-5 rounded-2xl max-w-[80%] shadow-lg ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 border-2 border-gray-200 rounded-bl-sm"
                        }`}
                      >
                        <div className="text-sm leading-relaxed prose prose-sm max-w-none">
  <ReactMarkdown>{msg.text}</ReactMarkdown>
</div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-5 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center gap-4 shadow-lg">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your question here..."
                    className="flex-1 border-2 border-purple-300 rounded-xl px-5 py-4 text-base focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </main>
  );
};

export default ResumeAnalyzer;