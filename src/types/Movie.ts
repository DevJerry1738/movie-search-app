export interface Movie {// Represents a movie object from the OMDb API
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
  Genre: string; // Genre of the movie
}
export interface OMDbResponse {// Represents the response from the OMDb API
  Search: Movie[];// Array of movies returned from the search
  totalResults: string;// Total number of results found 
  Response: "True" | "False"; // Indicates if the request was successful
  Error?: string;   // Optional error message if the request failed
}