import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import LineChart from "../../components/common/chart/LineChart";
import axios from "axios";
import { generateWeeklyData } from "../../utils/helper";

const Statistics = () => {
  const [divisions, setDivisions] = useState([]);
  const weekday = generateWeeklyData();
  const [years, setYears] = useState([]);
  const [divisionId, setDivisionId] = useState(2);
  const [chartDataWeekly, setChartDataWeekly] = useState([]);
  const [chartDataMonthly, setChartDataMonthly] = useState([]);
  const [chartDataYearly, setChartDataYearly] = useState([]);
  const [lastFiveYear, setLastFiveYear] = useState([]);
  const [year, setYear] = useState(0);

  const fetchDataWeekly = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/count/${divisionId}`
      );
      const countArray = data.map((item) => item.count);
      setChartDataWeekly(countArray.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDivisions = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/divisions");
      setDivisions(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMonthly = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/form/monthly/count/${year}/${divisionId}`
      );
      setChartDataMonthly(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

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

  const fetchYears = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/years");
      console.log(data);
      setYear(data.result[0]);
      setYears(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchYearly = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/form/yearly/count/${divisionId}`
      );
      setLastFiveYear(data.result.map((item) => item.year).reverse());
      setChartDataYearly(data.result.map((item) => item.count).reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataWeekly();
    fetchYears();
    fetchDataMonthly();
    fetchYearly();
    fetchDivisions();
  }, [divisionId]);

  const handleDivisionChange = (e) => {
    setDivisionId(e.target.value);
  };

  return (
    <DefaultLayout>
      <form className="my-4">
        <div>
          <label htmlFor="division" className="font-semibold">
            Bidang
          </label>
          <select
            name="division"
            id="division"
            onChange={handleDivisionChange}
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
          label={weekday.reverse()}
          title="7 Hari Terakhir"
          titleChart="Data Pengunjung"
        />
        <LineChart
          data={chartDataMonthly}
          label={labelYearly}
          years={years}
          title="Tahun"
          titleChart="Data Pengunjung"
        />
        <LineChart
          data={chartDataYearly}
          label={lastFiveYear}
          title="5 Tahun Terakhir"
          titleChart="Data Pengunjung"
        />
      </div>
    </DefaultLayout>
  );
};

export default Statistics;
