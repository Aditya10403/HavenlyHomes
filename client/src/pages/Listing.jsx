import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaRupeeSign,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLisiting = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchLisiting();
  }, [params.listingId]);

  return (
    <main className="font-normaltext">
      {loading && (
        <div className="w-full h-full flex justify-center mt-[20%]">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-[#373a36] fill-[#d48166]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {error && (
        <div className="w-full mt-8 flex flex-col items-center text-center h-full">
          <svg
            className="emoji-404"
            enableBackground="new 0 0 226 249.135"
            height="249.135"
            id="Layer_1"
            overflow="visible"
            version="1.1"
            viewBox="0 0 226 249.135"
            width={226}
            xmlSpace="preserve"
          >
            <circle cx={113} cy={113} fill="#FFE585" r={109} />
            <line
              enableBackground="new    "
              fill="none"
              opacity="0.29"
              stroke="#6E6E96"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
              x1="88.866"
              x2="136.866"
              y1="245.135"
              y2="245.135"
            />
            <line
              enableBackground="new    "
              fill="none"
              opacity="0.17"
              stroke="#6E6E96"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
              x1="154.732"
              x2="168.732"
              y1="245.135"
              y2="245.135"
            />
            <line
              enableBackground="new    "
              fill="none"
              opacity="0.17"
              stroke="#6E6E96"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
              x1="69.732"
              x2="58.732"
              y1="245.135"
              y2="245.135"
            />
            <circle cx="68.732" cy={93} fill="#6E6E96" r={9} />
            <path
              d="M115.568,5.947c-1.026,0-2.049,0.017-3.069,0.045  c54.425,1.551,98.069,46.155,98.069,100.955c0,55.781-45.219,101-101,101c-55.781,0-101-45.219-101-101  c0-8.786,1.124-17.309,3.232-25.436c-3.393,10.536-5.232,21.771-5.232,33.436c0,60.199,48.801,109,109,109s109-48.801,109-109  S175.768,5.947,115.568,5.947z"
              enableBackground="new    "
              fill="#FF9900"
              opacity="0.24"
            />
            <circle cx="156.398" cy={93} fill="#6E6E96" r={9} />
            <ellipse
              cx="67.732"
              cy="140.894"
              enableBackground="new    "
              fill="#FF0000"
              opacity="0.18"
              rx="17.372"
              ry="8.106"
            />
            <ellipse
              cx="154.88"
              cy="140.894"
              enableBackground="new    "
              fill="#FF0000"
              opacity="0.18"
              rx="17.371"
              ry="8.106"
            />
            <path
              d="M13,118.5C13,61.338,59.338,15,116.5,15c55.922,0,101.477,44.353,103.427,99.797  c0.044-1.261,0.073-2.525,0.073-3.797C220,50.802,171.199,2,111,2S2,50.802,2,111c0,50.111,33.818,92.318,79.876,105.06  C41.743,201.814,13,163.518,13,118.5z"
              fill="#FFEFB5"
            />
            <circle
              cx={113}
              cy={113}
              fill="none"
              r={109}
              stroke="#6E6E96"
              strokeWidth={8}
            />
          </svg>
          <div className=" tracking-widest mt-4">
            <span className="text-gray-500 text-6xl block">
              <span>4 0 4</span>
            </span>
            <span className="text-gray-500 text-xl">
              Sorry, We couldn't find what you are looking for!
            </span>
          </div>
          <center className="mt-6">
            <Link to={"/"}>
              <p className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">
                Go back{" "}
              </p>
            </Link>
          </center>
        </div>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-blue-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold flex">
              {listing.name} - <FaRupeeSign className="self-center text-xl" />{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-IN")
                : listing.regularPrice.toLocaleString("en-IN")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-4 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-800 w-full max-w-[150px] text-white text-center p-3 rounded-md font-semibold">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[150px] text-white items-center p-3 rounded-md text-normal font-semibold flex">
                  <FaRupeeSign className=" text-sm" />
                  {(+listing.regularPrice - +listing.discountPrice).toLocaleString("en-IN")} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800 text-sm">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-base flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-[#373a36] text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
