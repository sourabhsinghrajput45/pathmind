import React, { useState } from "react";

interface Milestone {
  title: string;
  description: string;
  duration: string;
}

interface CareerRoadmap {
  careerName: string;
  milestones: Milestone[];
}

const mockRoadmap: CareerRoadmap = {
  careerName: "Software Engineer",
  milestones: [
    {
      title: "Learn Programming Fundamentals",
      description: "Master core languages such as Python, JavaScript, or Java.",
      duration: "1-2 months",
    },
    {
      title: "Build Projects",
      description: "Create small projects to apply your knowledge and build a portfolio.",
      duration: "2-3 months",
    },
    {
      title: "Data Structures & Algorithms",
      description: "Focus on problem-solving skills to ace technical interviews.",
      duration: "1-2 months",
    },
    {
      title: "Internship / Real-World Experience",
      description: "Gain practical experience through internships or freelancing.",
      duration: "3-6 months",
    },
    {
      title: "Apply for Jobs",
      description: "Prepare your resume, practice interviews, and start applying.",
      duration: "1-2 months",
    },
  ],
};

const CareerRoadmaps: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleMilestone = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Page Heading */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Career Roadmaps</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Step-by-step pathways with milestones, required skills, and timeline to reach your dream career.
        </p>
      </section>

      {/* Career Overview */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">{mockRoadmap.careerName}</h2>
        <div className="space-y-6">
          {mockRoadmap.milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`border-l-4 border-blue-600 pl-4 py-3 bg-gray-50 rounded-lg cursor-pointer transition hover:bg-gray-100`}
              onClick={() => toggleMilestone(idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{milestone.title}</h3>
                <span className="text-sm text-gray-500">{milestone.duration}</span>
              </div>
              {expandedIdx === idx && (
                <p className="text-gray-600 mt-2">{milestone.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${((expandedIdx ?? 0 + 1) / mockRoadmap.milestones.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-gray-600 mt-2 text-sm">
          {expandedIdx !== null
            ? `You are at: ${mockRoadmap.milestones[expandedIdx].title}`
            : "Click on a milestone to view details"}
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 text-center shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Journey</h2>
        <p className="mb-6">
          Follow the roadmap, achieve milestones, and take your first steps toward your dream career today.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
          Explore More Careers
        </button>
      </section>
    </main>
  );
};

export default CareerRoadmaps;
