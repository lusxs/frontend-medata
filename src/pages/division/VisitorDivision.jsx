import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

const Visitors = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/forms");
      setData(response.data.result);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <h5 className="mt-6 mb-4 text-xl font-semibold">Data Kunjungan</h5>
      <div className="relative p-4 mb-10 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-end mb-4">
          <form>
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
                  // onChange={(e) => setQuery(e.target.value)}
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
        <table className="w-full text-sm text-left text-gray-500 shadow-sm">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Nama
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
                <div className="flex items-center">Aksi</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, number) => (
              <tr key={number} className="bg-white">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {number + 1}
                </td>
                <td className="px-6 py-4 uppercase">{item.name}</td>
                <td className="px-6 py-4 uppercase">11 November 2023</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="flex justify-center mt-4 rounded-sm">
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
              </div> */}
      </div>
    </DefaultLayout>
  );
};

export default Visitors;
