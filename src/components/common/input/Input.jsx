import PropTypes from "prop-types";

const Input = ({ label, type, value, onChange, placeholder, disabled }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
