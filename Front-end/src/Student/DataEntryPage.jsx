import React from "react";
import dataentrypage from "../assets/dataentrypage.svg";

const DataEntryPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
      <div className="p-8 rounded-lg w-full max-w-2xl ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Hello Mark Jacob
        </h2>
        <p className="text-center mb-6">Please enter your details</p>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* STUDENT ID */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="studentId"
              >
                Student ID
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="studentId"
                type="text"
                placeholder="Student ID..."
              />
            </div>
            {/* AGE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="age"
                type="number"
                placeholder="Age..."
              />
            </div>
            {/* GRADE LEVEL */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gradelevel"
              >
                Grade Level
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="grade_level"
                type="text"
                placeholder="Grade Level..."
              />
            </div>
            {/* LEARNING STYLE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="learningstyle"
              >
                Learning Style
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="learning_style"
                type="text"
                placeholder="Learning Style..."
              />
            </div>
            {/* SOCIO-ECONOMIC STATUS */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="socioeconomicstatus"
              >
                Socio-Economonic Status
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="socio_economic_status"
                type="text"
                placeholder="Socio-Economonic Status..."
              />
            </div>
            {/* PAST GRADE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pastgrade"
              >
                Past Grade
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="past_grade"
                type="text"
                placeholder="Past Grade..."
              />
            </div>
            {/* STANDARDIZED TEST SCORES */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="standardizedtestscores"
              >
                Standardized Test Scores
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="standardized_test_scores"
                type="number"
                placeholder="Standardized Test Scores..."
              />
            </div>
            {/* PRIOR KNOWLEDGE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priorknowledge"
              >
                Standardized Test Scores
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="prior_knowledge"
                type="text"
                placeholder="Prior Knowledge..."
              />
            </div>
            {/* COURSE ID */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="courseid"
              >
                Course Id
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="course_id"
                type="text"
                placeholder="Course Id..."
              />
            </div>
            {/* COURSE NAME */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="coursename"
              >
                Course Name
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="course_name"
                type="text"
                placeholder="Course Name..."
              />
            </div>
            {/* COURSE DIFFICULTY */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="coursedifficulty"
              >
                Course Difficulty
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="course_difficulty"
                type="text"
                placeholder="Course Difficulty..."
              />
            </div>
            {/* CLASS SIZE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="classsize"
              >
                Class Size
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="class_size"
                type="number"
                placeholder="Class Size..."
              />
            </div>
            {/* TEACHING STYLE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="teachingstyle"
              >
                Teaching Style
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="teaching_style"
                type="text"
                placeholder="Teaching Style..."
              />
            </div>
            {/* COURSE WORK LOAD */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="courseworkload"
              >
                Course Workload
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="course_work_load"
                type="text"
                placeholder="Course Workload..."
              />
            </div>
            {/* ATTENDANCE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="attendance"
              >
                Attendance
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="attendance"
                type="number"
                placeholder="Attendance..."
              />
            </div>
            {/* STUDY TIME */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="studytime"
              >
                Study Time
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="study_time"
                type="number"
                placeholder="Study Time..."
              />
            </div>
            {/* TIME OF YEAR */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="timeofyear"
              >
                Time of Year
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="time_of_year"
                type="text"
                placeholder="Time of Year..."
              />
            </div>
            {/* Extra Curricular Activities */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="extracurricularactivities"
              >
                Extra Curricular Activities
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="extra_curricular_activities"
                type="text"
                placeholder="Extra Curricular Activities..."
              />
            </div>
            {/* HEALTH */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="health"
              >
                Health
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="health"
                type="text"
                placeholder="Health..."
              />
            </div>
            {/* HOME ENVIRONMENT */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="homeenvironment"
              >
                Home Environment
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="home_environment"
                type="text"
                placeholder="Home Environment..."
              />
            </div>
            {/* ACTUAL GRADE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="actualgrade"
              >
                Actual Grade
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="home_environment"
                type="text"
                placeholder="Actual Grade..."
              />
            </div>
            {/* CGPA */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cgpa"
              >
                CGPA
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline"
                id="cgpa"
                type="number"
                placeholder="CGPA..."
              />
            </div>
          </div>
          {/* BUTTON */}
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:-outline w-full"
            type="submit"
          >
            Proceed
          </button>
        </form>
      </div>
      {/* Image SVG Div */}
      <div className="mt-8 md:mt-0 md:ml-8">
        <img
          src={dataentrypage}
          alt="Data Entry"
          className="w-full  max-w-full"
        />
      </div>
    </div>
  );
};

export default DataEntryPage;
