const CardDashboard = ({child, title, data}) => {
  return (
    <div className="w-full p-2 xl:w-1/4 sm:w-1/2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between py-4">
          <div className="flex px-4 mr-4">
            {
              child
            }
          </div>
          <div className="flex-1 pl-1">
            <div className="text-xl font-medium text-gray-500">{data}</div>
            <div className="text-sm text-gray-400 sm:text-base">{title}</div>
          </div>
        </div>
        <div className="">
          <div className="w-full h-1 bg-gray-200 rounded-md hover:bg-gray-300">
            <div
              className="h-1 bg-gray-200 rounded-md "
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
