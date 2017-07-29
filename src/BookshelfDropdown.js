import React, { Component } from 'react'
import bookshelves from './bookshelves'
import PropTypes from 'prop-types'

class BookshelfDropdown extends Component {
  static propTypes = {
    selectedShelf: PropTypes.string
  }

  render () {
    const { selectedShelf } = this.props
    return (
      <select>
        <option value="none" disabled>Move to...</option>
        {
          bookshelves.map((bookshelf) => (
            <option
              key={bookshelf.id}
              selected={ selectedShelf === bookshelf.id ? 'selected' : '' }
              value={bookshelf.id}>
                {bookshelf.name}
            </option>
          ))
        }
      </select>
    )
  }
}

export default BookshelfDropdown
