import { SquarePen, UserX, LogOut, NotebookTabs } from "lucide-react";
import Avatar from "../components/avatar.png";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <section className="flex flex-col mx-3 mt-12 md:mt-8  bg-[#d48166] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:w-8/12 font-normaltext px-4 py-3">
        <div className="flex flex-col mx-auto w-[95%] md:w-[90%]">
          <form className="mt-2 md:mt-3">
            <h2 className="text-center text-xl mt-1 md:text-3xl font-bold leading-tight text-[#373a36]">
              Profile
            </h2>
            <div className="w-full text-center">
              <img
                className="mt-2 inline-block h-14 w-14 rounded-full shadow-md object-cover cursor-pointer"
                src={currentUser.avatar}
                alt="Dan_Abromov"
              />
            </div>
            <div className="space-y-3 md:space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm md:text-base font-medium text-black"
                >
                  {" "}
                  User Name{" "}
                </label>
                <div className="mt-1 md:mt-2">
                  <input
                    className="flex h-8 md:h-10 w-full rounded-md border border-[#e6e2dd] bg-white px-3 py-2 text-sm placeholder:text-[#e6e2dd] focus:outline-none focus:ring-1 focus:ring-[#e6e2dd] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="username"
                    id="username"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm md:text-base font-medium text-black"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-1 md:mt-2">
                  <input
                    className="flex h-8 md:h-10 w-full rounded-md border border-[#e6e2dd] bg-white px-3 py-2 text-sm placeholder:text-[#e6e2dd] focus:outline-none focus:ring-1 focus:ring-[#e6e2dd] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm md:text-base font-medium text-black"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-1 md:mt-2">
                  <input
                    className="flex h-8 md:h-10 w-full rounded-md border border-[#e6e2dd] bg-white px-3 py-2 text-sm placeholder:text-[#e6e2dd] focus:outline-none focus:ring-1 focus:ring-[#e6e2dd] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#373a36] px-1.5 py-1.5 md:px-3.5 md:py-2.5 font-semibold leading-7 text-white hover:bg-[#373a36]/90
                    active:bg-[#373a36]/70"
                >
                  {" Update "}
                  <SquarePen className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 mb-2 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md bg-green-600 px-1.5 py-1.5 md:px-3.5 md:py-2.5 font-semibold text-white hover:bg-gray-100 hover:text-green-500 active:bg-green-500/70 transition-all duration-200 ease-out"
            >
              Create Listing
            </button>
          </div>
        </div>
      </section>
      <div className="mx-2 md:mx-auto max-w-sm lg:w-8/12 mt-4 flex justify-between">
        <button className="mx-2 bg-red-500 px-3 py-2 text-center rounded hover:bg-red-500/80 active:bg-red-500/60">
          <UserX className="ml-2" size={20} />
        </button>
        <button className="mx-2 text-sm font-funtext flex items-center bg-green-500 px-3 py-2 text-center rounded hover:bg-green-500/80 active:bg-green-500/60">
          Show Listings
          <NotebookTabs className="ml-2" size={20} />
        </button>

        <button className="mx-2 bg-blue-500 px-3 py-2 text-center rounded hover:bg-blue-500/80 active:bg-blue-500/60">
          <LogOut className="ml-2" size={20} />
        </button>
      </div>
    </>
  );
}
