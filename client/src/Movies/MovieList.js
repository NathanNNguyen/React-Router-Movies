import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

const MovieList = props => {
  // let history = useHistory();
  // console.log(history);
  const [movies, setMovies] = useState([]);
  useEffect(() => {

    // const getMovies = () => {
    //   axios
    //     .get('http://localhost:5000/api/movies')
    //     .then(response => {
    //       console.log(response.data);
    //       setMovies(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Server Error', error);
    //     });
    // }

    const getMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        setMovies(res.data);
      } catch (error) {
        console.error('Server Error', error);
      }
    }

    getMovies();
  }, []);

  // const goToMovieDetailsHandler = id => {
  //   history.push(`/movies/${id}`);
  // }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} /* onGoToMovieDetails={goToMovieDetailsHandler} */ />
      ))}
    </div>
  );
}

function MovieDetails({ onGoToMovieDetails, movie }) {
  const { title, director, metascore, stars, id } = movie;

  return (
    <NavLink to={`movies/${id}`}>
      <div className="movie-card" /* onClick={() => onGoToMovieDetails(id)} */ >
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
    </NavLink>
  );
}

export default MovieList;
