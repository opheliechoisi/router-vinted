import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Pages
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";
import Publish from "./assets/pages/Publish";
import CheckOutForm from "./assets/components/CheckOutForm";

// Components
import Header from "./assets/components/Header";

const stripePromise = loadStripe(
  "pk_test_51RmxczE3NGJmSiEnu4SBKHhIIAyHLlqKuCtuTAxW6UCYj1wpdHR9HmtA1paidOZ7BmKxDId9Zc6CLUDkc73PaIXV00fMQCMrvB"
);

function App() {
  const options = {
    mode: "payment",
    amount: 2000,
    currency: "usd",
  };

  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  // États des filtres
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
      console.log("Token sauvegardé :", token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
      console.log("Token supprimé");
    }
  };

  useEffect(() => {
    console.log("Token actuel dans les cookies :", Cookies.get("userToken"));
  }, [userToken]);

  return (
    <Router>
      <Header
        handleToken={handleToken}
        userToken={userToken}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        sort={sort}
        setSort={setSort}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              priceMin={priceMin}
              priceMax={priceMax}
              sort={sort}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish userToken={userToken} />} />

        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise} options={options}>
              <CheckOutForm userToken={userToken} />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
