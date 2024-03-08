import {
  SquarePen,
  UserX,
  LogOut,
  NotebookTabs,
  Bolt,
  XCircle,
} from "lucide-react";
import Avatar from "../components/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signInSuccess,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { nanoid } from "@reduxjs/toolkit";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, err } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [alertError, setAlertError] = useState(null);
  const [error, setError] = useState(false);
  const [deleteOption, setdeleteOption] = useState(false);
  const [sizepermit, setSizepermit] = useState(true);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = nanoid() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const extensions = [
      "gif",
      "svg",
      "webp",
      "jpg",
      "jpeg",
      "png",
      "bmp",
      "xbm",
      "tif",
      "jfif",
      "ico",
      "tiff",
      "svgz",
      "bmp",
      "pjp",
      "apng",
      "pjpeg",
      "avif",
    ];
    const name =
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length) ||
      file.name;
    const permit = extensions.indexOf(name) > -1;

    if (file.size / 1024 / 1024 < 2) {
      setSizepermit(true);
    } else {
      setSizepermit(false);
    }

    if (permit && sizepermit) {
      // track changes
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const size = (snapshot.bytesTransferred / 1024 / 1024).toFixed(2);
          setFilePerc(Math.round(progress));
          setFileSize(size);
        },
        (error) => {
          setFileUploadError(true);
          // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          );
        }
      );
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart()); // *
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setAlertError("Email or username already in use");
        dispatch(updateUserFailure(data.message));
        return;
      }
      setAlertError(null);
      dispatch(updateUserSuccess(data)); // *
      setUpdateSuccess(true);
      setAlertSuccess(true);
    } catch (error) {
      setAlertError(error.message);
      dispatch(updateUserFailure(error.message));
    }
  };

  const handledeleteBtn = () => {
    setdeleteOption(!deleteOption);
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart()); // *
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        // setAlertError(data.message);
        dispatch(deleteUserFailure(data.message));
        return;
      }
      // setAlertError(null);
      dispatch(deleteUserSuccess(data)); // *
      // setAlertSuccess(true);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      // setAlertError(null);
      dispatch(signOutUserSuccess(data)); // *
      // setAlertSuccess(true);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setAlertError(null);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setAlertError(data.message);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setAlertError("Error showing listings");
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setDeleteSuccess(false);
        return;
      }
      setDeleteSuccess(true);
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setDeleteSuccess(false);
    }
  };
  return (
    <>
      {deleteOption ? (
        <div className="w-[300px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[5%] md:top-[10%] md:right-[1%] transition-all ease-in lg:text-[#e6e2dd] md:text-[#d48166] text-[#d48166]">
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            <button
              onClick={handleDeleteUser}
              className="text-sm border border-black active:text-xs text-red-500 rounded px-2 py-1 mr-2"
            >
              Delete Account
            </button>
            <button
              onClick={handledeleteBtn}
              className="text-sm active:text-xs border border-black rounded px-2 py-1"
            >
              Cancel
            </button>
          </Alert>
        </div>
      ) : (
        ""
      )}
      {error ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[5%] md:top-[10%] md:right-[1%] transition-all ease-in lg:text-[#e6e2dd] md:text-[#d48166] text-[#d48166]">
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Unauthorized file
          </Alert>
          {setTimeout(() => {
            setError(false);
          }, 5000)}
        </div>
      ) : alertError ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[5%] md:top-[10%] md:right-[1%] transition-all ease-in lg:text-[#e6e2dd] md:text-[#d48166] text-[#d48166]">
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            {alertError ? alertError : "Unauthorized"}
          </Alert>
          {setTimeout(() => {
            setAlertError(null);
          }, 5000)}
        </div>
      ) : !sizepermit ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[5%] md:top-[10%] md:right-[1%] transition-all ease-in lg:text-[#e6e2dd] md:text-[#d48166] text-[#d48166]">
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Ensure file size less than 2mb
          </Alert>
          {setTimeout(() => {
            setSizepermit(true);
          }, 5000)}
        </div>
      ) : filePerc > 0 && filePerc < 100 ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[5%] right-[5%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#373a36] font-funtext">
          <div className="mb-2 flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <span className="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700">
                <img
                  className="flex-shrink-0 size-5 object-cover"
                  src={formData.avatar || Avatar}
                  alt=""
                />
              </span>
              <div>
                <p className="text-xs font-medium text-gray-800">{file.name}</p>
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
      ) : alertSuccess ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[1%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#d48166] md:text-[#d48166] lg:text-[#e6e2dd]">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Profile successfully updated
          </Alert>
          {setTimeout(() => {
            setAlertSuccess(false);
          }, 4000)}
        </div>
      ) : deleteSuccess ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[1%] md:top-[10%] md:right-[2%] transition-all ease-in text-[#d48166] md:text-[#d48166] lg:text-[#e6e2dd]">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Listing deleted successfully!
          </Alert>
          {setTimeout(() => {
            setDeleteSuccess(false);
          }, 4000)}
        </div>
      ) : (
        ""
      )}
      <section className="flex flex-col mx-3 mt-12 md:mt-8  bg-[#d48166] rounded-xl shadow-xl overflow-hidden md:mx-auto max-w-sm lg:w-8/12 font-normaltext px-4 py-3">
        <div className="flex flex-col mx-auto w-[95%] md:w-[90%]">
          <form onSubmit={handleSubmit} className="mt-2 md:mt-3">
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
                src={formData.avatar || currentUser.avatar}
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
                    disabled={deleteOption}
                    defaultValue={currentUser.username}
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
                  className="text-sm md:text-base font-medium text-black"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-1 md:mt-2">
                  <input
                    disabled={deleteOption}
                    defaultValue={currentUser.email}
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
                    className="text-sm md:text-base font-medium text-black"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-1 md:mt-2">
                  <input
                    disabled={deleteOption}
                    className="flex h-8 md:h-10 w-full rounded-md border border-[#e6e2dd] bg-white px-3 py-2 text-sm placeholder:text-[#e6e2dd] focus:outline-none focus:ring-1 focus:ring-[#e6e2dd] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  disabled={loading || deleteOption}
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#373a36] px-1.5 py-1.5 md:px-3.5 md:py-2.5 font-semibold leading-7 text-white hover:bg-[#373a36]/90
                    active:bg-[#373a36]/70"
                >
                  {loading ? "Loading..." : "Update"}
                  <SquarePen className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 mb-2 space-y-3">
            <Link
              to={"/create-listing"}
              disabled={deleteOption}
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md bg-green-600 px-1.5 py-1.5 md:px-3.5 md:py-2.5 font-semibold text-white hover:bg-gray-100 hover:text-green-500 active:bg-green-500/70 transition-all duration-200 ease-out"
            >
              Create Listing
            </Link>
          </div>
        </div>
      </section>
      <div className="mx-2 md:mx-auto max-w-sm lg:w-8/12 mt-4 flex justify-between">
        <button
          disabled={deleteOption}
          onClick={handledeleteBtn}
          className="mx-2 bg-red-500 px-3 py-2 text-center rounded hover:bg-red-500/80 active:bg-red-500/60"
        >
          <UserX className="ml-2" size={20} />
        </button>
        <button
          disabled={deleteOption}
          onClick={handleShowListings}
          className="mx-2 text-sm font-funtext flex items-center bg-green-500 px-3 py-2 text-center rounded hover:bg-green-500/80 active:bg-green-500/60"
        >
          Show Listings
          <NotebookTabs className="ml-2" size={20} />
        </button>
        <button
          disabled={deleteOption}
          onClick={handleSignOut}
          className="mx-2 bg-blue-500 px-3 py-2 text-center rounded hover:bg-blue-500/80 active:bg-blue-500/60"
        >
          <LogOut className="ml-2" size={20} />
        </button>
      </div>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col mx-2 items-center md:mx-auto max-w-sm lg:w-8/12 mt-4 justify-between rounded-lg p-3 gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="mx-2 w-full items-center mt-4 flex justify-between border border-slate-300 rounded-lg p-3 gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="flex-1 text-slate-700 font-semibold hover:underline truncate ml-2"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col item-center gap-3 mr-2">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  <XCircle color="#b91c1c" size={20} />
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">
                    <Bolt color="#15803d" size={20} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
