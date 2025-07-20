import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleBuy = () => {
    navigate("/payment", {
      state: {
        title: data.product_name,
        price: data.product_price,
      },
    });
  };

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <h2>{data.product_name}</h2>
      {data.product_details.map((detail, index) => {
        const keyName = Object.keys(detail);
        return (
          <div key={index}>
            <span>{keyName[0]}</span>
            <span>{detail[keyName[0]]}</span>
          </div>
        );
      })}
      <button onClick={handleBuy}>Acheter</button>
    </div>
  );
};

export default Offer;
