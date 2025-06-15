// // src/pages/CreateProfile.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [form, setForm] = useState({ name: "", serviceType: "", area: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
  if (e.target.files && e.target.files.length > 0) {
    setPhotoFile(e.target.files[0]);
    console.log('File selected!', e.target.files[0]);
  }
}
  
  async function handleSubmit(e) {
  e.preventDefault();

  setLoading(true);
  setError(null);
  
  console.log('photoFile at submission?', photoFile);
  console.log('form fields?', form);
  
  try {
    let res;

    if (photoFile) {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("serviceType", form.serviceType);
      formData.append("area", form.area);
      formData.append("whatsapp", form.whatsapp);
      formData.append("photo", photoFile);
  
      res = await fetch("http://localhost:5000/api/profiles", { 
        method: "POST",
        body: formData,
      });

    } else {
      res = await fetch("http://localhost:5000/api/profiles", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    

    if (!res.ok) {
      const errorText = await res.text();
      console.log('Server responded with raw text:\n', errorText);
      throw new Error('Server Error');
    }
  
    const newProfile = await res.json();

    navigate(`/u/${newProfile._id}`);

  } catch (err) {
    setError(err?.message || "Submission failed.");
    console.error('Submission Error!', err);
  } finally {
    setLoading(false);
  }
}

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Profile</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
          name="photo"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />
        <button
          disabled={loading}
          type="submit"
          className="p-2 bg-blue-500 text-gray-50 font-semibold rounded"
        >
          {loading ? "Creating…" : "Submit"}
        </button>
      </form>
    </div>
  )
}
