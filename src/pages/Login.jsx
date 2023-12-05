import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import LogoMinahasa from "../assets/logo-minahasa.png";
import LogoDinsos from "../assets/logo-dinsos.png";
import ToastError from "../components/common/toast/ToastError";
import ModalError from "../components/common/modal/ModalError";
import Loading from "../components/common/loading/Loading";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "secretary") {
        navigate("/secretary/dashboard");
      } else if (user.role === "division") {
        navigate("/division/dashboard");
      }
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 1000);
    }
  }, [isError, message, dispatch]);

  return (
    <>
      {isError && <ToastError message={message} />}
      {/* {isError && <ModalError message={message} />} */}
      {isLoading && <Loading />}
      <div>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <div
          className="relative flex items-center justify-center min-h-screen px-4 py-12 bg-gray-500 bg-no-repeat bg-cover sm:px-6 lg:px-8"
          style={{
            backgroundImage: "url(public/background-dinsos.jpg)",
          }}
        >
          <div className="absolute inset-0 z-0 bg-black opacity-60" />
          <div className="z-10 w-full max-w-md p-10 space-y-8 bg-white rounded-xl">
            <div className="flex items-center justify-center mb-8 space-x-4">
              <img src={LogoMinahasa} alt="Logo" className="h-20 w-30" />
              <img src={LogoDinsos} alt="Logo" className="h-20 w-30" />
            </div>
            <h1 className="text-2xl font-bold text-center">Halooo</h1>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="relative">
                <label className="text-sm font-bold tracking-wide text-gray-700">
                  Nama Pengguna
                </label>
                <input
                  className="w-full py-2 text-base border-b border-gray-300 focus:outline-none focus:border-red-500"
                  placeholder="Masukan nama pengguna"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="content-center mt-8">
                <label className="text-sm font-bold tracking-wide text-gray-700">
                  Kata Sandi
                </label>
                <input
                  className="content-center w-full py-2 text-base border-b border-gray-300 focus:outline-none focus:border-red-500"
                  placeholder="*****"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full btn-primary font-semibold ${
                    isLoading ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loading />
                    </span>
                  ) : (
                    "Masuk"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
