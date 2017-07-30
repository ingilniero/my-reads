import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import SearchInput from './SearchInput'

class SearchBooks extends Component {
  MAX_RESULTS = 10

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    query: '',
    books: []
  }

  componentDidMount () {
    const { history } = this.props
    const query =  history.location.search.split("=")[1]

    query && this.updateQuery(query)
  }

  updateQuery = (query) => {
    this.updateHistory(query)
    this.setState({
      query: query
    })
    this.searchBooks(query)
  }

  updateHistory = (query) => {
    const { history } = this.props

    history.push({
      pathname: history.location.pathname,
      search: query ? `?query=${query}` : ''
    })
  }

  searchBooks = (query) => {
    if (query === '') {
      this.setState({
        books: []
      })
    } else {
      BooksAPI.search(query, this.MAX_RESULTS).then((books) => {
        this.setState({
          books: books && books.error === undefined ? books : []
        })
      })
    }
  }

  render () {
    const { books, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>

          <div className="search-books-input-wrapper">
            <SearchInput
              query={query}
              onQueryChange={this.updateQuery} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map((book) => (
                <li key={book.id}>
                  <Book
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
