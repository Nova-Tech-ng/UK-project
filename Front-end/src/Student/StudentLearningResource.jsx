import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

import image1 from "../assets/learningresources/image1.svg";
import image2 from "../assets/learningresources/image2.svg";
import image3 from "../assets/learningresources/image3.svg";
import image4 from "../assets/learningresources/image4.svg";
import image5 from "../assets/learningresources/image5.svg";
import image6 from "../assets/learningresources/image6.svg";
import image7 from "../assets/learningresources/image7.svg";
import image8 from "../assets/learningresources/image8.svg";
import image9 from "../assets/learningresources/image9.svg";
import image10 from "../assets/learningresources/image10.svg";
import image11 from "../assets/learningresources/image11.svg";
import image12 from "../assets/learningresources/image12.svg";
import image13 from "../assets/learningresources/image13.svg";
import image14 from "../assets/learningresources/image14.svg";
import image15 from "../assets/learningresources/image15.svg";
import image16 from "../assets/learningresources/image16.svg";

const resources = [
  {
    title: "Learn Python Programming Masterclass",
    image: image1,
    link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
  },
  {
    title: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    image: image2,
    link: "https://www.youtube.com/watch?v=mfH_AJjZvEQ",
  },
  {
    title: "Adobe Premiere Pro CC – Advanced Training Course",
    image: image3,
    link: "https://www.youtube.com/watch?v=AOczlCFoRfs",
  },
  {
    title: "Ultimate AWS Certified Solutions Architect Associate 2021",
    image: image4,
    link: "https://www.youtube.com/watch?v=Ia-UEYYR44s",
  },
  {
    title: "Ultimate Google Ads Training 2020: Profit with Pay Per Click",
    image: image5,
    link: "https://www.youtube.com/watch?v=4b3DX4so_3k",
  },
  {
    title: "Learn Ethical Hacking From Scratch 2021",
    image: image6,
    link: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
  },
  {
    title: "Angular - The Complete Guide (2021 Edition)",
    image: image7,
    link: "https://www.youtube.com/watch?v=htPYk6QxacQ",
  },
  {
    title: "How to get Diamond in soloQ | League of Legends | Season 11",
    image: image8,
    link: "https://www.youtube.com/watch?v=p8E4Dkg4hAs",
  },
  {
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    image: image9,
    link: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
  },
  {
    title: "SQL for NEWBS: Weekender Crash Course",
    image: image10,
    link: "https://www.youtube.com/watch?v=5hzZtqCNQKk",
  },
  {
    title: "SEO 2021: Complete SEO Training + SEO for WordPress Websites",
    image: image11,
    link: "https://www.youtube.com/watch?v=mb0L4KPgCww",
  },
  {
    title: "[NEW] Ultimate AWS Certified Cloud Practitioner - 2021",
    image: image12,
    link: "https://www.youtube.com/watch?v=ulprqHHWlng",
  },
  {
    title: "Data Structures & Algorithms Essentials (2021)",
    image: image13,
    link: "https://www.youtube.com/watch?v=IRUuGjNwDYY",
  },
  {
    title: "Complete Adobe Lightroom Megacourse: Beginner to Expert",
    image: image14,
    link: "https://www.youtube.com/watch?v=s5kUe4OhnXE",
  },
  {
    title: "Digital Marketing Masterclass - 23 Courses in 1",
    image: image15,
    link: "https://www.youtube.com/watch?v=xyR7KppLPgk",
  },
  {
    title: "The Ultimate Drawing Course - Beginner to Advanced",
    image: image16,
    link: "https://www.youtube.com/watch?v=7fxvdIGdlqU",
  },
];

const StudentLearningResource = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} {...resource} />
        ))}
      </div>
    </div>
  );
};

export default StudentLearningResource;
