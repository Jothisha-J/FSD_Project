import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SkillsChart = () => {
  const [chartData, setChartData] = useState([]);

  const skillsJobApi = "http://localhost:8080/api/admin/skills-jobs";

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const fetchChartData = async () => {
      try {
        const response = await axios.get(skillsJobApi, config);
        setChartData(response.data);
      } catch (err) {
        console.error(err?.response);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="card shadow-sm p-3 mt-4">
      <h5 className="mb-3">Skills vs Jobs & Applications</h5>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skillName" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="jobCount" name="Jobs" fill="#00bbff" />
          <Bar dataKey="applicationCount" name="Applications" fill="#bce0f7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;
