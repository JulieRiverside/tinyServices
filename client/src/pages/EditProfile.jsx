// src/pages/EditProfile.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { fetchProfile, updateProfile } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { id } = useParams();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const data = await fetchProfile(id);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err);
        toast.error("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id]);

  useEffect(() => {
  if (profile) {
    const ownerId =
      typeof profile.owner === "object" ? profile.owner._id : profile.owner;

    if (currentUser?.id !== ownerId) {
      toast.error("Not authorized to edit this profile.");
      navigate("/explore");
    }
  }
}, [profile, currentUser]);



  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("area", profile.area);
    formData.append("serviceType", profile.serviceType);
    formData.append("whatsapp", profile.whatsapp);
    if (photoFile) {
      formData.append("photo", photoFile);
    }
    try {
      await updateProfile(id, formData);
      toast.success("Profile updated successfully!");
      navigate(`/profiles/${id}`);
    } catch (err) {
      toast.error(err?.message || "Failed to update profile.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error?.message || "Error loading profile"}</p>;
  if (!profile) return <p>Profile not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 block mb-2 w-full"
        />
        <input
          name="area"
          value={profile.area}
          onChange={handleChange}
          placeholder="Location"
          required
          className="border p-2 block mb-2 w-full"
        />
        <input
          name="serviceType"
          value={profile.serviceType}
          onChange={handleChange}
          placeholder="Service Type"
          required
          className="border p-2 block mb-2 w-full"
        />
        <input
          name="whatsapp"
          value={profile.whatsapp}
          onChange={handleChange}
          placeholder="Whatsapp Number"
          required
          className="border p-2 block mb-2 w-full"
        />
        <input
          name="photo"
          type="file"
          onChange={handleFileChange}
          className="border p-2 block mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-gray-100 p-2 mt-4"
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}

