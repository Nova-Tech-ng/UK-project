import React from "react";
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

const ChartComponent = ({ data }) => {
  return (
    <div className="border p-4 rounded shadow-lg">
      <h2 className="text-center mb-4">Average Grade Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="PredictedGrade" fill="#D25D09" />
          <Bar dataKey="previousGrade" fill="#4567B7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
