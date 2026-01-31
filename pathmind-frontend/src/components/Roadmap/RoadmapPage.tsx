import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, ExternalLink, BookOpen, Play, Award, FileText } from 'lucide-react';
import { CareerRoadmap, RoadmapStep } from '../../types';
import { careerRoadmaps } from '../../data/careerData';

interface RoadmapPageProps {
  careerId: string;
  onBack: () => void;
}

const RoadmapPage: React.FC<RoadmapPageProps> = ({ careerId, onBack }) => {
  const [roadmap] = useState<CareerRoadmap | null>(
    careerRoadmaps.find(r => r.id === careerId) || careerRoadmaps[0]
  );
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'video': return Play;
      case 'certification': return Award;
      case 'book': return FileText;
      default: return BookOpen;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!roadmap) {
    return <div>Roadmap not found</div>;
  }

  const completionPercentage = (completedSteps.size / roadmap.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← Back to Results
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {roadmap.careerTitle}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                Career Roadmap
              </span>
            </h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Total Duration</div>
                <div className="font-semibold text-gray-900">{roadmap.totalDuration}</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Completed Steps</div>
                <div className="font-semibold text-gray-900">{completedSteps.size} of {roadmap.steps.length}</div>
              </div>
              <div className="text-center">
                <div className="h-8 w-8 mx-auto mb-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{Math.round(completionPercentage)}%</span>
                </div>
                <div className="text-sm text-gray-600">Progress</div>
                <div className="font-semibold text-gray-900">On Track</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Roadmap Steps */}
        <div className="space-y-8">
          {roadmap.steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            const StepIcon = isCompleted ? CheckCircle : Circle;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < roadmap.steps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-300"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Step Icon */}
                  <button
                    onClick={() => toggleStepCompletion(step.id)}
                    className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500'
                    }`}
                  >
                    <StepIcon className="h-6 w-6" />
                  </button>

                  {/* Step Content */}
                  <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                      <div>
                        <h3 className={`text-2xl font-bold mb-2 ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{step.timeframe}</span>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {isCompleted ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Learning Resources</h4>
                      <div className="grid gap-4">
                        {step.resources.map((resource) => {
                          const ResourceIcon = getResourceIcon(resource.type);
                          return (
                            <div
                              key={resource.id}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                  <ResourceIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900">{resource.title}</h5>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>{resource.provider}</span>
                                    <span>•</span>
                                    <span>{resource.duration}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(resource.level)}`}>
                                      {resource.level}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                                <span className="mr-1">View</span>
                                <ExternalLink className="h-4 w-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-blue-100 mb-6">
            Follow this roadmap step by step and track your progress as you build the skills needed for your dream career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Download PDF Roadmap
            </button>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors">
              Get Personalized Mentoring
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapPage;