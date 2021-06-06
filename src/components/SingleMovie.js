import React from 'react';
import posterPlaceholder from '../poster-placeholder.png';

const SingleMovie = ({ movieDetails, closeSingleMovie }) => {
  let { Title, Director, Poster, Year, Plot, imdbRating } = movieDetails;
  return (
    <section className='position-fixed top-0 start-0 w-100 h-100 bg-secondary bg-gradient overflow-auto p-1'>
      <div className='d-block w-100 mw-70 p-5'>
        <h2 className='mb-0'>
          <strong>{Title}</strong> <small>({Year})</small>
        </h2>
        <p className='mb-0'>Director: {Director}</p>
        <p className='my-0'>Rating: {imdbRating}</p>
        <div className='d-flex flex-nowrap mt-0 mb-3'>
          {Poster ? (
            <img
              className='d-flex ps-0 p-3 ms-n3 mw-50'
              src={Poster}
              alt='poster'
            />
          ) : (
            <img src={posterPlaceholder} alt='poster-placeholder' />
          )}
          <p className='d-flex p-3 mb-0'>{Plot}</p>
        </div>
        <button
          className='btn btn-primary btn-lg'
          onClick={() => closeSingleMovie()}
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default SingleMovie;
