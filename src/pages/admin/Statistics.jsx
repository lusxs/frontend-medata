import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import LineChart from "../../components/common/chart/LineChart";
import axios from "axios";

const Statistics = () => {
  const [divisions, setDivisons] = useState([]);
  const [divisionId, setDivisionId] = useState(2);

  const fetchDivisions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/divisions");
      console.log(response.data);
      setDivisons(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDivisions();
  }, []);
  const chartData = [1, 2, 3, 5];
  const label = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
  return (
    <DefaultLayout>
      <form className="my-4">
        <div>
          <label htmlFor="division">Bidang</label>
          <select
            name="division"
            id="division"
            onChange={(e) => setDivisionId(e.target.value)}
            className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-72 p-2.5"
          >
            {divisions.map(
              (item) =>
                item.name !== "GENERAL" && (
                  <option key={item.uuid} value={item.id}>
                    {item.name}
                  </option>
                )
            )}
          </select>
        </div>
      </form>
      <div className="grid grid-cols-2 gap-4">
        <LineChart data={chartData} label={label} title="7 Hari Terakhir" />
        <LineChart data={chartData} label={label} title="Desember" />
        <LineChart data={chartData} label={label} title="6 Bulan Terakhir" />
        <LineChart data={chartData} label={label} title="Tahun" />
      </div>
    </DefaultLayout>
  );
};

export default Statistics;
