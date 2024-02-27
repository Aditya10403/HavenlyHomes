import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 2500);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
    {success && (
        <div className="w-[180px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[28%] right-[1.8%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] md:text-[#373a36]">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Welcome to Havenly Homes
          </Alert>

          {setTimeout(() => {
            setSuccess(false);
          }, 3000)}
        </div>
      )}
      {error && (
        <div className="w-[180px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[28%] right-[0%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] md:text-[#373a36]">
          {error === "User not found!" ? (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              User not found!
            </Alert>
          ) : error === "Wrong credentials!" ? (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Invalid Credentials
            </Alert>
          ) : (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Welcome to Havenly Homes
            </Alert>
          )}
          {setTimeout(() => {
            setError(null);
          }, 6000)}
        </div>
      )}
      <section className="mx-3 mt-4 md:mt-14 mb-5 flex bg-[#373a36] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:max-w-4xl font-normaltext transition-all ease-in-out 2s">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md rounded-b-none md:rounded-r-none object-cover"
              src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
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
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80
                    active:bg-black/50"
                    >
                      {loading ? "Loading..." : "Sign In"}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 pb-2 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none
                active:bg-white/60"
                >
                  <span className="mr-2 inline-block">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#1976D2"
                      />
                    </svg>
                  </span>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
