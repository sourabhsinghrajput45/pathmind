// src/api/user.ts
export const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const fetchProfile = async (userId: number) => {
  const res = await fetch(`http://127.0.0.1:5000/api/user/me?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const updateProfile = async (userId: number, payload: any) => {
  const res = await fetch(`http://127.0.0.1:5000/api/user/update?userId=${userId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(()=>({detail:'Update failed'}));
    throw new Error(errBody.detail || 'Failed to update profile');
  }
  return res.json();
};
