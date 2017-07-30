import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  render () {
    const { name, books, onBookUpdate } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    onBookUpdate={onBookUpdate}
                    title={book.title}
                    shelf={book.shelf}
                    authors={book.authors && book.authors.reduce((authors, author) => (
                      authors += ` / ${author}`
                    ))}
                    thumbnail={book.imageLinks && book.imageLinks.smallThumbnail}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
