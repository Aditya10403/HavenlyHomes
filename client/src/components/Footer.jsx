import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <hr className="my-6 border-[#373a36]/30" />
      <div className="m-auto flex flex-wrap items-center md:justify-between justify-center mb-6 font-normaltext w-[250px] md:w-full">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center text-xs">
          <div className="text-blueGray-500 font-semibold py-1">
            Copyright © <span id="get-current-year">2024</span>
            <Link
            to={"/"}
              href="https://www.creative-tim.com/product/notus-js"
              className="text-blueGray-500 hover:text-[#373a36]"
              target="_blank"
            >
              {" "}
              Havenly Homes by{" "}
            </Link>
            <Link
              to="https://adityashukla-portfolio.netlify.app/"
              className="text-blueGray-500 hover:text-blueGray-800"
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
