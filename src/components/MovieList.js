import React from 'react';
import posterPlaceholder from '../poster-placeholder.png';

function MovieList({
  movies,
  getMovieDetails,
  favorites,
  dislikes,
  thumbsUpComponent,
  handleFavoritesClick,
  handleDislikesClick,
}) {
  const ThumbsIcons = thumbsUpComponent;
  return (
    <>
      {movies.map((movie, i) => (
        <div
          key={i}
          className='image-container d-flex w-auto justify-content-start m-3'
        >
          {movie.Poster !== 'N/A' ? (
            <img
              alt='poster'
              src={movie.Poster}
              onClick={() => getMovieDetails(movie.imdbID)}
            ></img>
          ) : (
            <img
              src={posterPlaceholder}
              alt={'poster placeholder'}
              height='250'
              width='200'
            />
          )}

          <div className='overlay d-flex align-items-center justify-content-center'>
            <ThumbsIcons
              favorites={favorites}
              movie={movie}
              dislikes={dislikes}
              handleFavoritesClick={handleFavoritesClick}
              handleDislikesClick={handleDislikesClick}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default MovieList;
