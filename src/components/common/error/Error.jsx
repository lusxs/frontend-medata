const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-8 text-5xl font-bold tracking-wider text-gray-600 md:text-6xl lg:text-7xl">
          500
        </p>
        <p className="mt-2 text-2xl font-bold text-gray-600 md:text-3xl lg:text-4xl">
          Kesalahan Server
        </p>
        <p className="mt-4 text-gray-500 md:text-lg xl:text-xl">
          Ups, terjadi kesalahan di server kami.
        </p>
      </div>
    </div>
  );
};

export default Error;
