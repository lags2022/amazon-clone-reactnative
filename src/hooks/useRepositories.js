import { useEffect, useState } from "react";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);

  const fecthRepositories = () => {
    globalThis
      .fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setRepositories(() =>
          data.map((d) => {
            const rating = Math.round(d.rating.rate);
            const hasprime = rating > 3;
            return { ...d, rating, hasprime };
          })
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fecthRepositories();
  }, []);

  return { repositories };
};
