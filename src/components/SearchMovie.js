import React from "react";

export default function SearchMovies() {
  const [query, setQuery] = React.useState("");
  const [movies, setMovies] = React.useState([1]);
  const [loading, setLoading] = React.useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=true`;
    try {
      setLoading(true)
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setLoading(false)
    } catch (err) {
      console.error(err);
    }
  };
  const movieElements = movies
    .filter((movie) => movie.poster_path)
    .map((movie) => (
      <div className="card" key={movie.id}>
        <img
          className="card--image"
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
          alt={movie.title + " poster"}
        />
        <div className="card--content">
          <h3 className="card--title">
            <a
              className="hover"
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {movie.title}
            </a>
          </h3>
          <p>
            <small>RELEASE DATE: {movie.release_date}</small>
          </p>
          <p>
            <small>RATING: {movie.vote_average}</small>
          </p>
          <p className="card--desc">{movie.overview}</p>
        </div>
      </div>
    ));

    const noResults = <h3 className = "no-results"> No Movies Found!</h3>
    const loadingElement = <h3 className = "no-results">Loading...</h3>

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          oninvalid="alert('Please provide a name to search!')"
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {loading? loadingElement : <div className="card-list">{movies.length===0? noResults : movieElements}</div>}
    </>
  );
}
