import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [catFact, setCatFact] = useState("");
  const [catImageUrl, setCatImageUrl] = useState("");

  useEffect(() => {
    const fecthCatFat = async () => {
      try {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        setCatFact(data.fact);
      } catch (e) {
        console.error(e);
      }
    };

    fecthCatFat();
  }, []);

  useEffect(() => {
    if (catFact) {
      const generateCatImage = async () => {
        try {
          const firstWord = catFact.split(" ", 3).join(" ");
          const response = await fetch(
            `https://cataas.com/cat/says/${firstWord}`
          );
          if (response.ok) {
            const data = await response.blob();
            const imageUrl = URL.createObjectURL(data);
            setCatImageUrl(imageUrl);
          } else {
            console.error("Error fetching cat image: ", response.statusText);
          }
        } catch (e) {
          console.error(e);
        }
      };
      generateCatImage();
    }
  }, [catFact]);
  return (
    <>
      <h1>Random cat fact</h1>
      {catFact && <p>{catFact}</p>}
      {catImageUrl && (
        <img
          src={catImageUrl}
          alt={catFact + "image"}
          height={400}
          width={400}
        />
      )}
      {catImageUrl && <p>Image generate on the first word of the fact cat.</p>}
    </>
  );
}

export default App;
