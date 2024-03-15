import { Link } from "react-router-dom";

export default function Sidebar({ searchMenu = false }) {
  return (
    <div
      className={`bg-[#d48166] w-[160px] h-[250px] right-0 absolute rounded-b-lg font-normaltext text-white px-3 z-50 ${
        searchMenu ? "block" : "hidden"
      } transition-all ease-in duration-300`}
    >
      <ul className="w-full h-full flex flex-col justify-between p-3 pb-4 font-semibold">
        <Link to={"/profile"}>
          <li>Profile</li>
        </Link>
        <Link to={"/about"}>
          <li>About Us</li>
        </Link>
        <Link to={"/sign-in"}>
          <li>Sign In</li>
        </Link>
        <Link to={"/sign-up"}>
          <li>Sign Up</li>
        </Link>
      </ul>
    </div>
  );
}
