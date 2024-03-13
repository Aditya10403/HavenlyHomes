import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="w-full">
      <div className="flex justify-between items-center mx-auto p-2 md:p-3 bg-[#d48166] font-funtext shadow-md">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <img
              src={logo}
              alt={"logo"}
              className="w-[50px] h-[30px] md:w-[130px] md:h-[40px] object-contain"
            />
          </h1>
        </Link>
        <form
          className="bg-white sm:m-auto ml-3 px-3 py-2 sm:px-4 sm:py-3 rounded-3xl flex items-center text-[#d48166]"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-transparent focus:outline-none w-40 md:w-80 placeholder:text-[#d48166] text-sm placeholder:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          <button>
            <FaSearch className="text-[#d48166]" />
          </button>
        </form>
        <ul className="flex gap-4 items-center">
          <Link to={"/home"}>
            <li className="hidden sm:inline active:bg-white active:text-[#d48166] transition-all ease-in 2s font-mono border-2 border-white bg-[#d48166] px-3 py-2 text-xs text-white">
              HOME
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline bg-[#d48166] active:bg-white active:text-[#d48166] transition-all ease-in 2s font-mono border-2 px-3 py-2 text-white text-xs border-white">
              ABOUT
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 shadow-md object-cover mr-1"
                src={currentUser.avatar}
                alt="?"
              ></img>
            ) : (
              <li className="sm:inline bg-[#d48166] active:bg-white active:text-[#d48166] transition-all ease-in 2s font-mono border-2 border-white p-1 text-xs sm:px-3 sm:py-2 text-white">
                SIGN IN
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
