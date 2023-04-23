import { useEffect, useState } from "react";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);

  const fecthRepositories = () => {
    globalThis
      .fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setRepositories(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fecthRepositories();
  }, []);

  return { repositories };
};
