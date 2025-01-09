const Footer = () => {
  return (
    <footer className="bg-blue-gray-500 text-gray-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0 mr-5">
            <h2 className="text-xl font-bold mb-4">E-Nepal</h2>
            <p className="text-gray-400">
              Your one-stop solution for all government services in Nepal. We are committed to providing efficient and transparent services to all citizens.
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="/taxportal" className="text-gray-400 hover:text-white border-b border-white inline-block">Tax Portal</a>
              </li>
              <li className="mb-2">
                <a href="/complaintbox" className="text-gray-400 hover:text-white border-b border-white inline-block">Complaint Box</a>
              </li>
              <li className="mb-2">
                <a href="/passport" className="text-gray-400 hover:text-white border-b border-white inline-block">Passport</a>
              </li>
              <li className="mb-2">
                <a href="/license" className="text-gray-400 hover:text-white border-b border-white inline-block">License</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-2">Government of Nepal</p>
            <p className="text-gray-400 mb-2">Singha Durbar, Kathmandu</p>
            <p className="text-gray-400 mb-2">Phone: +977-1-1234567</p>
            <p className="text-gray-400 mb-2">Email: info@nepal.gov.np</p>
            <div className="flex mt-4">
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Government of Nepal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;