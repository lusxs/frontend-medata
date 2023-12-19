import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";
import CardDashboard from "../../components/common/card/CardDashboard";
import CardDashboardSkeleton from "../../components/common/card/CardDashboardSkeleton";
import DefaultLayout from "../../layout/DefaultLayout";
import { HiMiniUsers } from "react-icons/hi2";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFillExclamation } from "react-icons/bs";
import { BsPersonFillX } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { sumArray } from "../../utils/helper";

const DashboardAdmin = () => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countDataVisitorByStatus, setCountDataVisitorByStatus] = useState([]);
  const [countDataVisitorByPurpose, setCountDataVisitorByPurpose] = useState(
    []
  );
  const { isError, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const fetchCountDataVisitorByStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/division/count/data-visitor-status"
      );
      console.log(response.data.result);
      setCountDataVisitorByStatus(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountDataVisitorByPurpose = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/division/count/data-visitor-purpose"
      );
      console.log(response.data.result);
      setCountDataVisitorByPurpose(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountDataVisitorByStatus();
    fetchCountDataVisitorByPurpose();
  }, [total]);
  return (
    <DefaultLayout>
      <div className="items-center px-4 py-8 m-auto">
        <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
          {countDataVisitorByStatus?.length === 0 ? (
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
                data={sumArray(countDataVisitorByStatus)}
                title="Jumlah Kunjungan Hari Ini"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <BsPersonFillExclamation size={70} />
                    </div>
                  </>
                }
                data={countDataVisitorByStatus[0]}
                title="Jumlah Kunjungan Belum Selesai Proses"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <BsPersonFillCheck size={70} />
                    </div>
                  </>
                }
                data={countDataVisitorByStatus[1]}
                title="Jumlah Kunjungan Selesai Proses"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <BsPersonFillX size={70} />
                    </div>
                  </>
                }
                data={countDataVisitorByStatus[2]}
                title="Jumlah Kunjungan Batal Proses"
              />
            </>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-bold">Maksud Tujuan</h3>
      <div className="items-center px-4 py-8 m-auto">
        <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
          {countDataVisitorByPurpose.length === 0 ? (
            <>
              <CardDashboardSkeleton />
              <CardDashboardSkeleton />
              <CardDashboardSkeleton />
              <CardDashboardSkeleton />
            </>
          ) : (
            <>
              {countDataVisitorByPurpose.map((item, number) => (
                <CardDashboard
                  key={number + 1}
                  child={
                    <>
                      <div className="text-red-600">
                        <TbWorld size={70} />
                      </div>
                    </>
                  }
                  data={item.count}
                  title={item.purpose}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DashboardAdmin;
