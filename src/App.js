import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import groupBy from 'group-by'
import './App.css'

class BooksApp extends React.Component {
  state = {
    query: '',
    myReads: [],
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })

    this.searchBooks(query)
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({
        myReads: books
      })
    })
  }

  updateBooks = (books, bookId, shelf) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        book.shelf = shelf
      }

      return book
    })

    return updatedBooks
  }

  updateBook = (bookId, shelf) => {
    BooksAPI.update({ id: bookId }, shelf).then((updatedBooks) => {
      const { myReads, searchResults } = this.state
      const updatedReads = this.updateBooks(myReads, bookId, shelf)
      const updatedSearchResults = this.updateBooks(searchResults, bookId, shelf)

      this.setState({
        myReads: updatedReads,
        searchResults: updatedSearchResults
      })
    })
  }

  searchBooks = (query) => {
    if (query === '') {
      this.setState({
        searchResults: []
      })
    } else {
      BooksAPI.search(query, this.MAX_RESULTS).then((books) => {
        this.setState({
          searchResults: books && books.error === undefined ? books : []
        })
      })
    }
  }

  render () {
    const { myReads, searchResults } = this.state
    const groupedBooks = groupBy(myReads, 'shelf')

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            updateBook={this.updateBook}
            books={groupedBooks}/>
        )} />

        <Route path='/search' render={({history}) => (
          <SearchBooks
            updateBook={this.updateBook}
            query={this.state.query}
            books={searchResults}
            updateQuery={this.updateQuery}
            history={history} />
        )} />
      </div>
    )
  }
}

export default BooksApp
