import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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

const data = [
  { year: "2021", PredictedGrade: 70, ActualGrade: 50 },
  { year: "2022", PredictedGrade: 30, ActualGrade: 60 },
  { year: "2023", PredictedGrade: 60, ActualGrade: 55 },
  { year: "2024", PredictedGrade: 70, ActualGrade: 40 },
];
export const studentData = [
  {
    id: 194,
    gender: "Female",
    name: "Grace Evans",
    PredictedGrade: 89,
    attendance: 89,
    assignment: 89,
    gpa: 3.74,
    status: "Pending",
  },
  {
    id: 233,
    gender: "Male",
    name: "Maro Oghenerukwe",
    PredictedGrade: 90,
    attendance: 94,
    assignment: 94,
    gpa: 3.92,
    status: "Pending",
  },
  {
    id: 921,
    gender: "Male",
    name: "Matthew Jonathan",
    PredictedGrade: 75,
    attendance: 25,
    assignment: 25,
    gpa: 1.45,
    status: "At Risk",
  },
  {
    id: 183,
    gender: "Female",
    name: "Glory Evans",
    PredictedGrade: 76,
    attendance: 56,
    assignment: 56,
    gpa: 2.85,
    status: "Pending",
  },
  {
    id: 219,
    gender: "Male",
    name: "Wila Amirs",
    PredictedGrade: 55,
    attendance: 62,
    assignment: 62,
    gpa: 3.02,
    status: "pending",
  },
];

const StudentDashboard = () => {
  const routes = [
    { path: "/dashboard", name: "Individual Performance" },
    { path: "/learning-resources", name: "Learning Resources" },
  ];
  return (
    <div className="container p-4 mx-auto">
      {/* ADMIN ICON */}
      <div className="mb-4">
        <FaRegUserCircle size={30} />
        <p>Jacob Fatu</p>
      </div>
      {/* NAVIGATION */}
      <div className="space-x-4">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              isActive ? "text-[#D25D09] font-semibold" : ""
            }
          >
            {route.name}
          </NavLink>
        ))}
      </div>
      {/* DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4 mt-4">
        <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
          <span className="ml-2 font-semibold">Predicted Grade</span>
          <div className="flex justify-end">
            <p className="text-5xl font-semibold">54%</p>
          </div>
        </div>
        <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
          <span className="ml-2 font-semibold">Actual Grade</span>
          <div className="flex justify-end">
            <p className="text-5xl font-semibold">72.43%</p>
          </div>
        </div>
        <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
          <span className="ml-2 font-semibold">Attendance Rate</span>
          <div className="flex justify-end">
            <p className="text-5xl font-semibold">80%</p>
          </div>
        </div>
        <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
          <span className="ml-2 font-semibold">Risk Indicator</span>
          <div className="flex justify-end">
            <div className="w-full bg-gray-200  relative">
              <div
                className="h-8 "
                style={{
                  width: "100%",
                  background: "linear-gradient(to right, green, red)",
                }}
              ></div>
              <div className="absolute top-0 left-3/4 transform -translate-x-1/2 text-red-500 text-sm">
                At risk
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CHART */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
        <div className="border p-4 rounded shadow-lg">
          <h2 className="text-center mb-4">Performance Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="PredictedGrade" fill="#D25D09" />
              <Bar dataKey="ActualGrade" fill="#4567B7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
