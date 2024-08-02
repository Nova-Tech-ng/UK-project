import React from "react";
import studentmodal from "../assets/studentmodal.svg";

const Modal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 md:p-8">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl md:max-w-4xl lg:max-w-5xl h-3/4 md:h-4/5 lg:h-3/4 overflow-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            {student.name}
          </h2>
          <div className="fixed ml-96 mt-14">
            <img src={studentmodal} alt="" />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <span className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {student.id}
          </span>
          <span
            className={`${
              student.gpa < 2
                ? "ml-0 sm:ml-auto text-red-500 text-lg sm:text-xl lg:text-2xl font-semibold"
                : "ml-0 sm:ml-auto text-green-500 text-lg sm:text-xl lg:text-2xl font-semibold"
            }`}
          >
            <p className="text-black">Status:</p> {student.status}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white ">
            <thead>
              <tr className="text-left bg-[#EAF1EF]">
                <th className="border py-2 px-1 sm:px-2">Student ID</th>
                <th className="border py-2 px-1 sm:px-2">Gender</th>
                <th className="border py-2 px-1 sm:px-2">Student Name</th>
                <th className="border py-2 px-1 sm:px-2">Predicted Grade</th>
                <th className="border py-2 px-1 sm:px-2">Attendance Rate</th>
                <th className="border py-2 px-1 sm:px-2">Assignment Scores</th>
                <th className="border py-2 px-1 sm:px-2">GPA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border py-2 px-1 sm:px-2">{student.id}</td>
                <td className="border py-2 px-1 sm:px-2">{student.gender}</td>
                <td className="border py-2 px-1 sm:px-2">{student.name}</td>
                <td className="border py-2 px-1 sm:px-2">
                  {student.PredictedGrade}%
                </td>
                <td className="border py-2 px-1 sm:px-2">
                  {student.attendance}%
                </td>
                <td className="border py-2 px-1 sm:px-2">
                  {student.assignment}%
                </td>
                <td className="border py-2 px-1 sm:px-2">{student.gpa}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
