import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";
import CardDashboard from "../../components/common/card/CardDashboard";
import CardDashboardSkeleton from "../../components/common/card/CardDashboardSkeleton";
import DefaultLayout from "../../layout/DefaultLayout";
import { HiMiniUsers, HiBuildingOffice } from "react-icons/hi2";
import {
  BsPersonFillCheck,
  BsPersonFillExclamation,
  BsPersonFillX,
} from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { sumArray } from "../../utils/helper";

const DashboardAdmin = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countDataVisitorByDivision, setCountDataVisitorByDivision] = useState(
    []
  );
  const [countDataVisitorByStatus, setCountDataVisitorByStatus] = useState([]);
  const [countDataVisitorByPurpose, setCountDataVisitorByPurpose] = useState(
    []
  );
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await axios.get(url);
      console.log(response.data.result);
      setDataFunction(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountDataVisitorByDivision = () =>
    fetchData(
      "http://localhost:5000/admin/count/data-visitor",
      setCountDataVisitorByDivision
    );

  const fetchCountDataVisitorByStatus = () =>
    fetchData(
      "http://localhost:5000/admin/count/data-visitor-status",
      setCountDataVisitorByStatus
    );

  const fetchCountDataVisitorByPurpose = () =>
    fetchData(
      "http://localhost:5000/admin/count/data-visitor-purpose",
      (response) => {
        const data = response.sort((a, b) =>
          a.division.localeCompare(b.division)
        );
        setCountDataVisitorByPurpose(data);
      }
    );

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
    fetchCountDataVisitorByDivision();
    fetchCountDataVisitorByStatus();
    fetchCountDataVisitorByPurpose();
  }, [total]);

  const renderPurposeCards = (division) => {
    const filteredData = countDataVisitorByPurpose.filter(
      (item) => item.division === division
    );
    return (
      <div className="items-center px-4 py-8 m-auto">
        <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
          {countDataVisitorByPurpose.length === 0
            ? Array(4)
                .fill()
                .map((_, index) => <CardDashboardSkeleton key={index} />)
            : filteredData.map((item, number) => (
                <React.Fragment key={number + 1}>
                  <CardDashboard
                    child={
                      <div className="text-red-600">
                        <TbWorld size={70} />
                      </div>
                    }
                    data={item.count}
                    title={item.purpose}
                  />
                </React.Fragment>
              ))}
        </div>
      </div>
    );
  };

  return (
    <DefaultLayout>
      {/* Division Cards */}
      <div className="items-center px-4 py-8 m-auto">
        <div className="grid grid-cols-1 pb-3 bg-white divide-y rounded-sm shadow-lg md:grid-cols-3 xl:divide-x xl:divide-y-0">
          {data.length === 0 ? (
            Array(4)
              .fill()
              .map((_, index) => <CardDashboardSkeleton key={index} />)
          ) : (
            <>
              <CardDashboard
                child={
                  <div className="text-red-600">
                    <HiBuildingOffice size={70} />
                  </div>
                }
                data={countDataVisitorByDivision[0] || 0}
                title={`Bidang LINJAMSOS`}
              />
              <CardDashboard
                child={
                  <div className="text-red-600">
                    <HiBuildingOffice size={70} />
                  </div>
                }
                data={countDataVisitorByDivision[1] || 0}
                title={`Bidang REHSOS`}
              />
              <CardDashboard
                child={
                  <div className="text-red-600">
                    <HiBuildingOffice size={70} />
                  </div>
                }
                data={countDataVisitorByDivision[2] || 0}
                title={`Bidang PFM`}
              />
            </>
          )}
        </div>
      </div>

      {/* Status Cards */}
      <div className="items-center px-4 py-8 m-auto">
        <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
          {data.length === 0 ? (
            Array(4)
              .fill()
              .map((_, index) => <CardDashboardSkeleton key={index} />)
          ) : (
            <>
              <CardDashboard
                child={
                  <div className="text-red-600">
                    <HiMiniUsers size={70} />
                  </div>
                }
                data={sumArray(countDataVisitorByStatus)}
                title="Jumlah Kunjungan Hari Ini"
              />
              {countDataVisitorByStatus.map((statusData, index) => (
                <CardDashboard
                  key={index}
                  child={
                    <div className="text-red-600">
                      {index === 0 ? (
                        <BsPersonFillExclamation size={70} />
                      ) : index === 1 ? (
                        <BsPersonFillCheck size={70} />
                      ) : (
                        <BsPersonFillX size={70} />
                      )}
                    </div>
                  }
                  data={statusData}
                  title={`Jumlah Kunjungan ${
                    index === 0
                      ? "Belum Selesai Proses"
                      : index === 1
                      ? "Selesai Proses"
                      : "Batal Proses"
                  }`}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Purpose Cards */}
      <h3 className="text-2xl font-bold">Maksud Tujuan</h3>
      <h4 className="mt-4 text-xl font-bold">PFM</h4>
      {renderPurposeCards("PFM")}

      <h4 className="text-xl font-bold">REHSOS</h4>
      {renderPurposeCards("REHSOS")}

      <h4 className="text-xl font-bold">LINJAMSOS</h4>
      {renderPurposeCards("LINJAMSOS")}
    </DefaultLayout>
  );
};

export default DashboardAdmin;
