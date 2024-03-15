import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bottom-0 z-50 mt-6">
      <hr className="border-[#373a36]/30 mb-2" />
      <div className="m-auto flex flex-wrap items-center md:justify-between justify-center font-normaltext w-[250px] md:w-full mb-2">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center text-xs">
          <div className="text-[#373a36] font-semibold py-1">
            Copyright © <span id="get-current-year">2024</span>
            <Link
              to={"/"}
              href="https://www.creative-tim.com/product/notus-js"
              className="hover:text-blue-600"
              target="_blank"
            >
              {" "}
              Havenly Homes{" "}
            </Link>
            by {" "}
            <Link
              to="https://adityashukla-portfolio.netlify.app/"
              className="hover:text-blue-600"
            >
              Aditya Shukla
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
