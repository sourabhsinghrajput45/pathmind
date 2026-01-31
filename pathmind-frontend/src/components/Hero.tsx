import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, FileText, MessageCircle } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-16 pb-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-green-200/30 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-gray-200 mb-8">
            <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              AI-Powered Career Guidance
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent block mt-2">
              Perfect Career Path
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose your path: take our AI-driven career quiz, or upload your resume 
            to receive an in-depth analysis and start a personalized AI career chat.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => navigate('/quiz')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center group"
            >
              Start Career Quiz
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/resume-analyzer')}
              className="bg-white text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg"
            >
              Upload Resume
            </button>
          </div>

          {/* Action Cards (Replacing Stats) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Card 1: Quiz */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => navigate('/quiz')}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                AI Career Quiz
              </h3>
              <p className="text-gray-600 font-medium">
                Get personalized job recommendations, skill insights, and 
                roadmap suggestions based on your quiz responses.
              </p>
            </div>

            {/* Card 2: Resume + Chat */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => navigate('/resume-analyzer')}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Resume Analysis + AI Chat
              </h3>
              <p className="text-gray-600 font-medium">
                Upload your resume to receive an AI-powered breakdown. 
                Then chat with an intelligent career assistant that knows your strengths.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
