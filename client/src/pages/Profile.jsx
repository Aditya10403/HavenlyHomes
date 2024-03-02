import { SquarePen, UserX, LogOut, NotebookTabs } from "lucide-react";
import Avatar from "../components/avatar.png";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileSize, setFileSize] = useState(0);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // track changes
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const remaining = (snapshot.bytesTransferred / 1024 / 1024).toFixed(2);
        setFilePerc(Math.round(progress));
        setFileSize(remaining);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  console.log(currentUser);
  return (
    <>
      {fileUploadError ? (
        <div className="w-[180px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[28%] right-[0%] md:top-[10%] md:right-[1%] transition-all ease-in lg:text-[#373a36] md:text-[#e6e2dd] text-[#373a36]">
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            File not uploaded!
          </Alert>
        </div>
      ) : filePerc > 0 && filePerc < 100 ? (
        <div className="w-[180px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[28%] right-[1.8%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] font-funtext">
          <div className="mb-2 flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <span className="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700">
                <img
                  className="flex-shrink-0 size-5 object-cover"
                  src={formData.avatar || currentUser.avatar}
                  alt=""
                />
              </span>
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Uploading..
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {fileSize} Mb
                </p>
              </div>
            </div>
          </div>
          {/* End Uploading File Content */}
          {/* Progress Bar */}
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div
              className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
              role="progressbar"
              aria-valuenow={filePerc}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                style={{ width: `${filePerc}%` }}
              />
            </div>
            <div className="w-6 text-end">
              <span className="text-sm text-green-400">{filePerc}%</span>
            </div>
          </div>
        </div>
      ) : filePerc === 100 ? (
        <div className="w-[180px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[28%] right-[1.8%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] md:text-[#373a36]">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Image successfully uploaded
          </Alert>
        </div>
      ) : (
        ""
      )}
      <section className="flex flex-col mx-3 mt-12 md:mt-8  bg-[#d48166] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:w-8/12 font-normaltext px-4 py-3">
        <div className="flex flex-col mx-auto w-[95%] md:w-[90%]">
          <form className="mt-2 md:mt-3">
            <h2 className="text-center text-xl mt-1 md:text-3xl font-bold leading-tight text-[#373a36]">
              Profile
            </h2>
            <div className="w-full text-center">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <img
                onClick={() => fileRef.current.click()}
                className="mt-2 inline-block h-14 w-14 rounded-full shadow-md object-cover cursor-pointer"
                src={formData.avatar ||currentUser.avatar}
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
