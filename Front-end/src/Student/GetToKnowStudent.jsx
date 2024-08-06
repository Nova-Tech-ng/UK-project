import React from "react";
import { useNavigate } from "react-router-dom";

const LetsGetToKnowYou = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/student/data"); // Assuming the data entry page is at this route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold tracking-wide mb-10">
        LET'S GET TO KNOW YOU
      </h1>
      <button
        onClick={handleStartClick}
        className="px-6 py-2 border border-black rounded-full text-xl font-medium hover:bg-gray-200 transition-colors"
      >
        Start
      </button>
    </div>
  );
};

export default LetsGetToKnowYou;
