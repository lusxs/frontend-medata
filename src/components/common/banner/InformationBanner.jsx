const InformationBanner = () => {
  return (
    <div
      id="informational-banner"
      tabIndex={-1}
      className="flex flex-col justify-between w-full p-4 border-b border-gray-200 start-0 md:flex-row bg-gray-50 "
    >
      <div className="mb-4 md:mb-0 md:me-4">
        <h2 className="mb-1 text-base font-bold text-gray-900 dark:text-white">
          SPPG Belum 100%
        </h2>
        <p className="flex items-center text-sm font-normal text-gray-500 ">
          Tolong lengkapi SPPG agar presentase mencapai 100%
        </p>
      </div>
      <div className="flex items-center flex-shrink-0">
        <a
          href="#"
          className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg me-2 hover:bg-red-800 focus:ring-4 focus:ring-red-300 "
        >
          Cek
          <svg
            className="w-3 h-3 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default InformationBanner;
