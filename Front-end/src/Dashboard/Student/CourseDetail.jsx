function CourseDetail() {
  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="m-6 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-4">Enter your Course Detail</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="coursename"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Course Name
            </label>
            <input
              type="name"
              id="coursename"
              placeholder="Course Name"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="courseid"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Course ID
            </label>
            <input
              type="id"
              id="id"
              placeholder="Course ID"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="classsize"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Class Size
            </label>
            <input
              type="classsize"
              id="classsize"
              placeholder="54"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="priorknowledge"
            >
              Prior Knowledge
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="priorknowledge"
            >
              <option>Prior Knowledge</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="difficulty"
            >
              Difficulty
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="difficulty"
            >
              <option>Difficulty</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="learningstyle"
            >
              Learning Style
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="learningstyle"
            >
              <option>Learning Style</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="courseworkload"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Course Workload
            </label>
            <input
              type="courseworkload"
              id="courseworkload"
              placeholder="Course Workload"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="season"
            >
              Season
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="season"
            >
              <option>Season</option>
            </select>
          </div>
          <div className="flex justify-center space-x-10 mx-10">
            <button
              className="bg-[#D25D09] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Add Course
            </button>
            <button
              className="bg-[#D25D09] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseDetail;
