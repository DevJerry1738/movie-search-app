// components/MovieCard.tsx
import { type FC } from "react";
import { type Movie } from "../types/Movie";
import "./MovieCard.css";

const MovieCard: FC<{ movie: Movie }> = ({ movie }) => {// Represents a single movie card component
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year} • {movie.Type}</p>
        <p>Genre:{movie.Genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;
