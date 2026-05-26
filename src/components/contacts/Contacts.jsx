import useAuth from "../../hooks/useAuth";

export default function Contacts() {
  const { auth } = useAuth();
  console.log(auth);
  return <h1>{auth?.name || "No user"}</h1>;
}
