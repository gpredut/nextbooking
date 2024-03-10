import { useEffect, useState } from 'react';
import './featured.css';

const Featured = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://nextbooking-api.vercel.app/api/hotels/countByCity?cities=bucharest,sinaia,hunedoara");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not in JSON format');
        }
        const jsonData = await response.json();
        console.log(jsonData); // Log fetched data to see its structure and content
        setCitiesData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error); // Log error for debugging
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const images = [
    "https://i.im.ge/2024/02/14/cWpWV9.photo-1566827954254-0c0692424c04q80w1974autoformatfitcropixlibrb-4-0.jpg",
    "https://i.im.ge/2024/02/14/cWpV08.photo-1608297644370-d98dfbbe30faq80w1964autoformatfitcropixlibrb-4-0.jpg",
    "https://i.im.ge/2024/02/14/cWvM51.photo-1599082786861-4f1f038a9fb5q80w1973autoformatfitcropixlibrb-4-0.jpg"
  ];

  return (
    <div className="featured">
      {loading ? (
        "Loading, please wait"
      ) : error ? (
        `Error fetching data: ${error}`
      ) : (
        <>
          {citiesData.map((cityData, index) => (
            <div className="featuredItem" key={index}>
              <img
                src={images[index]}
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>{cityData.city}</h1>
                <h2>{cityData.count} properties</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Featured;
