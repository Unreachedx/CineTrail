import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Genres.css";

export default function Genres({ baseUrl, apiKey, genreIds }) {
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
      .then((res) => {
        setAllGenres(res.data.genres);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="genre-container">
      <p>Genres:</p>
      {genreIds?.map((id, index) => {
        for (let i = 0; i < allGenres.length; i++) {
          if (allGenres[i].id === id) {
            return (
              <p key={id}>
                {index === genreIds.length - 1
                  ? `${allGenres[i].name}`
                  : `${allGenres[i].name},`}
              </p>
            );
          }
        }
      })}
    </div>
  );
}