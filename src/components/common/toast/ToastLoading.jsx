import PropTypes from "prop-types";

const ToastLoading = ({ message }) => {
  return (
    <div className="fixed flex items-center justify-center px-4 py-3 space-x-4 font-semibold text-black transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md z-index-top top-10 left-1/2">
      <span> {message}</span>
      <div className="w-8 h-8 border-2 border-red-500 rounded-full border-2-solid animate-spin border-t-transparent"></div>
    </div>
  );
};

ToastLoading.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ToastLoading;
