import React, { Component } from 'react'
import BookshelfDropdown from './BookshelfDropdown'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onBookUpdate: PropTypes.func,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired
  }

  handleShelfChange = (shelf) => {
    const { id, onBookUpdate } = this.props

    if (onBookUpdate) {
      onBookUpdate(id, shelf)
    }
  }

  render () {
    const { title, shelf, authors, thumbnail} = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 158,
              backgroundImage: `url("${thumbnail}")`
            }}></div>
          <div className="book-shelf-changer">
            <BookshelfDropdown
              onShelfChange={this.handleShelfChange}
              selectedShelf={shelf}/>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book
