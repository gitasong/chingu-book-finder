import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Search extends Component {

  render() {
    return (
      <Form onSubmit={this.props.handleSearch}>
        <Form.Input
          fluid
          size="big"
          action={{ icon: "search" }}
          placeholder="Search for a title, author, keyword, or ISBN (no dashes)"
          onChange={this.props.handleChange}
        />
      </Form>
    );
  }
}

export default Search;
