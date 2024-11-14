import React from "react";
import { Link } from "react-router-dom";


const Navbar = ({ setSearchResults }) =>  {
  return (
    <nav className="bg-green-500 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* EcoShop name/logo on the left */}
        <h1 className="text-white text-4xl font-bold ml-4">EcoShop</h1>
        {/* Navigation Links */}
        
        <ul className="flex justify-around text-white text-lg font-semibold flex-grow mr-2">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/fashion" className="hover:text-gray-200">
              Fashion
            </Link>
          </li>
          <li>
            <Link to="/jewelry" className="hover:text-gray-200">
              Jewelry
            </Link>
          </li>
          <li>
            <Link to="/packaging" className="hover:text-gray-200">
              Packaging
            </Link>
          </li>
          
          <li>
            <Link to="/handmadegifts" className="hover:text-gray-200">
              Handmade Gifts
            </Link>
          </li>
          <li>
            <Link to="/women" className="hover:text-gray-200">
              Women
            </Link>
          </li>
          <li>
            <Link to="/men" className="hover:text-gray-200">
              Men
            </Link>
          </li>
          <li>
            <Link to="/children" className="hover:text-gray-200">
              Children
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;