import { FaXmark } from "react-icons/fa6";

const ModalError = () => {
  return (
    <>
      <div
        className={`fixed inset-0 z-index-top  flex items-center justify-center `}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col ">
          <div className="relative self-center">
            <div className="h-24 w-24 rounded-full text-red-500 border-2 border-[#E5E9F2] bg-white p-1 flex items-center justify-center">
              <FaXmark size={50} />
            </div>
          </div>
          <div className="-mt-12 rounded-lg border-2 border-[#E5E9F2] bg-white p-4 pt-14 pb-4 text-center">
            <h5 className="text-xl font-bold text-center">Tidak Berhasil</h5>
            <p className="mt-4 font-semibold text-center text-gray-500">
              Data Tidak Berhasil Ditambahkan
            </p>
            <button className=" uppercase focus:outline-none mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Oke
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalError;
