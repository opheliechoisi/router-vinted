import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Formulaire envoyé !");
    console.log("Token actuel :", userToken);

    if (!picture) {
      alert("Veuillez ajouter une photo avant de publier.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Réponse de l'API :", response.data);
      alert("Votre article a été publié avec succès !");
    } catch (error) {
      console.error("Erreur lors de la publication :", error);
      alert("Une erreur est survenue lors de la publication.");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirection si l'utilisateur n'est pas connecté
  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        {!picture ? (
          <div className="file-container">
            <label htmlFor="file">Ajouter une photo</label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={(event) => setPicture(event.target.files[0])}
            />
          </div>
        ) : (
          <img src={URL.createObjectURL(picture)} alt="preview" />
        )}

        <textarea
          rows={6}
          cols={20}
          style={{ maxWidth: "200px", minWidth: "200px" }}
          placeholder="Description de l'article"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <input
          type="text"
          placeholder="ex: Chemise Sézane verte"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="ex: Zara"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <input
          type="text"
          placeholder="ex: L/40/12"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
        <input
          type="text"
          placeholder="ex: Fushia"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <input
          type="text"
          placeholder="Neuf avec étiquette"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        />
        <input
          type="text"
          placeholder="ex: Paris"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <input
          type="number"
          placeholder="0,00 €"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Publication en cours..." : "Créer la nouvelle offre"}
        </button>
      </form>
    </div>
  );
};

export default Publish;
