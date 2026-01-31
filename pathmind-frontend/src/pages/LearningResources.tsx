import React, { useEffect, useState } from "react";

interface Resource {
  id: number;
  title: string;
  type: string;
  provider: string;
  link: string;
  duration: string;
  category?: string;
}

const LearningResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchPersonalizedResources = async () => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      // Fetch AI analysis first
      const analysisRes = await fetch(`http://127.0.0.1:5000/api/analysis/run-latest/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      let analysis = null;
      if (analysisRes.ok) {
        analysis = await analysisRes.json();
      }

      const weakCategories = analysis?.weaknesses || [];

      const url =
        weakCategories.length > 0
          ? `http://127.0.0.1:5000/api/resources?` +
            weakCategories.map(c =>  `categories=${encodeURIComponent(c)}`).join("&")
          : "http://127.0.0.1:5000/api/resources";

      const res = await fetch(url);
      const resourcesData = await res.json();

      setResources(resourcesData);
    
    } catch (err) {
      console.error(err);
      setError("Failed to load personalized resources");
    } finally {
      setLoading(false);
    }
  };

  fetchPersonalizedResources();
}, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading learning resources...
        </p>
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
        <h1 className="text-4xl font-bold text-gray-900">Learning Resources</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Curated courses, certifications, and materials to help you build the
          skills needed for your chosen path.
        </p>
      </section>

      {/* Resource Cards */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resources.map((resource, idx) => (
          <a
            key={idx}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition flex flex-col justify-between space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {resource.type} | {resource.provider}
              </p>
            </div>
            <span className="text-sm text-gray-400">
              {resource.duration}
              {resource.category && ` • ${resource.category}`}
            </span>
          </a>
        ))}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 text-center shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Boost Your Skills Today
        </h2>
        <p className="mb-6">
          Pick a course or certification and start building the skills that will
          take you closer to your dream career.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
          Explore All Resources
        </button>
      </section>
    </main>
  );
};

export default LearningResources;
