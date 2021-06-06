import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import FavoritesList from './components/FavoritesList';
import DislikesList from './components/DislikesList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import ThumbsIcons from './components/ThumbsIcons';
import SingleMovie from './components/SingleMovie';

// TODO
// negative margin bootstrap thing

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [movieDetails, setMovieDetails] = useState({});
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);

  const getMovieDetails = async (searchValue) => {
    const url = `http://www.omdbapi.com/?i=${searchValue}&apikey=347fb786`;

    const response = await fetch(url);
    const responseJSON = await response.json();
    if (responseJSON.Response) setMovieDetails(responseJSON);
  };

  const getMoviesRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=347fb786`;

    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) setMovies(responseJSON.Search);
  };

  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    );

    const movieDislikes = JSON.parse(
      localStorage.getItem('react-movie-app-dislikes')
    );

    if (movieFavorites) {
      setFavorites(movieFavorites);
      setThumbsUpCount(movieFavorites.length);
    }

    if (movieDislikes) {
      setDislikes(movieDislikes);
      setThumbsDownCount(movieDislikes.length);
    }
  }, []);

  const saveToLocalStorage = (favorites, dislikes) => {
    localStorage.setItem(
      'react-movie-app-favorites',
      JSON.stringify(favorites)
    );
    localStorage.setItem('react-movie-app-dislikes', JSON.stringify(dislikes));
  };

  const addFavoriteMovie = (movie) => {
    if (!favorites.some((favorite) => favorite.imdbID === movie.imdbID)) {
      const newFavorites = [...favorites, movie];
      const newDislikes = dislikes.filter(
        (dislike) => dislike.imdbID !== movie.imdbID
      );
      setFavorites(newFavorites);
      setThumbsUpCount(newFavorites.length);
      if (dislikes.some((disliked) => disliked.imdbID === movie.imdbID)) {
        setDislikes(newDislikes);
        setThumbsDownCount(newDislikes.length);
      }
      saveToLocalStorage(newFavorites, newDislikes);
    }
  };

  const addDislike = (movie) => {
    if (!dislikes.some((dislike) => dislike.imdbID === movie.imdbID)) {
      const newDislikes = [...dislikes, movie];
      const newFavorites = favorites.filter(
        (favorite) => favorite.imdbID !== movie.imdbID
      );
      setDislikes(newDislikes);
      setThumbsDownCount(newDislikes.length);
      if (favorites.some((favorite) => favorite.imdbID === movie.imdbID)) {
        setFavorites(newFavorites);
        setThumbsUpCount(newFavorites.length);
      }
      saveToLocalStorage(newFavorites, newDislikes);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavorites = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavorites);
    setThumbsUpCount(newFavorites.length);
    saveToLocalStorage(newFavorites, dislikes);
  };

  const removeDislike = (movie) => {
    const newDislikes = dislikes.filter(
      (disliked) => disliked.imdbID !== movie.imdbID
    );
    setDislikes(newDislikes);
    setThumbsDownCount(newDislikes.length);
    saveToLocalStorage(favorites, newDislikes);
  };

  const closeSingleMovie = () => {
    setMovieDetails({});
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Search Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className='row'>
        <MovieList
          movies={movies}
          getMovieDetails={getMovieDetails}
          favorites={favorites}
          dislikes={dislikes}
          handleFavoritesClick={addFavoriteMovie}
          handleDislikesClick={addDislike}
          thumbsUpComponent={ThumbsIcons}
        />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies You Liked' />
      </div>
      <div className='row'>
        <FavoritesList
          movies={favorites}
          getMovieDetails={getMovieDetails}
          // send favorites prop down again to do fill color check for thumbs up button
          favorites={favorites}
          dislikes={dislikes}
          handleFavoritesClick={removeFavoriteMovie}
          handleDislikesClick={addDislike}
          thumbsUpComponent={ThumbsIcons}
        />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies You Disliked' />
      </div>
      <div className='row'>
        <DislikesList
          movies={dislikes}
          getMovieDetails={getMovieDetails}
          // send favorites prop down again to do fill color check for thumbs up button
          favorites={favorites}
          dislikes={dislikes}
          handleFavoritesClick={addFavoriteMovie}
          handleDislikesClick={removeDislike}
          thumbsUpComponent={ThumbsIcons}
        />
      </div>

      {typeof movieDetails.Title != 'undefined' ? (
        <SingleMovie
          movieDetails={movieDetails}
          closeSingleMovie={closeSingleMovie}
        />
      ) : (
        false
      )}
    </div>
  );
};

export default App;
