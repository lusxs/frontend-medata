import React, { useState, useEffect } from "react";
import { getMe } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/authSlice";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import ModalLogout from "../components/common/modal/ModalLogout";
import PropTypes from "prop-types";

const DefaultLayout = ({ children }) => {
  const { isError, user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";
  const isSecretary = user && user.role === "secretary";

  const [isModalLogout, setIsModalLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    ...(isAdmin || isSecretary
      ? [{ name: "Statistik", link: "/statistics", icon: MdOutlineDashboard }]
      : []),
    ...(isAdmin
      ? [
          { name: "Kelola Akun", link: "/users", icon: AiOutlineUser },
          {
            name: "Kelola Maksud Tujuan",
            link: "/purposes",
            icon: TbReportAnalytics,
          },
        ]
      : []),
    {
      name: "Data Pengunjung",
      link: "/visitors",
      icon: TbReportAnalytics,
    },
    ...(user && user.role !== "secretary"
      ? [
          {
            name: "Laporan",
            link: "/report",
            icon: TbReportAnalytics,
            margin: true,
          },
        ]
      : []),
  ];

  const [open, setOpen] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const openModal = () => {
    setIsModalLogout(true);
  };

  const closeModal = () => {
    setIsModalLogout(false);
  };

  return (
    <section className="flex h-screen overflow-hidden ">
      <div
        className={`bg-white min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-500 box__shadow z-index-top px-4`}
      >
        <div className="flex justify-end py-3">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="relative flex flex-col gap-4 mt-4">
          {menus?.map((menu, i) => (
            <NavLink
              to={menu?.link}
              key={i}
              className={` ${menu?.margin && "mt-5"} ${
                location.pathname === `${menu.link}`
                  ? `active__navlink_sidebar ${open && "border-r-4"} `
                  : ""
              }  group flex items-center text-sm  gap-3.5 font-medium p-2 hover:border-r-4 `}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
          <button
            onClick={() => openModal()}
            className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red-600 rounded-md hover:text-white"
          >
            <div>{React.createElement(MdLogout, { size: "20" })}</div>
            <span
              style={{
                transitionDelay: `${100 + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open &&
                "opacity-0 translate-x-28 text-white overflow-hidden hover:text-white"
              }`}
            >
              Keluar
            </span>
            <span
              className={`${
                open && "hidden"
              } absolute left-48 hover:text-white bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Keluar
            </span>
          </button>
        </div>
      </div>
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <header className="sticky top-0 flex w-full p-4 py-8 bg-white z-index drop-shadow-1 box__shadow"></header>
        <main className="h-screen p-4 md:p-6 2xl:p-10">{children}</main>
        {/* <footer className="sticky bottom-0 flex w-full p-4 bg-white z-index drop-shadow-1 box__shadow">
          Copyright © 2023 - All right reserved by Dinas Sosial Kabupaten
          Minahasa
        </footer> */}
      </div>
      <ModalLogout
        isOpen={isModalLogout}
        onClose={closeModal}
        logout={handleLogout}
      />
    </section>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
