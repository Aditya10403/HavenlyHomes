import BgImg from "../assets/Bg.jpg";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <section>
        <div class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
            <div class="relative z-10 lg:py-16">
              <div class="relative h-64 sm:h-80 lg:h-full">
                <img
                  alt=""
                  src={BgImg}
                  class="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div class="relative flex items-center bg-gray-100 font-normaltext">
              <span class="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

              <div class="p-8 sm:p-16 lg:p-24">
                <h2 class="text-2xl font-bold md:text-5xl text-[#373a36]">
                  About Us
                </h2>

                <p class="mt-4 text-gray-600">
                At Havenly Homes, we're dedicated to turning your dream of home ownership into reality. With a passion for exceptional service and a commitment to excellence, we specialize in matching you with your ideal property. Experience the journey to your haven with us – your trusted real estate partner
                </p>

                <Link to={"/"}
                  class="mt-8 inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 transition-all duration-3"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
