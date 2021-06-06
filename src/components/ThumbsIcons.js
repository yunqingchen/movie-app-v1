import React from 'react';
import ThumbsUpIcon from './ThumbsUpIcon';
import ThumbsDownIcon from './ThumbsDownIcon';

const ThumbsIcons = ({
  favorites,
  dislikes,
  movie,
  handleFavoritesClick,
  handleDislikesClick,
}) => {
  return (
    <>
      <div onClick={() => handleFavoritesClick(movie)}>
        <ThumbsUpIcon
          fill={
            favorites.some((favorite) => favorite.imdbID === movie.imdbID)
              ? 'green'
              : 'white'
          }
        />
      </div>
      <div onClick={() => handleDislikesClick(movie)}>
        <ThumbsDownIcon
          fill={
            dislikes.some((disliked) => disliked.imdbID === movie.imdbID)
              ? 'red'
              : 'white'
          }
        />
      </div>
    </>
  );
};

export default ThumbsIcons;
