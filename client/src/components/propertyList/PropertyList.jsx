import useFetch from "../hooks/useFetch.js";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels/countByType"
  );

  // Check for errors during data fetching
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const images = [
    "https://i.im.ge/2024/02/14/cWpYDS.photo-1618773928121-c32242e63f39q80w2070autoformatfitcropixlibrb-4-0.jpg",
    "https://i.im.ge/2024/02/14/cWpxey.photo-1560448204-e02f11c3d0e2q80w2070autoformatfitcropixlibrb-4-0.jpg",
    "https://i.im.ge/2024/02/14/cWpAlx.photo-1592555059503-0a774cb8d477q80w1935autoformatfitcropixlibrb-4-0.jpg",
    "https://i.im.ge/2024/02/14/cWpP6L.photo-1564013799919-ab600027ffc6q80w2070autoformatfitcropixlibrb-4-0.jpg",
    "https://i.im.ge/2024/02/14/cWp8SF.photo-1510798831971-661eb04b3739q80w1974autoformatfitcropixlibrb-4-0.jpg",
  ];

  return (
    <div className="pList">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {Array.isArray(data) &&
            data.map((item, i) => (
              <div className="pListItem" key={i}>
                <img src={images[i]} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{item.type}</h1>
                  <h2>
                    {item.count} {item.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
