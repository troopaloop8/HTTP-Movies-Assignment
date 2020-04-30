import React, { useState } from "react";
import axios from "axios";
import { Alert, Button } from "reactstrap";

//props.location.pathname
function AddMovie(props) {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const [addStatus, setAddStatus] = useState(null);
  //WE SHOULD REALLY CONSOLIDATE THESE AXIOS CALLS INTO A JS FILE FOR IMPORTS OR SOMETHING SINCE MULTIPLE FILES RELY ON SAME OR SIMILAR CODE STRUCTURE

  const addMovie = (id) => {
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => {
        console.log(res);
        //updates app state
        setAddStatus("success");
        props.setMovieList(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  //WE SHOULD REALLY CONSOLIDATE THESE AXIOS CALLS INTO A JS FILE FOR IMPORTS OR SOMETHING SINCE MULTIPLE FILES RELY ON SAME OR SIMILAR CODE STRUCTURE

  const handleChange = (event, setter) => {
    //conditionally use setter to assign stars array, hacky solution to making this more terse
    if (event.target.name === "stars") {
      setter({
        ...movie,
        [event.target.name]: [event.target.value],
      });
    } else {
      setter({ ...movie, [event.target.name]: event.target.value });
    }
  };

  return (
    <div>
      <h1>Add a new movie:</h1>
      <form
        className="movie-update"
        onSubmit={(e) => {
          e.preventDefault();
          addMovie(movie);
        }}
      >
        <label>
          {" "}
          Title:
          <input
            minlength="2"
            name="title"
            onChange={(e) => {
              handleChange(e, setMovie);
            }}
            value={movie.title}
          ></input>
        </label>
        <label>
          {" "}
          Director:
          <input
            minlength="2"
            name="director"
            onChange={(e) => {
              handleChange(e, setMovie);
            }}
            value={movie.director}
          ></input>
        </label>
        <label>
          {" "}
          Metascore:
          <input
            minlength="3"
            name="metascore"
            onChange={(e) => {
              handleChange(e, setMovie);
            }}
            value={movie.metascore}
          ></input>
        </label>
        <label className="starsLabel">
          {" "}
          Stars:
          <textarea
            minlength="2"
            name="stars"
            onChange={(e) => {
              handleChange(e, setMovie);
            }}
            className="stars"
            value={
              movie.stars ? (
                movie.stars.map((star) => {
                  return star;
                })
              ) : (
                <div>no stars found</div>
              )
            }
          />
        </label>
        <Button className="addButton">Add Movie</Button>
        {addStatus != "success" ? null : (
          <Alert color="success">Success: Movie Added to list!</Alert>
        )}
        {/* {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))} */}
      </form>
    </div>
  );
}

export default AddMovie;