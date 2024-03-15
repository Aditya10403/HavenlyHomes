import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import photo from "../assets/photo.avif";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for alerts
  const [success, setSuccess] = useState(false);
  const [Error, setError] = useState(null);
  const [pageloading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1500);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart()); // *
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        // setLoading(false);
        setError(data.message);
        dispatch(signInFailure(data.message)); // *
        return;
      }
      // setLoading(false);
      setError(null);
      dispatch(signInSuccess(data)); // *
      setSuccess(true);
      // setTimeout(() => {
      //   // setSuccess(false);
      //   dispatch(signInFailure(success.message))
      //   navigate("/");
      // }, 2500);
    } catch (error) {
      // setLoading(false);
      setError(error.message);
      dispatch(signInFailure(error.message)); // *
    }
  };

  return (
    <>
      {success && (
        <div className="w-[230px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[33%] right-[1.8%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] md:text-[#373a36]">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Welcome to Havenly Homes
          </Alert>
          {setTimeout(() => {
            setSuccess(false);
            navigate("/");
          }, 4000)}
        </div>
      )}
      {Error && (
        <div className="w-[230px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[35%] right-[1%] md:top-[10%] md:right-[1%] transition-all ease-in lg:text-[#373a36] md:text-[#e6e2dd] text-[#373a36]">
          {Error === "User not found!" ? (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              User not found!
            </Alert>
          ) : Error === "Wrong credentials!" ? (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Invalid credentials!
            </Alert>
          ) : (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Welcome to Havenly Homes
            </Alert>
          )}
          {setTimeout(() => {
            setError(null);
          }, 5000)}
        </div>
      )}
      {pageloading && (
        <div className="w-full h-[100vh] flex justify-center items-center">
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
      {!pageloading && (
        <section className="mx-3 mt-4 md:mt-14 mb-20 flex bg-[#373a36] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:max-w-4xl font-normaltext transition-all ease-in-out duration-3">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full w-full">
              <img
                className="mx-auto h-full w-full rounded-md rounded-b-none md:rounded-r-none object-cover"
                src={
                  "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" ||
                  photo
                }
                alt=""
              />
            </div>
            <div className="flex items-center justify-center px-2 py-2 md:px-3 md:py-8">
              <div className="w-[88%] md:w-[80%]">
                <h2 className="mt-1 text-2xl md:text-3xl font-bold leading-tight text-white">
                  Sign In
                </h2>
                <p className="pt-2 text-white text-sm">
                  Dont have an account?{" "}
                  <Link to={"/sign-up"}>
                    <span className="font-medium text-[#e6e2dd] text-sm transition-all duration-200 font-funtext hover:underline">
                      Sign up
                    </span>
                  </Link>
                </p>
                <form onSubmit={handleSubmit} className="mt-2 md:mt-6">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-base font-medium text-white"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-[#e6e2dd] bg-white px-3 py-2 text-sm placeholder:text-[#e6e2dd] focus:outline-none focus:ring-1 focus:ring-[#e6e2dd] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="email"
                          id="email"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-base font-medium text-white"
                        >
                          {" "}
                          Password{" "}
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-[#e6e2dd] bg-white px-3 py-2 text-sm placeholder:text-[#e6e2dd] focus:outline-none focus:ring-1 focus:ring-[#e6e2dd] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          placeholder="password"
                          id="password"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <button
                        disabled={loading}
                        className="inline-flex w-full items-center justify-center px-1.5 py-1.5 rounded-md bg-black md:px-3.5 md:py-2.5 font-semibold leading-7 text-white hover:bg-black/80
                    active:bg-black/50"
                      >
                        {loading ? "Loading..." : "Sign In"}
                        <ArrowRight className="ml-2" size={16} />
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mt-3 pb-2 space-y-3">
                  <OAuth />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
