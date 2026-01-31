import React, { useEffect, useState } from "react";
import { BarChart2, Activity, CheckCircle2 } from "lucide-react";

interface ProgressMetric {
  skill: string;
  progress: number;
}

const ProgressTracking: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🧠 For now, use test user ID 1 (from seed_db)
  const userId = 1;

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/progress/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch progress data: ${response.statusText}`);
        }
        const data = await response.json();
        setProgressData(data);
      } catch (err: any) {
        console.error("Error loading progress:", err);
        setError("Unable to load progress data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Loading your progress...</p>
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
        <h1 className="text-4xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Monitor your journey with detailed analytics and insights into your skill
          development and goal achievement.
        </p>
      </section>

      {/* Progress Metrics */}
      <section className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-blue-600">Your Skills</h2>
        <div className="space-y-4">
          {progressData.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{metric.skill}</span>
                <span className="text-sm text-gray-500">{metric.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-blue-600">Achievements</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-lg transition">
            <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" />
            <p className="text-gray-700 font-medium text-center">Completed 5 Quizzes</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-lg transition">
            <Activity className="h-10 w-10 text-purple-600 mb-2" />
            <p className="text-gray-700 font-medium text-center">Maintained 7-Day Streak</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-lg transition">
            <BarChart2 className="h-10 w-10 text-blue-600 mb-2" />
            <p className="text-gray-700 font-medium text-center">
              Skill Progress Above 50%
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 text-center shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Keep Moving Forward</h2>
        <p className="mb-6">
          Track your learning, stay motivated, and achieve your goals step by step.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
          Review Roadmaps
        </button>
      </section>
    </main>
  );
};

export default ProgressTracking;
