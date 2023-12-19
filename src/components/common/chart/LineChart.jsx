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

const LineChart = ({ data, label, title, titleChart, years, setYear }) => {
  const arrIsEmpty = [0, 0, 0, 0, 0, 0, 0];
  const nonNegativeData = data.map((value) => (value < 0 ? 0 : value));
  const chartData = {
    labels: label,
    datasets: [
      {
        label: titleChart,
        data: nonNegativeData.length === 0 ? arrIsEmpty : nonNegativeData,
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 box__shadow">
      <h4 className="text-lg font-semibold">{title}</h4>
      {title === "Tahun" ? (
        <>
          <select
            name=""
            id=""
            onChange={(e) => setYear(e.target.value)}
            className="w-full max-w-sm px-4 py-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </>
      ) : null}
      <Line data={chartData} options={options} />
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleChart: PropTypes.string.isRequired,
  setYear: PropTypes.func.isRequired,
};

export default LineChart;
