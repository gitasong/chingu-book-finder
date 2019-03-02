import React, { Component } from 'react';
// import { REACT_APP_API_KEY } from './.env.development.local';
import AppHeader from './components/AppHeader';
import Search from './components/Search';
import BookList from './components/BookList';
import { Container, Dimmer, Loader, Divider } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      submittedSearchTerm: '',
      data: [] || this.state.error,
      loading: false,
      error: ''
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
    try {
      const { submittedSearchTerm } = this.state;
      if (submittedSearchTerm) {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${submittedSearchTerm}&key=${process.env.REACT_APP_API_KEY}`);

        if (response.ok) {
          const json = await response.json();
          console.log('json:', json);
          if (json.items) {
            await this.setState({
              data: json.items,
              loading: false,
              error: ''
            });
            const data = this.state.data;
            console.log('data: %o', data);
          } else {
            await this.setState({
              data: [],
              loading: false,
              error: 'No books available for that search.'
            });
          }
        } else if (response.status === 408){
          await this.setState({
            data: [],
            loading: false,
            error: 'Connection timed out. Please try again.'
          });
        } else {
          await this.setState({
            data: [],
            loading: false,
            error: 'An error has occurred. Please try again.'
          });
        }
      } else {
        await this.setState({
          data: [],
          loading: false,
          error: 'No data entered. Please enter a search term.'
        });
      }
    }

    catch(error) {
      console.error(error);
      await this.setState({
        data: [],
        loading: false,
        error: 'An error occurred. Please try again.'
      });
    }
  }

  render() {
    const { data, loading, error } = this.state;

    const errorMessage = error
      ? <h3 className="error">{error}</h3>
      : null;

    return (
      <Container>
        <AppHeader />
        <Search
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />
        <Divider hidden />
        <Dimmer active={loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        {data && <BookList data={data}/>}
        {errorMessage}
      </Container>
    );
  }
}

export default App;
