import React from "react";
import Card from "./Card";

const resources = [
  {
    title: "Learn Python Programming Masterclass",
    image: "path_to_image1",
    link: "#",
  },
  {
    title: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    image: "path_to_image2",
    link: "#",
  },
  {
    title: "Adobe Premiere Pro CC – Advanced Training Course",
    image: "path_to_image3",
    link: "#",
  },
  {
    title: "Ultimate AWS Certified Solutions Architect Associate 2021",
    image: "path_to_image4",
    link: "#",
  },
  {
    title: "Ultimate Google Ads Training 2020: Profit with Pay Per Click",
    image: "path_to_image5",
    link: "#",
  },
  {
    title: "Learn Ethical Hacking From Scratch 2021",
    image: "path_to_image6",
    link: "#",
  },
  {
    title: "Angular - The Complete Guide (2021 Edition)",
    image: "path_to_image7",
    link: "#",
  },
  {
    title: "How to get Diamond in soloQ | League of Legends | Season 11",
    image: "path_to_image8",
    link: "#",
  },
  {
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    image: "path_to_image9",
    link: "#",
  },
  {
    title: "SQL for NEWBS: Weekender Crash Course",
    image: "path_to_image10",
    link: "#",
  },
  {
    title: "SEO 2021: Complete SEO Training + SEO for WordPress Websites",
    image: "path_to_image11",
    link: "#",
  },
  {
    title: "[NEW] Ultimate AWS Certified Cloud Practitioner - 2021",
    image: "path_to_image12",
    link: "#",
  },
  {
    title: "Data Structures & Algorithms Essentials (2021)",
    image: "path_to_image13",
    link: "#",
  },
  {
    title: "Complete Adobe Lightroom Megacourse: Beginner to Expert",
    image: "path_to_image14",
    link: "#",
  },
  {
    title: "Digital Marketing Masterclass - 23 Courses in 1",
    image: "path_to_image15",
    link: "#",
  },
  {
    title: "The Ultimate Drawing Course - Beginner to Advanced",
    image: "path_to_image16",
    link: "#",
  },
];

const StudentLearningResource = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {resources.map((resource, index) => (
        <Card key={index} {...resource} />
      ))}
    </div>
  );
};

export default StudentLearningResource;
