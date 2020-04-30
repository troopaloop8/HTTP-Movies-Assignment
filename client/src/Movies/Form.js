import React, { useState, useEffect } from "react";
import axios from "axios";

//props.location.pathname
function Form(props) {
  const [movie, setMovie] = useState({ id: props.match.params.id });
  const [movieTitle, setMovieTitle] = useState("nothing yet");

  //WE SHOULD REALLY CONSOLIDATE THESE AXIOS CALLS INTO A JS FILE FOR IMPORTS OR SOMETHING SINCE MULTIPLE FILES RELY ON SAME OR SIMILAR CODE STRUCTURE
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setMovieTitle(res.data.title);
      })
      .catch((err) => console.log(err.response));
  };

  const updateMovie = (id) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        setMovie(res.data);
        setMovieTitle(res.data.title);

        //updates app state
        let newArr = [...props.movieList];
        newArr[id] = res.data;
        props.setMovieList(newArr);
      })
      .catch((err) => console.log(err.response));
  };

  //WE SHOULD REALLY CONSOLIDATE THESE AXIOS CALLS INTO A JS FILE FOR IMPORTS OR SOMETHING SINCE MULTIPLE FILES RELY ON SAME OR SIMILAR CODE STRUCTURE

  useEffect(() => {
    if (!props.location.movie) {
      console.log("no passed data, fetching from server...");
      fetchMovie(props.match.params.id);
    } else {
      setMovie(props.location.movie);
      setMovieTitle(props.location.movie.title);

      let newArr = [...props.movieList];
      newArr[props.location.movie.id] = props.location.movie;
      props.setMovieList(newArr);
    }
  }, []);

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
      <h1>You are editing: {movieTitle}</h1>
      <form className="movie-update">
        <label>
          {" "}
          Title:
          <input
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
        <button
          onClick={(e) => {
            e.preventDefault();
            updateMovie(movie.id);
          }}
        >
          Update
        </button>
        {/* {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))} */}
      </form>
    </div>
  );
}

export default Form;