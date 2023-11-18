import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import CardDashboard from "../../components/common/card/CardDashboard";
import CardDashboardSkeleton from "../../components/common/card/CardDashboardSkeleton";
import BarSkeleton from "../../components/common/skeleton/BarSkeleton";
import LineChart from "../../components/common/chart/LineChart";
import CircularProgressBar from "../../components/common/progressbar/CircularProgressBar";

const Dashboard = () => {
  const [data, setData] = useState([1]);
  const dispatch = useDispatch();
  const chartData = [1, 2, 3, 5];
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <>
      <DefaultLayout>
        <div className="items-center px-4 py-8 m-auto">
          <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
            {data.length === 0 ? (
              <>
                <CardDashboardSkeleton />
                <CardDashboardSkeleton />
                <CardDashboardSkeleton />
                <CardDashboardSkeleton />
              </>
            ) : (
              <>
                <CardDashboard
                  child={
                    <>
                      <CircularProgressBar percentage={50} />
                    </>
                  }
                  data={`7/14`}
                  title="SPPG"
                />
                <CardDashboard
                  child={
                    <>
                      <CircularProgressBar percentage={50} />
                    </>
                  }
                  data={`7/14`}
                  title="SADP"
                />
                <CardDashboard
                  child={
                    <>
                      <CircularProgressBar percentage={50} />
                    </>
                  }
                  data={`7/14`}
                  title="Kunjungan Sekolah per Bulan"
                />
                <CardDashboard
                  child={
                    <>
                      <span className="items-center px-6 py-6 m-auto rounded-full bg-primary-200 hover:bg-primary-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 m-auto text-primary-500 hover:text-primary-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </span>
                    </>
                  }
                  data={`100`}
                  title="Laporan Harian"
                />
              </>
            )}
          </div>
        </div>

        {data.length === 0 ? (
          <>
            <BarSkeleton count={15} />
          </>
        ) : (
          <>
            <div className="grid grid-cols-3">
              <div>
                <LineChart data={chartData} />
              </div>
              <div>
                <LineChart data={chartData} />
              </div>
              <div>
                <LineChart data={chartData} />
              </div>
            </div>
          </>
        )}

        <BarSkeleton count={10} />
      </DefaultLayout>
    </>
  );
};

export default Dashboard;
