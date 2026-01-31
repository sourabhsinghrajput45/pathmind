import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile, getUserFromStorage } from "../../api/user";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const storageUser = getUserFromStorage();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storageUser || !storageUser.id) {
      navigate("/login");
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const p = await fetchProfile(storageUser.id);
        setProfile(p);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!profile) return null;

  const initials = profile.name
    ? profile.name.split(" ").map((n: string) => n[0]).slice(0,2).join("").toUpperCase()
    : "U";

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name || "Unnamed User"}</h2>
            <p className="text-gray-500">{profile.email}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/editprofile")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/quiz")}
                className="bg-white border border-gray-200 px-4 py-2 rounded-xl"
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Profile details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-gray-600 font-semibold">About</h3>
            <p><strong>Primary interest:</strong> {profile.primary_interest || "Not set"}</p>
            <p><strong>Secondary interests:</strong> {(profile.secondary_interests || []).join(", ") || "Not set"}</p>
            <p><strong>Short-term goal:</strong> {profile.short_term_goal || "Not set"}</p>
            <p><strong>Long-term goal:</strong> {profile.long_term_goal || "Not set"}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-gray-600 font-semibold">Education & Experience</h3>
            <p><strong>Education:</strong> {profile.education_level || "Not set"}</p>
            <p><strong>Field:</strong> {profile.field_of_study || "Not set"}</p>
            <p><strong>Graduation Year:</strong> {profile.graduation_year || "Not set"}</p>
            <p><strong>Experience:</strong> {profile.experience || "Not set"}</p>
            <p><strong>Projects:</strong> {(profile.projects || []).join(", ") || "Not set"}</p>
          </div>

          <div className="col-span-full mt-4 bg-gray-50 rounded-xl p-4">
            <h3 className="text-gray-700 font-semibold">Strengths</h3>
            <p>{(profile.strengths || []).join(", ") || "Not set"}</p>

            <h3 className="text-gray-700 font-semibold mt-3">Weaknesses</h3>
            <p>{(profile.weaknesses || []).join(", ") || "Not set"}</p>
          </div>

          <div className="col-span-full mt-2">
            <h3 className="text-gray-700 font-semibold">AI / Progress</h3>
            <p><strong>Last Score:</strong> {profile.last_score ?? "—"}</p>
            <p><strong>Last Percentile:</strong> {profile.last_rank_percentile ?? "—"}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
