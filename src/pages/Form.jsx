import { useEffect, useState } from "react";
import axios from "axios";
import LogoMinahasa from "../assets/logo-minahasa.png";
import LogoDinsos from "../assets/logo-dinsos.png";
import ModalSuccess from "../components/common/modal/ModalSuccess";
import ModalError from "../components/common/modal/ModalError";
import Loading from "../components/common/loading/Loading";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    citizenNumber: "",
    phoneNumber: "",
    profession: "",
    address: "",
    division: "",
    purpose: "",
  });

  const [purposes, setPurposes] = useState([]);
  const [divisions, setDivisions] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    citizenNumber: "",
    phoneNumber: "",
    profession: "",
    address: "",
    division: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(0);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Nama",
      label: "Nama",
      required: true,
      error: errors.name,
    },
    {
      id: 3,
      name: "age",
      type: "text",
      placeholder: "21",
      label: "Umur",
      required: true,
      error: errors.age,
    },
    {
      id: 4,
      name: "citizenNumber",
      type: "text",
      placeholder: "7171717171",
      label: "NIK",
      required: false,
      error: errors.citizenNumber,
    },
    {
      id: 5,
      name: "phoneNumber",
      type: "text",
      placeholder: "Nomor Kontak",
      label: "Nomor Kontak",
      required: true,
      error: errors.phoneNumber,
    },
    {
      id: 6,
      name: "profession",
      type: "text",
      placeholder: "Pekerjaan",
      label: "Pekerjaan",
      required: true,
      error: errors.profession,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "Alamat",
      label: "Alamat",
      required: true,
      error: errors.address,
    },
    {
      id: 8,
      name: "division",
      type: "select",
      placeholder: "Tujuan",
      label: "Tujuan",
      required: true,
      error: errors.division,
    },
  ];

  const validateInputs = () => {
    const newErrors = {};

    inputs.forEach((input) => {
      const inputValue = data[input.name] || ""; // Ensure inputValue is not undefined
      if (input.required && inputValue.trim() === "") {
        newErrors[input.name] = `Field ${input.label} tidak boleh kosong.`;
      } else {
        newErrors[input.name] = "";
      }
    });

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleAddData = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);

      await createForm();
      setLoading(false);
      setSuccess(1);
      setTimeout(() => {
        setSuccess(0);
      }, 2500);
      setData({
        name: "",
        email: "",
        phoneNumber: "",
        profession: "",
        address: "",
        division: "",
        purpose: "",
      });
      setErrors({
        name: "",
        email: "",
        phoneNumber: "",
        profession: "",
        address: "",
        division: "",
        purpose: "",
      });
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
      setLoading(false);
      setSuccess(2);
      setTimeout(() => {
        setSuccess(0);
      }, 2500);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setData({
      name: "",
      email: "",
      phoneNumber: "",
      profession: "",
      address: "",
      division: "",
      purpose: "",
    });
    setErrors({
      name: "",
      email: "",
      phoneNumber: "",
      profession: "",
      address: "",
      division: "",
      purpose: "",
    });
  };

  const createForm = async () => {
    try {
      const response = await axios.post("http://localhost:5000/form", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDivisions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/divisions");
      setDivisions(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPurposesByDivision = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/purposes/${data.division}`
      );
      setPurposes(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDivisions();
    fetchPurposesByDivision();
  }, [data.division]);

  return (
    <>
      {loading && <Loading />}
      {/* Success Modal */}
      {success === 1 && <ModalSuccess onClose={() => setSuccess(0)} />}

      {/* Error Modal */}
      {success === 2 && <ModalError onClose={() => setSuccess(0)} />}
      <div className="p-4 bg-gray-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-8 space-x-4">
              <img src={LogoMinahasa} alt="Logo" className="h-20 w-30" />
              <img src={LogoDinsos} alt="Logo" className="h-20 w-30" />
            </div>

            <h1 className="mt-8 mb-6 text-2xl font-semibold text-center text-gray-500">
              Form Pengisian Data
            </h1>
            <form onSubmit={handleAddData}>
              {inputs.map((input) => (
                <div className="mb-4" key={input.id}>
                  <label
                    htmlFor={input.name}
                    className="block mb-2 text-sm text-gray-600"
                  >
                    {input.label}
                  </label>
                  {input.type === "select" ? (
                    <select
                      id={input.name}
                      value={data[input.name]}
                      onChange={(e) =>
                        setData({ ...data, [input.name]: e.target.value })
                      }
                      onFocus={() => setErrors({ ...errors, [input.name]: "" })}
                      onBlur={() => {
                        if (data[input.name] !== "") {
                          setErrors({ ...errors, [input.name]: "" });
                        }
                      }}
                      name={input.name}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors[input.name] ? "border-red-500" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Silahkan Pilih Tujuan
                      </option>
                      {divisions.map((item) =>
                        item.id === 1 ? null : (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <input
                      type={input.type}
                      id={input.name}
                      value={data[input.name]}
                      onChange={(e) =>
                        setData({ ...data, [input.name]: e.target.value })
                      }
                      onFocus={() => setErrors({ ...errors, [input.name]: "" })}
                      onBlur={() => {
                        if (data[input.name] !== "") {
                          setErrors({ ...errors, [input.name]: "" });
                        }
                      }}
                      name={input.name}
                      placeholder={input.placeholder}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors[input.name] ? "border-red-500" : ""
                      }`}
                    />
                  )}
                  {errors[input.name] && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[input.name]}
                    </p>
                  )}
                </div>
              ))}
              <div className="mb-6">
                {purposes.length === 0 ? (
                  <>
                    {" "}
                    <label
                      htmlFor="purposes"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Maksud Tujuan
                    </label>
                    <select
                      disabled
                      value={data.purpose}
                      onChange={(e) =>
                        setData({ ...data, purpose: e.target.value })
                      }
                      onFocus={() => setErrors({ ...errors, purpose: "" })}
                      onBlur={() => {
                        if (data.purpose !== "") {
                          setErrors({ ...errors, purpose: "" });
                        }
                      }}
                      name="purpose"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.purpose ? "border-red-500" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Silahkan Pilih Tujuan Dulu
                      </option>
                    </select>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="purposes"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Maksud Tujuan
                    </label>
                    <select
                      value={data.purpose}
                      onChange={(e) =>
                        setData({ ...data, purpose: e.target.value })
                      }
                      onFocus={() => setErrors({ ...errors, purpose: "" })}
                      onBlur={() => {
                        if (data.purpose !== "") {
                          setErrors({ ...errors, purpose: "" });
                        }
                      }}
                      name="purpose"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.purpose ? "border-red-500" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Silahkan Pilih Maksud Tujuan
                      </option>
                      {purposes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>

              <div className="grid w-full grid-cols-2 gap-x-4">
                <button
                  onClick={handleReset}
                  type="button"
                  className="btn-secondary"
                >
                  Bersihkan
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading
                      ? "flex items-center justify-center space-x-4 cursor-not-allowed"
                      : ""
                  } btn-primary`}
                >
                  {loading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : null}
                  <span>Simpan</span>
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs text-center text-gray-600">
              © 2023 Dinas Sosial Kabupaten Minahasa
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
