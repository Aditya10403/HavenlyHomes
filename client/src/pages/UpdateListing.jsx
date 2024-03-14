import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "../components/avatar.png";
import { Upload, IndianRupee, Bed, Bath, Delete } from "lucide-react";
import { useEffect } from "react";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 5000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [sizepermit, setSizepermit] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        if (fileValidation(files[i].name) && sizeValidation(files[i].size)) {
          promises.push(storeImage(files[i]));
        }
        if (!fileValidation(files[i].name)) {
          setError("Unauthorized file");
        }
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else if (files.length == 0) {
      setImageUploadError("Please select a image to upload");
      setUploading(false);
    } else {
      setImageUploadError("Limit: 6 images per listing");
      setUploading(false);
    }
  };

  const fileValidation = (filename) => {
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
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
      filename;
    const permit = extensions.indexOf(name) > -1;
    return permit;
  };

  const sizeValidation = (filesize) => {
    if (filesize / 1024 / 1024 < 2) {
      setSizepermit(true);
      return true;
    }
    setSizepermit(false);
    return false;
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      // const fileName = new Date().getTime() + file.name;
      const fileName = nanoid() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index), // _ - never
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        // [e.target.id]-> name ; e.target.id-> "name"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("Require atleast one image");
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount must be lower-priced");
      }
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      setSuccess(true);
      setTimeout(() => {
        navigate(`/listing/${data._id}`);
      }, 4000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  console.log(formData);
  return (
    <>
      {error ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[1%] right-[8%] md:top-[4%] md:right-[1%] transition-all ease-in text-[#e6e2dd]">
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {error ? error : "Unauthorized"}
          </Alert>
          {setTimeout(() => {
            setError(null);
          }, 5000)}
        </div>
      ) : filePerc > 0 && filePerc < 100 ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[5%] right-[5%] md:top-[4%] md:right-[1%] transition-all ease-in text-[#373a36] font-funtext">
          <div className="mb-2 flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <span className="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700">
                <img
                  className="flex-shrink-0 size-5 object-cover"
                  src={Avatar}
                  alt=""
                />
              </span>
              <div>
                <p className="text-xs font-medium text-gray-800">uploading..</p>
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
      ) : !sizepermit ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[5%] md:top-[4%] md:right-[1%] transition-all ease-in text-[#e6e2dd]">
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Ensure file size less than 2mb
          </Alert>
          {setTimeout(() => {
            setSizepermit(true);
          }, 5000)}
        </div>
      ) : imageUploadError ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[35px] mt-8 absolute items-center top-[1%] right-[8%] md:top-[4%] md:right-[1%] transition-all ease-in text-[#e6e2dd]">
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {imageUploadError}
          </Alert>
          {setTimeout(() => {
            setImageUploadError(false);
          }, 5000)}
        </div>
      ) : success ? (
        <div className="w-[280px] h-[30px] md:w-[300px] md:h-[50px] mt-8 absolute items-center top-[2%] right-[1%] md:top-[10%] md:right-[2%] transition-all ease-in lg:text-[#e6e2dd]">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Listing updated successfully!
          </Alert>
          {setTimeout(() => {
            setSuccess(false);
          }, 4000)}
        </div>
      ) : (
        ""
      )}
      <main className="p-3 max-w-4xl mx-auto font-funtext text-sm">
        <h1 className="text-3xl md:text-4xl font-semibold font-normaltext text-center mt-7 mb-3 text-[#373a36]">
          Update a Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex px-3 py-3 rounded-lg md:px-6 md:py-6 bg-[#d48166]/10 flex-col sm:flex-row gap-4 font-normaltext"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Title"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="40"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border resize-y p-3 rounded-lg"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              maxLength="62"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 accent-green-400"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 accent-green-400"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 accent-green-400"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 accent-green-400"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 accent-green-400"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p className="flex items-center">
                  Beds{" "}
                  <Bed
                    className="ml-1"
                    size={18}
                    color="#d48166"
                    strokeWidth={2.5}
                  />
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p className="flex items-center">
                  Baths{" "}
                  <Bath
                    className="ml-1"
                    size={18}
                    color="#d48166"
                    strokeWidth={2.5}
                  />
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="5000"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {/* {formData.type === 'rent' && ( */}
                  <span className="text-xs flex items-center">
                    (<IndianRupee size={12} /> / month)
                  </span>
                  {/* )}  */}
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="5000"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>

                    {/* {formData.type === 'rent' && ( */}
                    <span className="text-xs flex items-center">
                      (<IndianRupee size={12} /> / month)
                    </span>
                    {/* )} */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-funtext text-gray-600 ml-2 text-xs">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                disabled={uploading}
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-400 font-funtext rounded w-full text-xs"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-3 items-center text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 flex active:bg-green-700 active:text-white transition-colors ease-in 2s"
              >
                {uploading ? "Uploading.." : "Upload"}
                <Upload className="ml-1" size={20} />
              </button>
            </div>
            {/* <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError} 
            </p> */}
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center border-gray-400"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-12 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 flex items-center text-[#ef4444] rounded-lg hover:opacity-75"
                  >
                    Delete
                    <Delete
                      color="#ef4444"
                      strokeWidth={2.5}
                      className="ml-2"
                    />
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className="p-3 bg-[#373a36] text-white rounded-lg uppercase hover:opacity-95 active:opacity-60 disabled:opacity-80 font-semibold"
            >
              {loading ? "Updating..." : "Update listing"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
