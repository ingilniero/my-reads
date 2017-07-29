import React, { Component } from 'react'
import bookshelves from './bookshelves'

class BookshelfDropdown extends Component {
  render () {
    return (
      <select>
        <option value="none" disabled>Move to...</option>
        {
          bookshelves.map((bookshelf) => (
            <option key={bookshelf.id} value={bookshelf.id}>{bookshelf.name}</option>
          ))
        }
      </select>
    )
  }
}

export default BookshelfDropdown
