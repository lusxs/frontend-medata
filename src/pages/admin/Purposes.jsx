import { useState } from "react";
import axios from "axios";
import DefaultLayout from "../../layout/DefaultLayout";
import ReactPaginate from "react-paginate";
import ModalUpdatePurpose from "../../components/common/modal/ModalUpdatePurpose";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Toggle from "../../components/common/toggle/Toggle";
import { MdEditNote } from "react-icons/md";
import ModalAddPurpose from "../../components/common/modal/ModalAddPurpose";

const Purposes = () => {
  const [data, setData] = useState([]);
  const [purposeId, setPurposeId] = useState({});
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 5;
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [hiddenPurposes, setHiddenPurposes] = useState([]);

  const fetchPurposes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/purposes?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setData(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleChange = async (purposeId) => {
    try {
      const updatedPurposes = data.map((purpose) =>
        purpose.id === purposeId
          ? { ...purpose, isActive: !purpose.isActive }
          : purpose
      );

      setData(updatedPurposes);

      await axios.patch(`http://localhost:5000/purpose/active/${purposeId}`, {
        isActive: updatedPurposes.find((purpose) => purpose.id === purposeId)
          ?.isActive,
      });
    } catch (error) {
      console.error("Error updating isActive:", error);
    }
  };

  const updateTable = (purposes) => {
    setData(purposes);
  };

  useEffect(() => {
    fetchPurposes();
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
      {isOpenModalUpdate && (
        <ModalUpdatePurpose
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          purposeId={purposeId}
          updateTable={updateTable}
        />
      )}
      {isOpenModal && <ModalAddPurpose setIsOpenModal={setIsOpenModal} />}
      <h5 className="mt-6 mb-4 text-xl font-semibold">
        Data Kelola Maksud Tujuan
      </h5>
      <div className="relative p-4 mb-10 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between mb-4">
          {data.length !== 0 ? (
            <>
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
            </>
          ) : null}
          <div>
            <button
              onClick={() => setIsOpenModal(true)}
              className="btn-primary"
            >
              Tambah Maksud Tujuan
            </button>
          </div>
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
                      Maksud Tujuan
                      <a href="#">
                        <svg
                          className="w-3 h-3 ml-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">
                      Bidang
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center justify-center">Aksi</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1 + page * limit}
                    </td>
                    <td className="text-center px-6 py-4 uppercase">
                      {item.name}
                    </td>
                    <td className="text-center px-6 py-4 uppercase">
                      {item.division.name}
                    </td>
                    <td className="flex items-center justify-center space-x-2">
                      <div className="text-center">
                        <Toggle
                          checked={item.isActive}
                          onToggle={() => handleToggleChange(item.id)}
                        />
                      </div>
                      <div>
                        <button
                          className="btn-secondary"
                          onClick={() => {
                            setPurposeId(item.id);
                            setIsOpenModalUpdate(true);
                          }}
                          title="Datail"
                        >
                          <MdEditNote className="large-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="p-4 shadow-sm">
              <p className="font-semibold text-center">Data Kosong</p>
            </div>
          </>
        )}

        {data.length !== 0 ? (
          <>
            <div className="flex justify-center mt-4 rounded-sm">
              <nav
                className=""
                key={rows}
                role="navigation"
                aria-label="pagination"
              >
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={Math.min(10, pages)}
                  onPageChange={changePage}
                  containerClassName={
                    "flex items-center h-8 -space-x-px text-sm "
                  }
                  pageLinkClassName={
                    "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }
                  previousLinkClassName={
                    "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }
                  nextLinkClassName={
                    "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  }
                  activeLinkClassName={
                    "z-10 flex items-center justify-center h-8 px-3 leading-tight border text-primary-600 border-primary-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 "
                  }
                  disabledLinkClassName={"pagination-link is-disabled"}
                />
              </nav>
            </div>
          </>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default Purposes;
