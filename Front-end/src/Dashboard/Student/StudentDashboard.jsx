import React from "react";
// import "./StudentPerformance.css"; // For custom styles if needed

function StudentPerformance() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Header name="Jacob Fatu" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PerformanceMetric title="Predicted Grade" value="54%" />
        <PerformanceMetric title="Actual Grade" value="72.43%" />
        <PerformanceMetric title="Attendance Rate" value="80%" />
        <RiskIndicator value="Safe" />
      </div>
      <PerformanceChart />
    </div>
  );
}

function Header({ name }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="flex space-x-4">{/* Add tabs here */}</div>
    </div>
  );
}

function PerformanceMetric({ title, value }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function RiskIndicator({ value }) {
  const colorClass = value === "Safe" ? "bg-green-500" : "bg-red-500";
  return (
    <div className={`bg-gray-100 p-4 rounded-lg text-center ${colorClass}`}>
      <h3 className="text-lg font-semibold">Risk Indicator</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function PerformanceChart() {
  // Implement chart using a charting library like Chart.js or React Chartjs
  return (
    <div className="bg-gray-100 p-4 rounded-lg">{/* Chart goes here */}</div>
  );
}

export default StudentPerformance;
