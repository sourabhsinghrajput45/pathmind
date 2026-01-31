import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, MessageCircle, Map, BookOpen, BarChart3, Users } from 'lucide-react';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your skills, interests, and personality to provide personalized career recommendations.",
      color: "from-blue-500 to-blue-600",
      path: "/ai-analysis",
    },

    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Curated courses, certifications, and materials to help you build the skills needed for your chosen path.",
      color: "from-orange-500 to-orange-600",
      path: "/learning-resources",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Connect with industry professionals and mentors who can provide personalized advice and insights.",
      color: "from-pink-500 to-pink-600",
      path: "/expert-guidance",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              Career Discovery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge AI with proven career guidance methodologies 
            to help students make informed decisions about their future.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className="group cursor-pointer bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Start With The Quiz
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
