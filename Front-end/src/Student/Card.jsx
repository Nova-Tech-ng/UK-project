import React from "react";

const Card = ({ title, image, link }) => {
  return (
    <a
      href={link}
      className="block rounded-lg shadow-lg hover:shadow-xl transition duration-200"
    >
      <img
        src={image}
        alt={title}
        className="rounded-t-lg w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </a>
  );
};

export default Card;
