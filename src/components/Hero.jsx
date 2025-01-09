import mountain from '../assets/mountain.jpg';
import './Hero.css'; // Import the custom CSS file

const Hero = () => {
  const handleGetStartedClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative bg-cover bg-center mt-3 h-screen">
      <img src={mountain} alt="hero-banner-image" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 bottom-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Nepal Government Service Portal</h1>
        <p className="text-xl mb-6">Your one-stop solution for all government services</p>
        <button
          onClick={handleGetStartedClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg breathing-effect"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;