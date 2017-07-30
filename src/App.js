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

  render () {
    const { books } = this.state
    const groupedBooks = groupBy(books, 'shelf')

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={groupedBooks}/>
        )} />

        <Route path='/search' render={({history}) => (
          <SearchBooks history={history} />
        )} />
      </div>
    )
  }
}

export default BooksApp
