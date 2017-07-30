import React from 'react'

const SearchInput = (props) => {
  return (
    <div className="search-books-input-wrapper">
      <input
        type="text"
        value={props.query}
        onChange={(event) => props.onQueryChange(event.target.value)}
        placeholder="Search by title or author"/>
    </div>
  )
}

export default SearchInput
