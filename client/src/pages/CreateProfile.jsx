// src/pages/CreateProfile.jsx
import { useState } from "react";
import { createProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [form, setForm] = useState({ name: "", serviceType: "", area: "", whatsapp: "" ,photo: ""});
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setPhotoFile(e.target.files[0]);
  }
  
  async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("serviceType", form.serviceType);
  formData.append("area", form.area);
  formData.append("whatsapp", form.whatsapp);
  formData.append("photo", photoFile); // photoFile comes from handleFileChange

  const res = await fetch("http://localhost:5000/api/proprofiles", { // adjust route
    method: "POST",
    body: formData,
  });

  const newProfile = await res.json();
  navigate(`/u/${newProfile._id}`);
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
