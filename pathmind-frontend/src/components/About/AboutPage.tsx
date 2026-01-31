import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Target, Award, Heart, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'We leverage cutting-edge artificial intelligence to provide personalized career recommendations based on comprehensive analysis of your unique profile.'
    },
    {
      icon: Users,
      title: 'Student-Centric Approach',
      description: 'Every feature is designed with students in mind, ensuring an intuitive and engaging experience that makes career exploration enjoyable.'
    },
    {
      icon: Target,
      title: 'Precision Matching',
      description: 'Our advanced algorithms analyze multiple dimensions of your personality, skills, and interests to deliver highly accurate career matches.'
    },
    {
      icon: Award,
      title: 'Expert Validation',
      description: 'All career recommendations and roadmaps are validated by industry experts and career counselors to ensure accuracy and relevance.'
    }
  ];

  const team = [
    {
      name: 'Dr. Siddharth Deshmukh',
      role: 'Chief AI Officer',
      description: 'Former Google AI researcher with 10+ years in machine learning and career psychology.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sourabh Singh Rajput',
      role: 'Head of Career Services',
      description: 'Career counselor with 15+ years helping students discover their perfect career paths.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Siddharth Deshmukh',
      role: 'Lead UX Designer',
      description: 'Design expert focused on creating intuitive experiences for educational platforms.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sourabh Singh Rajput',
      role: 'Data Science Director',
      description: 'PhD in Statistics with expertise in predictive modeling and career outcome analysis.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" >
              About
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                PathMind
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to help every student discover their perfect career path through 
              the power of artificial intelligence and personalized guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl w-fit mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Every year, millions of students graduate without a clear direction for their careers. 
                We believe that with the right guidance and tools, every student can find a career 
                path that aligns with their passions, skills, and values.
              </p>
              <p className="text-lg text-gray-600">
                PathMind combines advanced AI technology with proven career counseling methodologies 
                to provide personalized, actionable career guidance that empowers students to make 
                informed decisions about their future.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8"
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-600">Students Helped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                  <div className="text-gray-600">Career Paths</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-gray-600">Partner Universities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we serve our students.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl w-fit mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of experts combines technology, psychology, and education 
              to create the best career guidance platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Lightbulb className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Discover Your Path?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have already found their perfect career match with PathMind.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Journey Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;