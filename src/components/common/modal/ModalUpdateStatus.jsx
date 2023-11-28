import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalUpdateStatus = ({ id, status, onClose, fetchData }) => {
  let navigate = useNavigate();
  const updateStatus = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/form/${id}`, {
        status,
      });
      if (status === "COMPLETED") {
        navigate("/visitors/completed");
      } else {
        navigate("/visitors/canceled");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmation = () => {
    updateStatus();
    onClose(false);
    fetchData();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-index-top">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="absolute flex flex-col">
        <div className="relative w-full max-w-md max-h-full p-4">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 text-center md:p-5">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {status === "COMPLETED"
                  ? "Anda yakin ini menyelesaikan ?"
                  : "Anda yakin ingin membatalkan"}
              </h3>
              <button
                onClick={handleConfirmation}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              >
                Ya
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => onClose(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateStatus;
