import React from 'react';

const SearchBox = ({ searchBox, searchValue, setSearchValue }) => {
  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Type to search'
      ></input>
    </div>
  );
};

export default SearchBox;
