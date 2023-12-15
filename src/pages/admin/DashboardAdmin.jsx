import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";
import CardDashboard from "../../components/common/card/CardDashboard";
import CardDashboardSkeleton from "../../components/common/card/CardDashboardSkeleton";
import DefaultLayout from "../../layout/DefaultLayout";
import { HiMiniUsers, HiBuildingOffice } from "react-icons/hi2";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFillExclamation } from "react-icons/bs";
import { BsPersonFillX } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

const DashboardAdmin = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const dispatch = useDispatch();
  const [purposeData, setPurposeData] = useState([]);
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [visitorCount, setVisitorCount] = useState(0); // Add this line
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

  useEffect(() => {
    const countVisitors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/visits/countDataVisitorToday"
        );
        setVisitorCount(response.data.result);
      } catch (error) {
        console.error("Error counting visitors:", error);
      }
    };

    countVisitors();
  }, []);

  useEffect(() => {
    const fetchVisitCounts = async () => {
      const purposeDataWithVisitCounts = await Promise.all(
        data.map(async (item) => {
          try {
            const response = await axios.get(
              `http://localhost:5000/visits/count?purposeId=${item.id}`
            );
            const visitCount = response.data.visitCount;
            return {
              ...item,
              visitCount,
            };
          } catch (error) {
            console.error(
              `Error fetching visit count for purpose ${item.id}:`,
              error
            );
            return item;
          }
        })
      );
      setPurposeData(purposeDataWithVisitCounts);
    };

    fetchVisitCounts();
  }, [data]);

  return (
    <DefaultLayout>
      <div className="items-center px-4 py-8 m-auto">
        <div className="grid grid-cols-1 pb-3 bg-white divide-y rounded-sm shadow-lg md:grid-cols-3 xl:divide-x xl:divide-y-0">
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
                      <HiBuildingOffice size={70} />
                    </div>
                  </>
                }
                data={`11`}
                title="Bidang PFM"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <HiBuildingOffice size={70} />
                    </div>
                  </>
                }
                data={`11`}
                title="Bidang PFM"
              />
              <CardDashboard
                child={
                  <>
                    <div className="text-red-600">
                      <HiBuildingOffice size={70} />
                    </div>
                  </>
                }
                data={`11`}
                title="Bidang LINJAMSOS"
              />
            </>
          )}
        </div>
      </div>
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
                data={visitorCount}
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
                data={`11`}
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
                data={`11`}
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
                data={`11`}
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
                      <div className="text-red-600">
                        <TbWorld size={70} />
                      </div>
                    </>
                  }
                  data={item.visitCount}
                  title={item.name}
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
