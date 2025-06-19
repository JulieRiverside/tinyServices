import { useState } from "react";
import { createProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const [form, setForm] = useState({ name:'', serviceType:'', area:'', whatsapp:'', photo:null });
  const navigate = useNavigate();

  const handleFile = (e) => setForm((prev) => ({...prev, photo: e.target.files[0]}));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('serviceType', form.serviceType);
    formData.append('area', form.area);
    formData.append('whatsapp', form.whatsapp);
    if (form.photo) formData.append('photo', form.photo);
  
    await createProfile(formData);
    navigate('/'); // back to home
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        onChange={(e) => setForm((prev) => ({...prev, name: e.target.value}))} 
      />
      <input 
        type="text" 
        placeholder="Service Type" 
        onChange={(e) => setForm((prev) => ({...prev, serviceType: e.target.value}))} 
      />
      <input 
        type="text" 
        placeholder="Area" 
        onChange={(e) => setForm((prev) => ({...prev, area: e.target.value}))} 
      />
      <input 
        type="tel" 
        placeholder="Whatsapp Number" 
        onChange={(e) => setForm((prev) => ({...prev, whatsapp: e.target.value}))} 
      />
      <input 
        type="file" 
        onChange={handleFile} 
      />
      <button>Save</button>
    </form>
  )
}

export default CreateProfile;
