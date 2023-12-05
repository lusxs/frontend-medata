import { useEffect, useState } from "react";
import DefaultLayout from "../../../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailAccount = () => {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      setDataUser(response.data.result);
      console.log(dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);
  return (
    <DefaultLayout>
      <h3>Detail</h3>
      <div className="flex flex-col mt-6 space-y-4">
        <div>
          <label
            htmlFor=""
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Nama
          </label>
          <input
            placeholder={dataUser?.name}
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
            placeholder={dataUser?.email}
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
            Nama Pengguna
          </label>
          <input
            placeholder={dataUser?.username}
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
            Nama
          </label>
          <input
            placeholder={dataUser?.name}
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
            Nama
          </label>
          <input
            placeholder={dataUser?.name}
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
            Nama
          </label>
          <input
            placeholder={dataUser?.name}
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
            Nama
          </label>
          <input
            placeholder={dataUser?.name}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-1 focus:ring-red-500`}
            disabled
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailAccount;
