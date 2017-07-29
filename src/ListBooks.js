import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bookshelves from './bookshelves'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired
  }

  render () {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              bookshelves
                .filter((bookshelf) => (
                  books[bookshelf.id]
                ))
                .map((bookshelf) => (
                  <Bookshelf
                    key={bookshelf.id}
                    name={bookshelf.name}
                    books={books[bookshelf.id]} />
              ))
            }
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
