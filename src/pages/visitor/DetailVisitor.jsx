import { useParams } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const DetailVisitor = () => {
  const { id } = useParams();
  const [detailVisitor, setDetailVisitor] = useState({});

  const fetchDataVisitor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/form/${id}`);
      setDetailVisitor(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataVisitor();
  }, [id]);

  let status;

  switch (detailVisitor?.status) {
    case "NOT COMPLETED":
      status = "Belum Selesai";
      break;
    case "CANCELED":
      status = "Batal Proses";
      break;
    default:
      status = "Selesai";
      break;
  }

  return (
    <DefaultLayout>
      <h3 className="text-xl font-bold">Detail Data Pengunjung</h3>
      <div className="flex flex-col mt-6 space-y-4">
        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Nama
          </label>
          <input
            placeholder={detailVisitor?.name}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Email
          </label>
          <input
            placeholder={detailVisitor?.email}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Nomor Kontak
          </label>
          <input
            placeholder={detailVisitor?.phoneNumber}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Pekerjaan
          </label>
          <input
            placeholder={detailVisitor?.profession}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Alamat
          </label>
          <input
            placeholder={detailVisitor?.address}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Status
          </label>
          <input
            placeholder={status}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Divisi
          </label>
          <input
            placeholder={detailVisitor?.division?.name}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Maksud Tujuan
          </label>
          <input
            placeholder={detailVisitor?.purpose?.name}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailVisitor;
