import PropTypes from "prop-types";

const ToastError = ({ message }) => {
  return (
    <div className="fixed z-50 px-4 py-3 font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-md shadow-md top-10 left-1/2">
      {message}
    </div>
  );
};

ToastError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ToastError;
