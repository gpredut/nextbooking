import useFetch from "../hooks/useFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  if (loading) {
    // Render loading message
    return <div>Loading, please wait...</div>;
  }

  if (error || !Array.isArray(data)) {
    // Render error message or other UI when data is not available
    return <div>Error loading properties</div>;
  }

  return (
    <div className="fp">
      {data.map((item) => (
        <div className="fpItem" key={item._id}>
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
      ))}
    </div>
  );
};

export default FeaturedProperties;
