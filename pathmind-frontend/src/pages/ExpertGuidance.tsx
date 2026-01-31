import React, { useEffect, useState } from "react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  profileLink: string;
  avatar: string;
}

const ExpertGuidance: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/mentors");
        if (!response.ok) {
          throw new Error(`Error fetching mentors: ${response.statusText}`);
        }
        const data = await response.json();
        setMentors(data);
      } catch (err: any) {
        setError("Failed to load mentor data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Loading mentors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center">
        <div>
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Page Heading */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Expert Guidance</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with industry professionals and mentors who can provide personalized advice and insights.
        </p>
      </section>

      {/* Mentor Cards */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mentors.map((mentor, idx) => (
          <a
            key={idx}
            href={mentor.profileLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition flex flex-col items-center space-y-4"
          >
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">{mentor.name}</h3>
              <p className="text-sm text-gray-500">
                {mentor.role} at {mentor.company}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Expertise: {mentor.expertise?.join(", ")}
              </p>
            </div>
          </a>
        ))}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 text-center shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Find Your Mentor</h2>
        <p className="mb-6">
          Get personalized guidance, accelerate your learning, and connect with experts who can help you achieve your career goals.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
          Connect Now
        </button>
      </section>
    </main>
  );
};

export default ExpertGuidance;
