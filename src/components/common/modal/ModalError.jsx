import { FaXmark } from "react-icons/fa6";

const ModalError = ({ message }) => {
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
            <h5 className="text-xl font-bold text-center">Gagal</h5>
            <p className="mt-4 font-semibold text-center text-gray-500">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalError;
