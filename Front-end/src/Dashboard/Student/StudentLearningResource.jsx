import React from "react";

const resources = [
  {
    title: "Learn Python Programming Masterclass",
    img: "path/to/img1.jpg",
    link: "#",
  },
  {
    title: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    img: "path/to/img2.jpg",
    link: "#",
  },
  {
    title: "Adobe Premiere Pro CC – Advanced Training Course",
    img: "path/to/img3.jpg",
    link: "#",
  },
  // Add more resources here
];

const LearningResources = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Learning Resources</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <a
            href={resource.link}
            key={index}
            className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src={resource.img}
              alt={resource.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{resource.title}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LearningResources;
