import { HiOutlineXCircle } from "react-icons/hi2";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ModalUpdatePurpose = ({
  setIsOpenModalUpdate,
  purposeId,
  updateTable,
}) => {
  const [divisions, setDivisions] = useState([]);
  const [name, setName] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [purposes, setPurposes] = useState();

  const fetchPurpose = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/purpose/detail/${purposeId}`
      );
      console.log(response);
      const { result } = response.data;
      setName(result.name);
      setDivisionId(result.divisionId);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDivisions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/divisions");
      setDivisions(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDivision = async (e) => {
    e.preventDefault();

    try {
      // Update division using axios.patch
      await axios.patch(`http://localhost:5000/purpose/${purposeId}`, {
        name,
        divisionId,
      });

      // Fetch updated data after the update
      const updatedResponse = await axios.get(`http://localhost:5000/purposes`);

      // Update the table with the new data
      updateTable(updatedResponse.data.result);

      // Close the modal after successful update
      setIsOpenModalUpdate();
    } catch (error) {
      // Handle errors by logging them to the console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDivisions();
    fetchPurpose();
  }, []);
  return (
    <>
      <div
        className={`fixed inset-0 z-index-top  flex items-center justify-center `}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col ">
          <div className="p-10 bg-white rounded-xl">
            <div className="flex justify-end text-red-500">
              <HiOutlineXCircle
                size={40}
                className="cursor-pointer"
                onClick={() => setIsOpenModalUpdate()}
              />
            </div>
            <div>
              <form onSubmit={updateDivision}>
                <div>
                  <label htmlFor="">Nama</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  />
                </div>
                <div>
                  <label htmlFor="">Bidang</label>
                  <select
                    name="division"
                    value={divisionId}
                    onChange={(e) => setDivisionId(e.target.value)}
                    id="division"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  >
                    {divisions.map((item) =>
                      item.id === 1 ? null : (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
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

ModalUpdatePurpose.protoTypes = {
  setIsOpenModalUpdate: PropTypes.func.isRequired,
  purpose: PropTypes.object.isRequired,
};

export default ModalUpdatePurpose;
