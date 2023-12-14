import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import LineChart from "../../components/common/chart/LineChart";
import axios from "axios";
import { generateWeeklyData } from "../../utils/helper";

const Statistics = () => {
  const [divisions, setDivisions] = useState([]);
  const [divisionId, setDivisionId] = useState(2);
  const [labelWeekly, setLabelWeekly] = useState([]);
  const [chartDataWeekly, setChartDataWeekly] = useState([]);

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
    const generate = generateWeeklyData();
    setLabelWeekly(generate);
    fetchDivisions();
  }, []);

  const chartData = [1, 2, 3, 5];
  const label = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
  const chartDataMonthly = [0, 50, 100, 150, 200];
  const labelMonthly = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];
  const chartDataHexaly = [0, 200, 300, 400, 500, 600, 700];
  const labelHexaly = [
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const chartDataYearly = [0, 1000, 2000, 3000, 4000, 5000, 6000];
  const labelYearly = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

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
        <LineChart
          data={chartDataWeekly}
          label={labelWeekly}
          title="7 Hari Terakhir"
          titleChart="Data Pengunjung"
        />
        <LineChart
          data={chartDataMonthly}
          label={labelMonthly}
          title="Desember"
          titleChart="Data Pengunjung"
        />
        <LineChart
          data={chartDataHexaly}
          label={labelHexaly}
          title="6 Bulan Terakhir"
          titleChart="Data Pengunjung"
        />
        <LineChart
          data={chartDataYearly}
          label={labelYearly}
          title="Tahun"
          titleChart="Data Pengunjung"
        />
      </div>
    </DefaultLayout>
  );
};

export default Statistics;
