import DefaultLayout from "../../layout/DefaultLayout";
import LineChart from "../../components/common/chart/LineChart";

const Statistics = () => {
  const chartData = [1, 2, 3, 5];
  return (
    <DefaultLayout>
      <div className="grid grid-cols-2 gap-4">
        <LineChart data={chartData} />
        <LineChart data={chartData} />
        <LineChart data={chartData} />
        <LineChart data={chartData} />
      </div>
    </DefaultLayout>
  );
};

export default Statistics;
