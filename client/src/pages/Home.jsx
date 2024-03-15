import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <>
      <div className="font-normaltext">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-[#373a36] font-bold text-3xl lg:text-6xl">
            Find your next{" "}
            <span className="text-[#d48166] text-4xl lg:text-7xl">Perfect</span>
            <br className="hidden md:block" /> place with ease
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm ml-1">
            Discover your haven in our Havenly homes,
            <br /> where every door opens to possibility and every window frames
            a dream.
          </div>
          <div class="flex items-center gap-x-6">
            <Link
              to={"/search"}
              class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get started
            </Link>
            <Link
              to={"/about"}
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        {offerListings.length === 0 &&
      rentListings.length === 0 &&
      saleListings.length === 0 ? (
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
      ) : (
        ""
      )}
        {loading && (
          <div className="w-full h-[500px] flex justify-center items-center">
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
        {!loading && (
          <Swiper navigation>
            {offerListings &&
              offerListings.length > 0 &&
              offerListings.map((listing) => (
                <SwiperSlide>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                    className="h-[500px]"
                    key={listing._id}
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}

        <div className="max-w-6xl mx-auto p-6 md:p-3 flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
