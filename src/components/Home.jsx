import React from 'react'
import userlogo from "../assets/user_logo.png"
import { Link } from "react-router-dom";
const Home = () => {
  const containers = [
    { id: 1, image: userlogo,link:"/birthcertificate", heading: "Birth-Certificate", subHeading: "Sub Heading 1" },
    { id: 2, image: userlogo,link:"/citizenship", heading: "Citizenship", subHeading: "Sub Heading 2" },
    { id: 3, image: userlogo,link:"/nationalid", heading: "National Id", subHeading: "Sub Heading 3" },
    { id: 4, image: userlogo,link:"/passport", heading: "Passport", subHeading: "Sub Heading 4" },
    { id: 5, image: userlogo,link:"/license", heading: "Driving License", subHeading: "Sub Heading 5" },
    { id: 6, image: userlogo,link:"/pancard", heading: "Pan Card", subHeading: "Sub Heading 6" },
    { id: 7, image: userlogo,link:"/taxportal", heading: "Tax Portal", subHeading: "Sub Heading 7" },
    { id: 8, image: userlogo,link:"/complaintbox", heading: "Complaint Box", subHeading: "Sub Heading 8" },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">E-NEPAL HOME PAGE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
        {containers.map((container) => (
          <Link
          to={container.link}
            key={container.id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 text-center hover:shadow-light-blue-100 hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src={container.image}
              alt={container.heading}
              className="w-[30%] object-cover rounded-full mb-4 "
            />
            <h2 className="text-xl font-semibold mb-2">{container.heading}</h2>
            <p className="text-gray-600">{container.subHeading}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home