import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  if (!isError) {
    navigate("/login");
  }
  return (
    <>
      <Outlet />
    </>
  );
};
