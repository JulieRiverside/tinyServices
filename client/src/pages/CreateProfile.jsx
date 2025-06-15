// src/pages/CreateProfile.jsx
import { useState } from "react";
import { createProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [form, setForm] = useState({ name: "", serviceType: "", area: "", whatsapp: "" ,photo: ""});
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setForm({ ...form, photo: reader.result });
    };
    reader.readAsDataURL(file);
  }
  
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newProfile = await createProfile(form);
      navigate(`/u/${newProfile.username}`);
    } catch (err) {
      console.error(err);
      alert("Error creating profile.");
    }
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          required
          className="p-2 border rounded"
        />
        <input
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          placeholder="Service (e.g., plumber, mehendi)"
          required
          className="p-2 border rounded"
        />
        <input
          name="area"
          value={form.area}
          onChange={handleChange}
          placeholder="Your area or pincode"
          required
          className="p-2 border rounded"
        />
        <input
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="Your WhatsApp number"
          required
          className="p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-gray-50 font-semibold rounded"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
