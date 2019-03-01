import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'
import '../App.css';

const AppHeader = () => (
  <Container className="app-header" text>
    <Header as="h1" icon>
      <div className="logo">
        <span><Icon name="book" /></span>
        <span><Icon name="search" /></span>
      </div>
      Book Finder
      <Header.Subheader>Search for a book by title, author, keyword, or ISBN.</Header.Subheader>
    </Header>
  </Container>
)

export default AppHeader;
