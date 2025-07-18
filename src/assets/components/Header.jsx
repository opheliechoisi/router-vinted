import { Link } from "react-router-dom";

const Header = ({ handleToken, userToken, title, setTitle }) => {
  return (
    <div>
      <p>Logo</p>
      <input
        type="text"
        placeholder="Recherche des articles"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {!userToken ? (
        <>
          <Link to="/login">
            <button>Connexion</button>
          </Link>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
        </>
      ) : (
        <button
          onClick={() => {
            handleToken();
          }}
        >
          Déconnexion
        </button>
      )}
    </div>
  );
};

export default Header;
