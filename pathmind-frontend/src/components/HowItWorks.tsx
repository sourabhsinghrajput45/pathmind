import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Brain, Map, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: ClipboardList,
      title: "Take Assessment",
      description: "Complete our comprehensive quiz covering your interests, skills, personality traits, and career preferences.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      step: "01"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI processes your responses, analyzing patterns and matching you with suitable career options.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      step: "02"
    },
    {
      icon: Map,
      title: "Get Roadmap",
      description: "Receive personalized career paths with detailed roadmaps, required skills, and learning resources.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      step: "03"
    },
    {
      icon: Rocket,
      title: "Start Journey",
      description: "Begin your career journey with confidence, guided by expert recommendations and continuous support.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How PathMind
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              Works for You
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process transforms your aspirations into actionable career plans, 
            powered by artificial intelligence and expert insights.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-orange-200 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-gray-200 mb-6 group-hover:border-blue-300 transition-colors shadow-lg">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {step.step}
                    </span>
                  </div>
                  
                  {/* Card */}
                  <div className={`${step.bgColor} rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group-hover:border-gray-300`}>
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Discover Your Path?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students who have already found their perfect career match with PathMind.
            </p>
            <button 
              onClick={() => navigate('/quiz')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Begin Assessment Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;