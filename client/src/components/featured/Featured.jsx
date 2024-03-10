import { useEffect, useState } from 'react';
import './featured.css';

const Featured = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hotels/countByCity?cities=bucharest,sinaia,hunedoara");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not in JSON format');
        }
        const jsonData = await response.json();
        setCitiesData(jsonData);
      } catch (error) {
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
            <div className="featuredItem" key={cityData.name}>
              <img
                src={images[index]}
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>{cityData.name}</h1>
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
