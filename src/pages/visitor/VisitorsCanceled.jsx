import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import { useEffect } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { parseAndFormatDateString } from "../../utils/helper";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/pagination/Pagination";
import ToastError from "../../components/common/toast/ToastError";

const VisitorsCanceled = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 5;
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const status = "CANCELED";
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/forms?search_query=${keyword}&page=${page}&limit=${limit}&status=${status}`
      );
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, keyword]);

  const changePage = ({ selected }) => {
    setPage(selected);
    setMessage(
      selected === 9
        ? "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
        : ""
    );
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMessage("");
    setKeyword(query);
  };

  return (
    <DefaultLayout>
      {message && <ToastError message={message} />}
      <h5 className="mt-6 mb-4 text-xl font-semibold">Data Kunjungan Batal</h5>
      <div className="relative p-4 mb-10 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-end mb-4">
          <form onSubmit={searchData}>
            <div className="flex">
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Cari
              </label>

              <div className="relative w-full">
                <input
                  type="search"
                  onChange={(e) => setQuery(e.target.value)}
                  id="search"
                  className="block p-2.5 w-96 rounded-l-lg z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg  border-2 border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Cari"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-primary-700 rounded-r-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        {data.length !== 0 ? (
          <>
            <table className="w-full text-sm text-left text-gray-500 shadow-sm">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Hari/Tanggal
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">Nama</div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Maksud Tujuan
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Bidang
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Status
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">Aksi</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"} // Bergantian warna
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1 + page * limit}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {parseAndFormatDateString(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item.purpose.name}
                    </td>
                    <td className="px-6 py-4 text-center uppercase">
                      {item.division.name}
                    </td>
                    {console.log(item.status)}
                    <td className="px-6 py-4 text-center uppercase">
                      {item.status === "CANCELED" ? "Batal Proses" : ""}
                    </td>
                    <td className="flex items-center justify-center px-6 py-4 space-x-2 uppercase">
                      <Link
                        to={`/visitor/detail/${item.id}`}
                        className="btn-secondary"
                        title="Detail"
                      >
                        <BiSolidUserDetail className="large-icon" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              page={page}
              pages={pages}
              rows={rows}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
            />
          </>
        ) : (
          <>
            <div className="p-4 shadow-md">
              <p className="font-semibold text-center">Data Kosong</p>
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default VisitorsCanceled;
