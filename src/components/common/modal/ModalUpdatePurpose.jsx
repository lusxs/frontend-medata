import { HiOutlineXCircle } from "react-icons/hi2";

const ModalUpdatePurpose = ({ setIsOpenModalUpdate }) => {
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
              <form>
                <div>
                  <label htmlFor="">Nama</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  />
                </div>
                <div>
                  <label htmlFor="">Bidang</label>
                  <select
                    name=""
                    id=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
                  >
                    <option value="">RENSOS</option>
                    <option value="">RENSOS</option>
                    <option value="">RENSOS</option>
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

export default ModalUpdatePurpose;
