import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ title, priceMin, priceMax, sort }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://lereacteur-vinted-api.herokuapp.com/offers?";
        url += `title=${title}&priceMin=${priceMin}`;
        if (priceMax !== "") {
          url += `&priceMax=${priceMax}`;
        }
        if (sort !== "") {
          url += `&sort=${sort}`;
        }

        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [title, priceMin, priceMax, sort]);
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      {data.offers &&
        data.offers.map((offer) => (
          <Link key={offer._id} to={`/offer/${offer._id}`}>
            <p>{offer.product_name}</p>
            <img src={offer.product_image.secure_url} alt="Clothe" />
          </Link>
        ))}
    </div>
  );
};

export default Home;
