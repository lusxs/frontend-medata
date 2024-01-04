import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DefaultLayout from "../../layout/DefaultLayout";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportDataVisitors from "../../components/common/pdf/Report";
import ToastError from "../../components/common/toast/ToastError";
import ToastLoading from "../../components/common/toast/ToastLoading";
import { parseAndFormatDateString } from "../../utils/helper";
import { STATUS } from "../../utils/constanta";

const Visitors = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [notCompletedCount, setNotCompletedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/reports?startDate=${startDate}&endDate=${endDate}`
      );

      const filteredData = response.data.result;

      setCompletedCount(
        filteredData.filter((item) => item?.status === STATUS.COMPLETED).length
      );

      setNotCompletedCount(
        filteredData.filter((item) => item?.status === STATUS.NOT_COMPLETED)
          .length
      );

      setCanceledCount(
        filteredData.filter((item) => item?.status === STATUS.CANCELED).length
      );

      setData(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const handleRenderPdf = ({ loading, error }) => {
    if (loading) {
      return <ToastLoading message="Memuat..." />;
    } else if (error) {
      return <ToastError message="Gagal" />;
    } else {
      return (
        <button className="btn" disabled={loading}>
          Unduh PDF
        </button>
      );
    }
  };

  return (
    <DefaultLayout>
      <h5 className="mt-6 mb-4 text-xl font-semibold">Laporan</h5>
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-4 space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Tanggal Awal"
            className="p-2 border rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Tanggal Akhir"
            className="p-2 border rounded"
          />
        </div>
        <PDFDownloadLink
          document={
            <ReportDataVisitors
              completedCount={completedCount}
              canceledCount={canceledCount}
              notCompletedCount={notCompletedCount}
              data={data}
            />
          }
          fileName="table.pdf"
          className="btn-primary"
        >
          {handleRenderPdf}
        </PDFDownloadLink>
      </div>
      <div className="relative p-4 mb-10 overflow-x-auto shadow-md sm:rounded-lg">
        {data.length !== 0 ? (
          <>
            <table className="w-full text-sm text-left text-gray-500 shadow-sm">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Hari/Tanggal
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">Nama</div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">Umur</div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">NIK</div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Nomor Kontak
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Pekerjaan
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Alamat
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Maksud Tujuan
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Bidang
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, number) => (
                  <tr key={number} className="bg-white">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {number + 1}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {parseAndFormatDateString(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.age}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.citizenNumber}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.profession}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.address}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.purpose?.name}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.division?.name}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item?.status === "NOT COMPLETED" ? "Belum Selesai" : ""}
                      {item?.status === "COMPLETED" ? "Selesai" : ""}
                      {item?.status === "CANCELED" ? "Batal Proses" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="p-4 shadow-md">
              <p className="font-semibold text-center">Kosong</p>
            </div>
          </>
        )}
      </div>
      <div className="flex"></div>
    </DefaultLayout>
  );
};

export default Visitors;
