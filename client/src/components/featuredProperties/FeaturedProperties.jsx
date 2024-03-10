import { useState } from 'react';
import useFetch from "../hooks/useFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  // Function to handle image loading
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <div className="fp">
      {loading ? (
        "Loading, please wait..."
      ) : error ? (
        `Error fetching data: ${error}`
      ) : (
        <>
          {data && data.map((item) => (
            <div className="fpItem" key={item._id}>
              {/* Check if photos exist */}
              {item.photos && item.photos.length > 0 ? (
                <img
                  src={item.photos[0]}
                  alt=""
                  className="fpImg"
                  onLoad={handleImageLoad} // Add onLoad event handler
                />
              ) : (
                <div className="fpImgPlaceholder" /> // Placeholder if no photo
              )}
              <div className="fpInfo">
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
              </div>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
            </div>
          ))}
          {/* Show loading message if images are still loading */}
          {!imagesLoaded && <div className="fpLoading">Loading images...</div>}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
