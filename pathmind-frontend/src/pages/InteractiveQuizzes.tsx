import React from "react";
import { Brain, Gamepad2, BarChart3 } from "lucide-react";

const InteractiveQuizzes: React.FC = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Interactive Quizzes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Engaging assessments that adapt to your responses, making the discovery 
          process both fun and insightful. Test your skills, track your progress, 
          and get smarter with every attempt.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          Start Your First Quiz
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
          <p className="text-gray-600">
            Our AI tailors questions to your performance, ensuring every quiz 
            is personalized and growth-focused.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <Gamepad2 className="h-10 w-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Fun & Engaging</h3>
          <p className="text-gray-600">
            Gamified interactions keep you motivated while making learning 
            enjoyable and stress-free.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <BarChart3 className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Monitor your improvement over time with insightful stats, 
            helping you identify strengths and areas to work on.
          </p>
        </div>
      </section>

      {/* Quiz Categories Preview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Explore Quiz Categories
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Logic Puzzles", "Math Skills", "Memory Challenges", "Data Interpretation", "Language", "General Knowledge"].map((category, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition cursor-pointer text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Sharpen your {category.toLowerCase()} with fun interactive tests.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 text-center shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Challenge Yourself?</h2>
        <p className="mb-6">
          Take your first step toward smarter learning with our interactive quizzes.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
          Start Quiz Now
        </button>
      </section>
    </main>
  );
};

export default InteractiveQuizzes;
