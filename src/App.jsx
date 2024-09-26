import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./card.jsx";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("..."); // Valeur par défaut pour le premier affichage
  const [isSearching, setIsSearching] = useState(false);

  const fetchHack = () => {
    setIsSearching(true);
    axios
      .get(`http://hn.algolia.com/api/v1/search?query=${search}`)
      .then((res) => {
        const processedData = res.data.hits.map((data) => ({
          ...data,
          author: data.author?.startsWith("author_")
            ? data.author.substring(7)
            : data.author,
        }));
        setData(processedData);
        setIsSearching(false); // Arrêter l'indicateur de recherche
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération :", error);
        setIsSearching(false); // Arrêter l'indicateur même en cas d'erreur
      });
  };

  useEffect(() => {
    fetchHack(); // Charger des articles par défaut au chargement de la page
  }, []); // Le tableau de dépendances vide assure que cela s'exécute une seule fois au montage

  useEffect(() => {
    if (search) {
      fetchHack();
    }
  }, [search]); // Exécuter fetchHack chaque fois que `search` change

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold flex justify-center m-5">
          Hacker News
        </h1>
      </div>
      <div className="flex justify-center w-full">
        <input
          type="text"
          placeholder="Rechercher sur Hacker News"
          className="border-2 border-blue-500 rounded-md p-2 w-full p-3 m-5"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {isSearching ? <p>Recherche en cours...</p> : null}
      </div>
      <div>
        {data.length > 0 ? ( // S'assurer que data n'est pas vide avant de mapper
          data.map((item) => (
            <div
              key={item.objectID}
              className="transform transition duration-300 hover:scale-105"
              onClick={() => window.open(item.url, "_blank")}
            >
              <Card
                title={item.title}
                created_at={item.created_at}
                url={item.url}
                author={item.author}
                point={item.points}
                commentNumber={item.num_comments}
              />
            </div>
          ))
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </div>
    </>
  );
}

export default App;
