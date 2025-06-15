import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();

  return <h1 className="text-center p-4 text-2xl font-semibold">Profile of {username}</h1>;
}
