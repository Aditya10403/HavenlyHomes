import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import OAuth from "../components/OAuth";

export default function SignUp() {
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
      const res = await fetch("/api/auth/signup", {
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
        navigate("/sign-in");
      }, 4000);
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
            Account created Successfully
          </Alert>

          {setTimeout(() => {
            setSuccess(false);
          }, 4000)}
        </div>
      )}
      {error && (
        <div className="w-[180px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute  items-center top-[28%] right-[0%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] md:text-[#373a36]">
          {error === "User not found!" ? (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              User not found!.
            </Alert>
          ) : error === "Wrong credentials!" ? (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Your email or password is invalid.
            </Alert>
          ) : error[65] === "u" ? (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              User Already Exists.
            </Alert>
          ) : (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Email already exists.
            </Alert>
          )}
          {setTimeout(() => {
            setError(null);
          }, 4000)}
        </div>
      )}
      <section className="mx-2 mt-3 md:mt-14 mb-5 flex bg-[#373a36] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:max-w-4xl font-normaltext">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md rounded-b-none md:rounded-r-none object-cover"
              src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center px-1 py-2 md:px-2 md:py-8">
            <div className="sm:w-[90%] md:w-[80%]">
              <h2 className="text-xl mt-1 md:text-3xl font-bold leading-tight text-white">
                Sign up
              </h2>
              <p className="mt-2 text-white text-sm">
                Already have an account?{" "}
                <Link to={"/sign-in"}>
                  <span className="font-medium text-[#e6e2dd] text-sm transition-all duration-200 font-funtext hover:underline">
                    Sign In
                  </span>
                </Link>
              </p>
              <form onSubmit={handleSubmit} className="mt-3 md:mt-8">
                <div className="space-y-3 md:space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm md:text-base font-medium text-white"
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
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm md:text-base font-medium text-white"
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
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm md:text-base font-medium text-white"
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
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-1.5 py-1.5 md:px-3.5 md:py-2.5 font-semibold leading-7 text-white hover:bg-black/80
                    active:bg-black/50"
                    >
                      {loading ? "Loading..." : "Create Account"}
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 mb-2 space-y-3">
                <OAuth />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
