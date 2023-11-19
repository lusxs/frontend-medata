import { HiOutlineXCircle } from "react-icons/hi2";

const ModalUpdatePurpose = ({ setIsOpenModalUpdate }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-index-top  flex items-center justify-center `}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col ">
          <div className="p-4 bg-white">
            <div className="flex justify-end text-red-500">
              <HiOutlineXCircle
                size={20}
                className="cursor-pointer"
                onClick={() => setIsOpenModalUpdate()}
              />
            </div>
            <div>
              <form>
                <div>
                  <label htmlFor="">Nama</label>
                  <input type="text" />
                </div>
                <div>
                  <label htmlFor="">Bidang</label>
                  <select name="" id="">
                    <option value="">RENSOS</option>
                    <option value="">RENSOS</option>
                    <option value="">RENSOS</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdatePurpose;
