import RiseLoader from "react-spinners/RiseLoader";

const overrides = {
  display: "block",
  margin: "0 auto",
};

const Loading = () => {
  const loading = true;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <RiseLoader
          color="#FFFFFF"
          loading={loading}
          cssOverride={overrides}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Loading;
