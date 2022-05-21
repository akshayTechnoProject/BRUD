import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <input
      type="text"
      className="form-control"
      style={{
        maxWidth: '300px',
        fontSize: '12px',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        borderRadius: '20px',
      }}
      placeholder="Search"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default Search;
