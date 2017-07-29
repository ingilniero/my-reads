import React, { Component } from 'react'
import BookshelfDropdown from './BookshelfDropdown'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired
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
            <BookshelfDropdown selectedShelf={shelf}/>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book
