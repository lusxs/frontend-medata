import { HiOutlineXCircle } from "react-icons/hi2";
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ModalAddPurpose = ({ setIsOpenModal }) => {
  const [divisions, setDivisons] = useState([]);
  const [name, setName] = useState("");
  const [divisionId, setDivisionId] = useState(2);

  const fetchDivisions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/divisions");
      console.log(response.data);
      setDivisons(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const addPurpose = async () => {
    try {
      const response = await axios.post("http://localhost:5000/purpose", {
        name,
        divisionId,
      });
      if (response) {
        setIsOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);
  return (
    <>
      <div
        className={`fixed inset-0 z-index-top  flex items-center justify-center `}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col ">
          <div className="p-10 bg-white rounded-xl">
            <div
              className="flex justify-end text-red-500 "
              onClick={() => setIsOpenModal(false)}
            >
              <HiOutlineXCircle size={40} className="cursor-pointer" />
            </div>
            <div>
              <form onSubmit={addPurpose}>
                <div>
                  <label htmlFor="">Nama</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  />
                </div>
                <div>
                  <label htmlFor="division">Bidang</label>
                  <select
                    name="division"
                    id="division"
                    onChange={(e) => setDivisionId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  >
                    <option value="" disabled>
                      Silahkan Pilih Maksud Tujuan
                    </option>
                    {divisions.map(
                      (item) =>
                        item.name !== "GENERAL" && (
                          <option key={item.uuid} value={item.id}>
                            {item.name}
                          </option>
                        )
                    )}
                  </select>
                </div>

                <button className="w-full mt-6 btn-primary">Simpan</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModalAddPurpose.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
};

export default ModalAddPurpose;
