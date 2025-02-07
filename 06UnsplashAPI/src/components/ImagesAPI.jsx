import React, { useState } from "react";
import axios from "axios";

const ImagesAPI = () => {
  const [imageName, setImageName] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleImages = async () => {
    if (!imageName.trim()) {
      setError("Enter Image Name To Search");
      return;
    }

    setLoading(true);
    setError("");

    const ApiUrl = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${imageName}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`;

    try {
      const { data } = await axios.get(ApiUrl);
      setImages(data.results);
    } catch (error) {
      console.error("Server issue or image not found", error);
      setImages([]);
      setError("Image not found, check your spelling!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="w-full sm:w-80 h-12 border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search for images..."
        />
        <button
          onClick={HandleImages}
          className="w-40 h-12 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all"
        >
          {loading ? "Loading..." : "Get Images"}
        </button>
      </div>

      {error && <h1 className="text-red-500 mt-4 text-center">{error}</h1>}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {images.length > 0 &&
          images.map((ima) => (
            <div key={ima.id} className="rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105">
              <img
                src={ima.urls.small}
                alt={ima.alt_description}
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-center mt-2 text-gray-700 px-3">{ima.alt_description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImagesAPI;
