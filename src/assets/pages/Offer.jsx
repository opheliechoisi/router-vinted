import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

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
  return isLoading ? (
    <p>En cours de chergement...</p>
  ) : (
    <div>
      <h2>{data.product_name}</h2>
      {data.product_details.map((detail, index) => {
        const keyName = Object.keys(detail);
        console.log(keyName[0]);

        return (
          <div key={index}>
            <span>{keyName[0]}</span>
            <span>{detail[keyName[0]]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Offer;
