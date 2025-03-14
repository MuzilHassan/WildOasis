import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isPending, data } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.user?.role != "authenticated" && !isPending) navigate("/login");
  }, [data?.user?.role, isPending, navigate]);

  if (isPending) return <Spinner />;
  return children;
}

export default ProtectedRoute;
