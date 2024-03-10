import useFetch from "../hooks/useFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("https://nextbooking-api.vercel.app/api/hotels?featured=true&limit=4");

  // Check for errors during data fetching
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="fp">
      {loading ? (
        "Loading, please wait"
      ) : (
        <>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <div className="fpItem" key={item._id}>
                {/* Check if photos exist */}
                {item.photos && item.photos.length > 0 && (
                  <img src={item.photos[0]} alt="" className="fpImg" />
                )}
                <div className="fpInfo">
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                </div>
                <span className="fpPrice">
                  Starting from ${item.cheapestPrice}
                </span>
              </div>
            ))
          ) : (
            <div>No featured properties available</div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
