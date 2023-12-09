import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SubTitle,
} from "chart.js";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SubTitle
);

const LineChart = ({ data, label, title, titleChart }) => {
  const chartData = {
    labels: label,
    datasets: [
      {
        label: titleChart,
        data: data, // Menggunakan prop 'data' yang diterima dari komponen
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 box__shadow">
      <h4 className="text-lg font-semibold">{title}</h4>
      {title === "Tahun" ? (
        <>
          <select
            name=""
            id=""
            className="w-full max-w-sm px-4 py-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">2022</option>
            <option value="">2023</option>
          </select>
        </>
      ) : null}
      <Line data={chartData} />
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LineChart;
