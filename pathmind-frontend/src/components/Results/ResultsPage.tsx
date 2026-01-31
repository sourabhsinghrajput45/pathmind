import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, TrendingUp, DollarSign, Clock, BookOpen, MapPin, ChevronRight } from 'lucide-react';
import { QuizAnswer, CareerRecommendation } from '../../types';
import { careerRecommendations } from '../../data/careerData';

interface ResultsPageProps {
  answers: QuizAnswer[];
  onViewRoadmap: (careerId: string) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ answers, onViewRoadmap }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const navigate = useNavigate();

  // Simple matching algorithm based on answers
  const getRecommendations = (): CareerRecommendation[] => {
    // In a real app, this would use AI/ML algorithms
    // For demo, we'll return sorted recommendations with slight randomization
    return careerRecommendations
      .map(career => ({
        ...career,
        matchPercentage: Math.max(60, career.matchPercentage + Math.random() * 10 - 5)
      }))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const recommendations = getRecommendations();
  const topRecommendation = recommendations[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Career
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              Recommendations
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your quiz responses, we've identified the best career paths that match your 
            interests, skills, and values.
          </p>
        </motion.div>

        {/* Top Recommendation Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white mb-12"
        >
          <div className="flex items-center mb-4">
            <Star className="h-8 w-8 text-yellow-300 mr-3" />
            <span className="text-2xl font-bold">Top Match</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{topRecommendation.title}</h2>
              <p className="text-blue-100 mb-6 text-lg">{topRecommendation.description}</p>
              <div className="flex items-center mb-4">
                <div className="bg-white/20 rounded-full px-4 py-2 mr-4">
                  <span className="text-2xl font-bold">{Math.round(topRecommendation.matchPercentage)}%</span>
                  <span className="text-sm ml-1">Match</span>
                </div>
                <div className="text-blue-100">
                  <div className="flex items-center mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-sm">{topRecommendation.averageSalary}</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">{topRecommendation.growthRate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => onViewRoadmap(topRecommendation.id)}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Career Roadmap
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="ml-4 bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </motion.div>

        {/* All Recommendations */}
        <div className="grid gap-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">All Career Matches</h2>
          {recommendations.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">{career.title}</h3>
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round(career.matchPercentage)}% Match
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{career.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCareer(selectedCareer?.id === career.id ? null : career)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    {selectedCareer?.id === career.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Salary Range</div>
                    <div className="font-semibold text-gray-900">{career.averageSalary}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Growth Rate</div>
                    <div className="font-semibold text-gray-900">{career.growthRate}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <BookOpen className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Education</div>
                    <div className="font-semibold text-gray-900">Bachelor's</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <MapPin className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Outlook</div>
                    <div className="font-semibold text-gray-900">Excellent</div>
                  </div>
                </div>

                {/* Detailed Information */}
                {selectedCareer?.id === career.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 pt-6"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {career.requiredSkills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Work Environment</h4>
                        <p className="text-gray-600 mb-4">{career.workEnvironment}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Education Requirements</h4>
                        <p className="text-gray-600 mb-4">{career.educationLevel}</p>
                        <h4 className="font-semibold text-gray-900 mb-2">Job Outlook</h4>
                        <p className="text-gray-600 mb-6">{career.jobOutlook}</p>
                        <button
                          onClick={() => onViewRoadmap(career.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center"
                        >
                          View Career Roadmap
                          <ChevronRight className="h-5 w-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;