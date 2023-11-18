import PropTypes from "prop-types";

const BarSkeleton = ({ count }) => {
  const skeletonElements = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`h-4 mb-6 bg-gray-${index % 2 === 0 ? "200" : "300"} rounded `}
    ></div>
  ));

  return <div className="animate-pulse -z-50">{skeletonElements}</div>;
};

BarSkeleton.propTypes = {
  count: PropTypes.number,
};

export default BarSkeleton;
