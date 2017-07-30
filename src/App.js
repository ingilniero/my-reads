import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import groupBy from 'group-by'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  updateBook = (bookId, shelf) => {
    BooksAPI.update({ id: bookId }, shelf).then((updatedBooks) => {
      const books = this.state.books.map((book) => {
        if (book.id === bookId) {
          book.shelf = shelf
        }

        return book
      })

      this.setState({
        books: books
      })
    })
  }

  render () {
    const { books } = this.state
    const groupedBooks = groupBy(books, 'shelf')

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
            history={history} />
        )} />
      </div>
    )
  }
}

export default BooksApp
