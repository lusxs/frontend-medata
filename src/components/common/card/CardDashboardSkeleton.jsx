const CardDashboardSkeleton = () => {
  return (
    <div className="w-full p-2 xl:w-1/4 sm:w-1/2 animate-pulse">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between py-4">
          <div className="flex px-4 mr-4">
            <span className="items-center px-4 py-4 m-auto bg-gray-200 rounded-full"></span>
          </div>
          <div className="flex-1 pl-1 ">
            <div className="w-20 h-6 mb-1 text-xl font-medium text-gray-300 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 text-sm text-gray-300 bg-gray-300 rounded sm:text-base"></div>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-md">
          <div
            className="h-1 bg-gray-300 rounded-md"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CardDashboardSkeleton;
