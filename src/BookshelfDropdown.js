import React from 'react'
import bookshelves from './bookshelves'
import PropTypes from 'prop-types'

const BookshelfDropdown = (props) => {
  const { selectedShelf, onShelfChange } = props
  return (
    <select value={selectedShelf} onChange={(event) => (onShelfChange(event.target.value))}>
      <option value="none" disabled>Move to...</option>
      {
        bookshelves.map((bookshelf) => (
          <option
            key={bookshelf.id}
            value={bookshelf.id}>
              {bookshelf.name}
          </option>
        ))
      }
    </select>
  )
}

BookshelfDropdown.propTypes = {
  selectedShelf: PropTypes.string
}

export default BookshelfDropdown
