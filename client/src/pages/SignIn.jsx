import React, { useState } from "react";
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
import photo from "../assets/photo.avif"

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
      <section className="mx-3 mt-4 md:mt-14 mb-20 flex bg-[#373a36] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:max-w-4xl font-normaltext transition-all ease-in-out duration-3">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md rounded-b-none md:rounded-r-none object-cover"
              src={photo}
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
    </>
  );
}
