import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import CardDashboard from "../../components/common/card/CardDashboard";
import CardDashboardSkeleton from "../../components/common/card/CardDashboardSkeleton";
import BarSkeleton from "../../components/common/skeleton/BarSkeleton";
import LineChart from "../../components/common/chart/LineChart";
import CircularProgressBar from "../../components/common/progressbar/CircularProgressBar";
import { HiMiniUsers } from "react-icons/hi2";

const DashboardDivision = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();
  const chartData = [1, 2, 3, 5];
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    const fetchPurposes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/purposes?limit=${total}`
        );
        setData(response.data.result);
        setTotal(response.data.total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPurposes();
  }, [total]);

  return (
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
                    <div className="text-red-600">
                      <HiMiniUsers size={70} />
                    </div>
                  </>
                }
                data={`7/14`}
                title="Jumlah Kunjungan Hari Ini"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <HiMiniUsers size={70} />
                    </div>
                  </>
                }
                data={`7/14`}
                title="Jumlah Kunjungan Belum Selesai Proses"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <HiMiniUsers size={70} />
                    </div>
                  </>
                }
                data={`7/14`}
                title="Jumlah Kunjungan Selesai Proses"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <HiMiniUsers size={70} />
                    </div>
                  </>
                }
                data={`7/14`}
                title="Jumlah Kunjungan Batal Proses"
              />
            </>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-bold">Maksud Tujuan</h3>
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
              {data.map((item) => (
                <CardDashboard
                  key={item.uuid}
                  child={
                    <>
                      <CircularProgressBar percentage={50} />
                    </>
                  }
                  data={`7/14`}
                  title={item.name}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <BarSkeleton count={10} />
    </DefaultLayout>
  );
};

export default DashboardDivision;
