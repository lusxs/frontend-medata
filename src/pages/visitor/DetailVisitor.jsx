import { useParams } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/common/loading/Loading";
import Error from "../../components/common/error/Error";
import Input from "../../components/common/input/Input";

const DetailVisitor = () => {
  const { id } = useParams();
  const [detailVisitor, setDetailVisitor] = useState({});
  const { apiData, isLoading, isError } = useFetch(
    `http://localhost:5000/form/${id}`
  );

  useEffect(() => {
    if (apiData) {
      setDetailVisitor(apiData.result);
    }
  }, [apiData]);

  let status;

  switch (detailVisitor?.status) {
    case "NOT COMPLETED":
      status = "Belum Selesai";
      break;
    case "CANCELED":
      status = "Batal Proses";
      break;
    default:
      status = "Selesai";
      break;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <DefaultLayout>
      <h3 className="text-xl font-bold">Detail Data Pengunjung</h3>
      <div className="flex flex-col mt-6 space-y-4">
        <Input
          label="Nama"
          type={"text"}
          value={detailVisitor?.name}
          onChange={null}
          placeholder={detailVisitor?.name}
          disabled={true}
        />
        <Input
          label="Umur"
          type={"text"}
          value={detailVisitor?.age}
          onChange={null}
          placeholder={detailVisitor?.age}
          disabled={true}
        />
        <Input
          label="NIK"
          type={"text"}
          value={detailVisitor?.citizenNumber}
          onChange={null}
          placeholder={detailVisitor?.citizenNumber}
          disabled={true}
        />
        <Input
          label="Nomor Kontak"
          type={"text"}
          value={detailVisitor?.phoneNumber}
          onChange={null}
          placeholder={detailVisitor?.phoneNumber}
          disabled={true}
        />
        <Input
          label="Pekerjaan"
          type={"text"}
          value={detailVisitor?.profession}
          onChange={null}
          placeholder={detailVisitor?.profession}
          disabled={true}
        />
        <Input
          label="Alamat"
          type={"text"}
          value={detailVisitor?.address}
          onChange={null}
          placeholder={detailVisitor?.address}
          disabled={true}
        />
        <Input
          label="Status"
          type={"text"}
          value={status}
          onChange={null}
          placeholder={status}
          disabled={true}
        />
        <Input
          label="Divisi"
          type={"text"}
          value={detailVisitor?.division?.name}
          onChange={null}
          placeholder={detailVisitor?.division?.name}
          disabled={true}
        />
        <Input
          label="Maksud Tujuan"
          type={"text"}
          value={detailVisitor?.purpose?.name}
          onChange={null}
          placeholder={detailVisitor?.purpose?.name}
          disabled={true}
        />
      </div>
    </DefaultLayout>
  );
};

export default DetailVisitor;
