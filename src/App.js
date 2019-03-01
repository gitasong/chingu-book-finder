import React, { Component } from 'react';
import { API_KEY } from './config.js';
import AppHeader from './components/AppHeader';
import Search from './components/Search';
import BookList from './components/BookList';
import { Dimmer, Loader, Divider } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      submittedSearchTerm: '',
      data: [],
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
    console.log('searchTerm:', this.state.searchTerm);
  }

  handleSearch = async () => {
    // start loader
    this.setState({
      loading: true
    });

    // update search term
    const { searchTerm } = this.state;
    await this.setState({
      submittedSearchTerm: searchTerm
    });
    console.log('submittedSearchTerm:', this.state.submittedSearchTerm);

    // make API call to Google Books
    const { submittedSearchTerm } = this.state;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${submittedSearchTerm}&key=${API_KEY}`);

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      await this.setState({
        data: json.items,
        loading: false
      });
      const data = this.state.data;
      console.log('data: %o', data);
    }
    // TODO: Add error handling
  }

  render() {
    const { data, loading } = this.state;

    return (
      <div>
        <AppHeader />
        <Search
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />
        <Divider hidden />
        <Dimmer active={loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <BookList data={data} />
      </div>
    );
  }
}

export default App;
