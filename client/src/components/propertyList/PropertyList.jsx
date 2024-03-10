import { useEffect, useState } from 'react';
import useFetch from "../hooks/useFetch.js";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("https://nextbooking-api.vercel.app/api/hotels/countByType");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch data:', error);
    } else {
      // Ensure all images are loaded before rendering
      Promise.all([
        loadImage("https://i.im.ge/2024/02/14/cWpYDS.photo-1618773928121-c32242e63f39q80w2070autoformatfitcropixlibrb-4-0.jpg"),
        loadImage("https://i.im.ge/2024/02/14/cWpxey.photo-1560448204-e02f11c3d0e2q80w2070autoformatfitcropixlibrb-4-0.jpg"),
        loadImage("https://i.im.ge/2024/02/14/cWpAlx.photo-1592555059503-0a774cb8d477q80w1935autoformatfitcropixlibrb-4-0.jpg"),
        loadImage("https://i.im.ge/2024/02/14/cWpP6L.photo-1564013799919-ab600027ffc6q80w2070autoformatfitcropixlibrb-4-0.jpg"),
        loadImage("https://i.im.ge/2024/02/14/cWp8SF.photo-1510798831971-661eb04b3739q80w1974autoformatfitcropixlibrb-4-0.jpg")
      ])
      .then((loadedImages) => {
        setImages(loadedImages);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
    }
  }, [error]);

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
