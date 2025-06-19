//src/services/api.js
const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchProfiles(){
    const res = await fetch(`${API_BASE}/api/profiles`);
    if (!res.ok) throw new Error('Failed to fetch profiles');
    return res.json();
}

export async function fetchProfile(id){
    const res = await fetch(`${API_BASE}/api/profiles/${id}`);
    if (!res.ok) return null;
    return res.json();
}

export async function createProfile(data){
    const token = localStorage.getItem('token'); 
    const res = await fetch(`${API_BASE}/api/profiles`, {
        method:'POST',
        headers:{ Authorization:'Bearer ' + token },
        body:data
    });

    if (!res.ok) throw new Error(await res.text()); 
    return res.json();
}

export async function getMyProfile() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/api/profiles/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return null;
  return res.json();
}



export async function updateProfile(id, formData){
    const token = localStorage.getItem('token'); 
    const res = await fetch(`${API_BASE}/api/profiles/${id}`, {
        method:'PUT',
        headers:{ Authorization:'Bearer ' + token },
        body:formData
    });

    if (!res.ok) throw new Error(await res.text()); 
    return res.json();
}
