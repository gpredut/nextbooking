import { useEffect, useState } from 'react';
import useFetch from "../hooks/useFetch.js";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading } = useFetch("https://nextbooking-api.vercel.app/api/hotels/countByType");
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Ensure all images are loaded before rendering
    Promise.all(
      data.map((item) => loadImage(item.imageUrl))
    )
    .then((loadedImages) => {
      setImages(loadedImages);
    })
    .catch((error) => {
      console.error('Error loading images:', error);
    });
  }, [data]);

  const loadImage = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load image');
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error loading image:', error);
      return null;
    }
  };

  return (
    <div className="pList">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data &&
            data.map((item, i) => (
              <div className="pListItem" key={item.type}>
                <img src={images[i]} alt={item.type} className="pListImg" />
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
