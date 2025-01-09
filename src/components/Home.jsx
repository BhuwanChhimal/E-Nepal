import userlogo from "../assets/user_logo.png";
import { Link } from "react-router-dom";
import Hero from "./Hero"; // Import the Hero component

const Home = () => {
  const containers = [
    { id: 1, image: userlogo, link: "/birthcertificate", heading: "Birth Certificate", subHeading: "Register your birth certificate" },
    { id: 2, image: userlogo, link: "/citizenship", heading: "Citizenship", subHeading: "Apply for citizenship" },
    { id: 3, image: userlogo, link: "/nationalid", heading: "National ID", subHeading: "Get your national ID" },
    { id: 4, image: userlogo, link: "/passport", heading: "Passport", subHeading: "Apply for a passport" },
    { id: 5, image: userlogo, link: "/license", heading: "Driving License", subHeading: "Get your driving license" },
    { id: 6, image: userlogo, link: "/pancard", heading: "PAN Card", subHeading: "Apply for a PAN card" },
    { id: 7, image: userlogo, link: "/taxportal", heading: "Tax Portal", subHeading: "Access tax services" },
    { id: 8, image: userlogo, link: "/complaintbox", heading: "Complaint Box", subHeading: "Submit a complaint" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero /> {/* Include the Hero component */}
      <div className="p-8 mt-2">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-600">E-Nepal Home Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {containers.map((container) => (
            <Link
              to={container.link}
              key={container.id}
              className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
            >
              <img
                src={container.image}
                alt={container.heading}
                className="w-16 h-16 mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-blue-600">{container.heading}</h2>
              <p className="text-gray-600">{container.subHeading}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;