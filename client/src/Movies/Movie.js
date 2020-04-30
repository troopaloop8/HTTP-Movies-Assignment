import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const removeMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        let newArr = props.movieList.filter((movie) => {
          return movie.id != id;
        });
        props.setMovieList(newArr);
      })
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <Link
        className="edit-button"
        to={{
          pathname: `/update-movie/${movie.id}`,
          movie: movie,
          setMovie: setMovie,
        }}
      >
        Edit{" "}
      </Link>

      <Link
        className="remove-button"
        onClick={() => {
          removeMovie(movie.id);
        }}
        to="/"
      >
        Remove{" "}
      </Link>
    </div>
  );
}

export default Movie;