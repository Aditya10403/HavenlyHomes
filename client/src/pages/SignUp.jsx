import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import OAuth from "../components/OAuth";
import photo from "../assets/photo.avif";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageloading, setPageLoading] = useState(true);

  const navigate = useNavigate();

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
        <div className="w-[200px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[34%] right-[1.8%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] md:text-[#373a36]">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Account created successfully!
          </Alert>
          {setTimeout(() => {
            setSuccess(false);
          }, 4000)}
        </div>
      )}
      {error && (
        <div className="w-[200px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute  items-center top-[34%] right-[0%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] md:text-[#373a36]">
          {error === "User not found!" ? (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              User not found!
            </Alert>
          ) : error === "Wrong credentials!" ? (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Your email or password is invalid!
            </Alert>
          ) : error[65] === "u" ? (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              User already exists!
            </Alert>
          ) : (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              Email already exists!
            </Alert>
          )}
          {setTimeout(() => {
            setError(null);
          }, 4000)}
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
        <section className="mx-2 mt-3 md:mt-14 mb-5 flex bg-[#373a36] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:max-w-4xl font-normaltext">
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
      )}
    </>
  );
}
