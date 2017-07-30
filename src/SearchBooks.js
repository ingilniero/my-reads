import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import SearchInput from './SearchInput'

class SearchBooks extends Component {
  MAX_RESULTS = 10

  static propTypes = {
    history: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func,
    updateQuery: PropTypes.func
  }

  componentDidMount () {
    const { history } = this.props
    const query =  history.location.search.split("=")[1]

    query && this.handleQueryChange(query)
  }

  componentWillUnmount () {
    const { updateQuery } = this.props

    if (updateQuery) {
      updateQuery('')
    }
  }

  handleQueryChange = (query) => {
    const { updateQuery } = this.props

    this.updateHistory(query)

    if (updateQuery) {
      updateQuery(query)
    }
  }

  updateHistory = (query) => {
    const { history } = this.props

    history.push({
      pathname: history.location.pathname,
      search: query ? `?query=${query}` : ''
    })
  }

  handleBookUpdate = (bookId, shelf) => {
    const { updateBook } = this.props

    if (updateBook) {
      updateBook(bookId, shelf)
    }
  }

  render () {
    const { books, query } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>

          <div className="search-books-input-wrapper">
            <SearchInput
              query={query}
              onQueryChange={this.handleQueryChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map((book) => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    onBookUpdate={this.handleBookUpdate}
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

export default SearchBooks
