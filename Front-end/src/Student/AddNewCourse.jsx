import { useState } from "react";
import axios from "axios";

const AddCourseButton = ({ addCourse }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    age: "",
    grade_level: "",
    learning_style: "",
    socio_economic_status: "",
    past_grades: "",
    standardized_test_scores: "",
    prior_knowledge: "",
    course_id: "",
    course_name: "",
    course_difficulty: "",
    class_size: "",
    teaching_style: "",
    course_work_load: "",
    attendance: "",
    study_time: "",
    time_of_year: "",
    extra_curricular_activities: "",
    health: "",
    home_environment: "",
    actual_grade: "",
    cgpa: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleAddCourse = async () => {
    const requiredFields = [
      "age",
      "grade_level",
      "learning_style",
      "socio_economic_status",
      "past_grades",
      "standardized_test_scores",
      "prior_knowledge",
      "course_id",
      "course_name",
      "course_difficulty",
      "class_size",
      "teaching_style",
      "course_work_load",
      "attendance",
      "study_time",
      "time_of_year",
      "extra_curricular_activities",
      "health",
      "home_environment",
      "actual_grade",
      "cgpa",
    ];

    const isFormValid = requiredFields.every((field) => newCourse[field]);

    if (!isFormValid) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://amaremoelaebi.pythonanywhere.com/api/student/data",
        newCourse,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      addCourse({ ...newCourse, id: new Date().getTime() });
      localStorage.setItem(
        "courses",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("courses") || "[]"),
          newCourse,
        ])
      );
      setShowModal(false);
      setNewCourse({
        age: "",
        grade_level: "",
        learning_style: "",
        socio_economic_status: "",
        past_grades: "",
        standardized_test_scores: "",
        prior_knowledge: "",
        course_id: "",
        course_name: "",
        course_difficulty: "",
        class_size: "",
        teaching_style: "",
        course_work_load: "",
        attendance: "",
        study_time: "",
        time_of_year: "",
        extra_curricular_activities: "",
        health: "",
        home_environment: "",
        actual_grade: "",
        cgpa: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Failed to submit data. Please try again.");
    }
  };

  return (
    <div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Add Course
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-6 gap-4">
              {Object.keys(newCourse).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {key
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={newCourse[key]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddCourse}
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourseButton;
