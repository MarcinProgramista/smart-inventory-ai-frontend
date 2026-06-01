/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Suppliers() {
  const { auth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  return <h1>{auth.name}</h1>;
}
