// src/services/api.js

const API_BASE = "http://localhost:5000/api";

// Get all profiles (with optional filter by area or service later if we need it)
export async function fetchProfiles(){
    const res = await fetch(`${API_BASE}/profiles`);
    if (!res.ok) {
        throw new Error('Failed to fetch profiles');
    }
    return res.json();
}

// Get a single profile by username
export async function fetchProfile(username){
    const res = await fetch(`${API_BASE}/profiles/${username}`);
    if (!res.ok) {
        throw new Error('Profile not found');
    }
    return res.json();
}

// Create a new profile
export async function createProfile(data){
    const res = await fetch(`${API_BASE}/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to create profile');
    }
    return res.json();
}
