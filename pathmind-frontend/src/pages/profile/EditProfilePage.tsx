import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile, updateProfile, getUserFromStorage } from "../../api/user";

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const storageUser = getUserFromStorage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({
    name: "",
    age: "",
    gender: "",
    primary_interest: "",
    secondary_interests: [],
    short_term_goal: "",
    long_term_goal: "",
    strengths: [],
    weaknesses: [],
    education_level: "",
    field_of_study: "",
    graduation_year: "",
    experience: "",
    projects: [],
  });
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
        setForm({
          ...form,
          name: p.name || "",
          age: p.age || "",
          gender: p.gender || "",
          primary_interest: p.primary_interest || "",
          secondary_interests: p.secondary_interests || [],
          short_term_goal: p.short_term_goal || "",
          long_term_goal: p.long_term_goal || "",
          strengths: p.strengths || [],
          weaknesses: p.weaknesses || [],
          education_level: p.education_level || "",
          field_of_study: p.field_of_study || "",
          graduation_year: p.graduation_year || "",
          experience: p.experience || "",
          projects: p.projects || [],
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const setField = (k: string, v: any) => setForm((s: any) => ({ ...s, [k]: v }));

  const toggleArrayValue = (key: string, value: string) => {
    const arr = new Set(form[key] || []);
    if (arr.has(value)) arr.delete(value);
    else arr.add(value);
    setField(key, Array.from(arr));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Prepare payload (only fields you want to update)
      const payload: any = {
  name: form.name || undefined,
  age: form.age ? Number(form.age) : undefined,
  gender: form.gender || undefined,

  primary_interest: form.primary_interest || undefined,
  secondary_interests: form.secondary_interests || [],

  short_term_goal: form.short_term_goal || undefined,
  long_term_goal: form.long_term_goal || undefined,

  strengths: form.strengths || [],
  weaknesses: form.weaknesses || [],

  education_level: form.education_level || undefined,
  field_of_study: form.field_of_study || undefined,

  graduation_year: form.graduation_year ? Number(form.graduation_year) : undefined,

  experience: form.experience || undefined,
  projects: form.projects || []
};

      // remove undefined keys
      Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);

      await updateProfile(storageUser.id, payload);
      // update localStorage user name (so header shows name)
      const stored = JSON.parse(localStorage.getItem("user") || "null") || {};
      stored.name = payload.name ?? stored.name;
      localStorage.setItem("user", JSON.stringify(stored));

      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Edit Profile (optional)</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input value={form.name} onChange={e => setField("name", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input value={form.age} onChange={e => setField("age", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <input value={form.gender} onChange={e => setField("gender", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Primary interest</label>
            <input value={form.primary_interest} onChange={e => setField("primary_interest", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short-term goal</label>
            <input value={form.short_term_goal} onChange={e => setField("short_term_goal", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Long-term goal</label>
            <input value={form.long_term_goal} onChange={e => setField("long_term_goal", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Strengths (comma separated)</label>
            <input
              value={(form.strengths || []).join(", ")}
              onChange={e => setField("strengths", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
              className="mt-1 block w-full rounded-xl border-gray-200 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weaknesses (comma separated)</label>
            <input
              value={(form.weaknesses || []).join(", ")}
              onChange={e => setField("weaknesses", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
              className="mt-1 block w-full rounded-xl border-gray-200 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Education level</label>
            <input value={form.education_level} onChange={e => setField("education_level", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Field of study</label>
            <input value={form.field_of_study} onChange={e => setField("field_of_study", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience (short)</label>
            <textarea value={form.experience} onChange={e => setField("experience", e.target.value)} className="mt-1 block w-full rounded-xl border-gray-200 p-2" />
          </div>

          <div className="flex gap-3">
            <button disabled={saving} type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl">
              {saving ? "Saving..." : "Save Profile"}
            </button>
            <button type="button" onClick={() => navigate("/profile")} className="bg-white border border-gray-200 px-6 py-2 rounded-xl">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
