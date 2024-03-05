import React from "react";
import { Upload, IndianRupee, Bed, Bath } from "lucide-react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto font-funtext text-sm">
      <h1 className="text-3xl md:text-4xl font-semibold font-normaltext text-center mt-7 mb-3 text-[#373a36]">
        Create a Listing
      </h1>
      <form className="flex px-3 py-3 rounded-lg md:px-6 md:py-6 bg-[#d48166]/10 flex-col sm:flex-row gap-4 font-normaltext">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            // onChange={handleChange}
            // value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border resize-y p-3 rounded-lg"
            id="description"
            required
            // onChange={handleChange}
            // value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            // onChange={handleChange}
            // value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 accent-green-400"
                // onChange={handleChange}
                // checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 accent-green-400"
                // onChange={handleChange}
                // checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 accent-green-400"
                // onChange={handleChange}
                // checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 accent-green-400"
                // onChange={handleChange}
                // checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 accent-green-400"
                // onChange={handleChange}
                // checked={formData.offer}
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
                // onChange={handleChange}
                // value={formData.bedrooms}
              />
              <p className="flex items-center">Beds <Bed className="ml-1" size={18} color="#d48166" strokeWidth={2.5}/></p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                // onChange={handleChange}
                // value={formData.bathrooms}
              />
              <p className="flex items-center">Baths <Bath className="ml-1" size={18} color="#d48166" strokeWidth={2.5} /></p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                // onChange={handleChange}
                // value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {/* {formData.type === 'rent' && ( */}
                  <span className='text-xs flex items-center'>(<IndianRupee size={12}/> / month)</span>
                {/* )}  */}
              </div>
            </div>
             {/* {formData.offer && ( */}
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  // onChange={handleChange}
                  // value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {/* {formData.type === 'rent' && ( */}
                    <span className='text-xs flex items-center'>(<IndianRupee size={12}/> / month)</span>
                  {/* )} */}
                </div>
              </div>
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
              //   onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-400 font-funtext rounded w-full text-xs"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              //   disabled={uploading}
              //   onClick={handleImageSubmit}
              className="p-3 items-center text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 flex active:bg-green-700 active:text-white transition-colors ease-in 2s"
            >
              Upload
              <Upload className="ml-1" size={20} />
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {/* {imageUploadError && imageUploadError} */}
          </p>
          {/* {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key=""
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src=""
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))} */}
          <button className="p-3 bg-[#373a36] text-white rounded-lg uppercase hover:opacity-95 active:opacity-60 disabled:opacity-80 font-semibold">
            Create listing
          </button>
          {/* {error && <p className='text-red-700 text-sm'>{error}</p>} */}
        </div>
      </form>
    </main>
  );
}
