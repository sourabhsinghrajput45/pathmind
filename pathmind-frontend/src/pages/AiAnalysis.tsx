import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryScore {
  category: string;
  value: number;
}

interface AiResult {
  user: string;
  score: number;
  rankPercentile: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  confidence: number;
  categoryScores: CategoryScore[];
}

export default function AiAnalysis() {
  const navigate = useNavigate();
  const [data, setData] = useState<AiResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [mentors, setMentors] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

const fetchResources = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/resources/");
    const data = await res.json();
    setResources(data);
  } catch (err) {
    console.error("Failed loading resources", err);
  }
};




const fetchMentors = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/mentors");
    const data = await res.json();
    setMentors(data);
  } catch (err) {
    console.error("Failed to fetch mentors", err);
  }
};





  const fetchAnalysis = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/analysis/run-latest/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Analysis failed");

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Please complete a quiz first.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }
    fetchAnalysis();
    fetchResources();
    fetchMentors();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-xl font-medium text-gray-700">Analyzing your performance...</p>
        </div>
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-2">No Analysis Available</p>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/quiz")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Take Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-600";
    if (score >= 60) return "from-blue-500 to-cyan-600";
    if (score >= 40) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };
  const recommendedMentors =
  data && data.weaknesses?.length > 0
    ? mentors.filter((m: any) =>
        m.expertise.some((exp: string) =>
          data.weaknesses
            .map((w) => w.toLowerCase())
            .includes(exp.toLowerCase())
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Analysis Results
          </h1>
          <p className="text-gray-600">Your personalized performance insights</p>
        </motion.div>

        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${getScoreColor(data.score)} opacity-5`} />
          <div className="relative p-8 text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${getScoreColor(data.score)} flex items-center justify-center shadow-2xl`}
              >
                <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {data.score}%
                  </span>
                  <span className="text-sm font-medium text-gray-600 mt-1">
                    {getScoreLabel(data.score)}
                  </span>
                </div>
              </motion.div>
            </div>
            
            {data.rankPercentile > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full"
              >
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  Top {data.rankPercentile}%
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category Performance */}
          {data.categoryScores?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-6 col-span-full"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Skill Performance</h2>
              </div>
              <div className="space-y-5">
                {data.categoryScores.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800">{c.category}</span>
                      <span className="text-lg font-bold text-gray-700">{c.value}%</span>
                    </div>
                    <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.value}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          c.value >= 70
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : c.value >= 50
                            ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                            : c.value >= 30
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : "bg-gradient-to-r from-red-400 to-pink-500"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Strengths */}
          {data.strengths?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-green-500"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Strengths</h2>
              </div>
              <ul className="space-y-3">
                {data.strengths.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <span>{s}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Weaknesses */}
          {data.weaknesses?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-red-500"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Areas to Improve</h2>
              </div>
              <ul className="space-y-3">
                {data.weaknesses.map((w, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span>{w}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        {data.careerPath && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.55 }}
    className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-indigo-600"
  >
    <h2 className="text-2xl font-bold text-indigo-700 mb-3">Career Path Suggestion </h2>
    <p className="text-gray-800 text-lg">
      You seem best suited for:
    </p>
    <p className="mt-3 text-xl font-bold text-indigo-600">
      {data.careerPath}
    </p>
    <p className="mt-4 text-gray-600 text-sm">
      Keep building the relevant skills — this path matches your strongest abilities.
    </p>
  </motion.div>
)}


        {/* Recommendations */}
        {data.recommendations?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">Recommendations</h2>
            </div>
            <ul className="space-y-4">
              {data.recommendations.map((rec, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-xl p-4"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="flex-1">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

<div className="bg-white p-6 rounded-2xl shadow-lg">
  <h2 className="text-purple-600 font-bold text-xl mb-3">
    Recommended Resources
  </h2>

  {data.weaknesses.length === 0 ? (
    <p className="text-gray-500">No recommendations needed — great job! 🎉</p>
  ) : (
    <ul className="space-y-4">
      {data.weaknesses.map((weak, i) => {
        const filtered = resources.filter(
          (res) =>
            res.category &&
            res.category.toLowerCase() === weak.toLowerCase()
        );
        return (
          <li key={i}>
            <h4 className="font-semibold text-gray-800 mb-1">📌 {weak}</h4>
            {filtered.length ? (
              <ul className="list-disc pl-5 space-y-1">
                {filtered.slice(0, 3).map((res) => (
                  <li
                    key={res.id}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => window.open(res.link, "_blank")}
                  >
                    {res.title} — {res.provider}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No direct resources available — coming soon!
              </p>
            )}
          </li>
        );
      })}
    </ul>
  )}
</div>

{recommendedMentors.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="bg-white rounded-3xl shadow-xl p-8"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
        <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 10l5 5 5-5m-7-5h4a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800">Mentors Who Can Help 🤝</h2>
    </div>

    <div className="grid sm:grid-cols-2 gap-6">
      {recommendedMentors.slice(0, 4).map((mentor: any) => (
        <motion.div
          key={mentor.id}
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl shadow-md cursor-pointer"
          onClick={() => window.open(mentor.profileLink, "_blank")}
        >
          <img
            src={mentor.avatar}
            className="w-14 h-14 rounded-full object-cover shadow"
            alt={mentor.name}
          />
          <div>
            <p className="font-semibold text-gray-800">{mentor.name}</p>
            <p className="text-sm text-gray-600">
              {mentor.role} @ {mentor.company}
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Expertise: {mentor.expertise.join(", ")}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="text-center mt-6">
      <button
        onClick={() => navigate("/expert-guidance")}
        className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:shadow-lg hover:bg-purple-700 transition"
      >
        View All Mentors
      </button>
    </div>
  </motion.div>
)}



        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center pt-4"
        >
          <button
            onClick={() => navigate("/quiz")}
            className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake Quiz
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-200" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}