import { useState } from "react";
import type { Movie, OMDbResponse } from "./types/Movie";
import MovieCard from "./components/MovieCard";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");// State for the search query
  // State for the list of movies, loading state, and error message
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {// Function to search for movies using the OMDb API
    // If the query is empty, do not perform the search
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {// Make a request to the OMDb API with the search query
      const res = await fetch(`https://www.omdbapi.com/?apikey=7e140d52&s=${query}`);
      const data: OMDbResponse = await res.json();// Parse the response as OMDbResponse type
      // If the response is successful, set the movies state
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {// If the response indicates an error, set the error state
        setError(data.Error || "No results found.");
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="App">
    <div className="container">
      <h1>Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
          placeholder="Search for a movie..."
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {totalResults > 0 && (
        <p className="results-count">
          Found {totalResults} {totalResults === 1 ? "result" : "results"} for "{query}"
        </p>
      )}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
    </main>
  );
}
