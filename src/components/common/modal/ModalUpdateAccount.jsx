import { HiOutlineXCircle } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ModalUpdateAccount = ({ setIsOpenModalUpdate, userId, updateTable }) => {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    nip: "",
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      const { result } = response.data;
      console.log(result);
      setUserData(result);
      setUserData(...userData, result.username);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/user/${userId}`, {
        ...userData,
      });

      // Fetch updated data after the update
      const updatedResponse = await axios.get(`http://localhost:5000/users`);

      // Update the table with the new data
      updateTable(updatedResponse.data.result);

      // Close the modal after successful update
      setIsOpenModalUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      <div
        className={`fixed inset-0 z-index-top flex items-center justify-center `}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col ">
          <div className="p-10 bg-white rounded-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-light">Perbaharui Data Akun</h2>
              <div className="flex justify-end text-red-500">
                <HiOutlineXCircle
                  size={40}
                  className="cursor-pointer"
                  onClick={() => setIsOpenModalUpdate()}
                />
              </div>
            </div>
            <div>
              <form onSubmit={updateAccount}>
                <div>
                  <label htmlFor="" className="font-semibold">
                    Nama Pengguna
                  </label>
                  <input
                    value={userData?.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    type="text"
                    className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  />
                </div>
                <div className="mt-6">
                  <label htmlFor="" className="font-semibold">
                    Nama
                  </label>
                  <input
                    value={userData?.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    type="text"
                    className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  />
                </div>
                <div className="mt-6">
                  <label htmlFor="" className="font-semibold">
                    NIP
                  </label>
                  <input
                    value={userData?.nip}
                    onChange={(e) =>
                      setUserData({ ...userData, nip: e.target.value })
                    }
                    type="text"
                    className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  />
                </div>
                <button type="submit" className="w-full mt-6 btn-primary">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModalUpdateAccount.propTypes = {
  setIsOpenModalUpdate: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  updateTable: PropTypes.func.isRequired,
};

export default ModalUpdateAccount;
