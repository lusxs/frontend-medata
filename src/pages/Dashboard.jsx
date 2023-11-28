import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import DashboardAdmin from "./admin/DashboardAdmin";
import DashboardDivision from "./division/DashboardDivision";
import DashboardSecretary from "./secretary/DashboardSecretary";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
  const { isError, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return <DashboardAdmin />;
      case "division":
        return <DashboardDivision />;
      case "secretary":
        return <DashboardSecretary />;
      default:
        return null;
    }
  };

  return <>{renderDashboard()}</>;
};

export default Dashboard;
