import React, { Component } from 'react';
import BookDetail from './BookDetail';
import { Grid, Card, Image, Button } from 'semantic-ui-react';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      isModalOpen: true
    });
    console.log('isModalOpen:', this.state.isModalOpen);
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    });
    console.log('isModalOpen:', this.state.isModalOpen);
  }

  render() {
    const data = this.props.data;
    const bookData = data.map(book => {
      return({
        id: book.id,
        thumbnail: book.volumeInfo.imageLinks.thumbnail || null,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle ? ': ' + book.volumeInfo.subtitle : '',
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        pageCount: book.volumeInfo.pageCount || '?',
        averageRating: book.volumeInfo.averageRating || 'No ratings yet',
        description: book.volumeInfo.description || null
      });
    });

    const bookList = bookData.map(bookItem => {
      return(
        <Grid.Column key={bookItem.id}>
            <Card>
              <Image fluid src={bookItem.thumbnail} alt={bookItem.title} className="thumbnail"/>
              <Card.Content>
                <Card.Header>{bookItem.title}{bookItem.subtitle}</Card.Header>
                <Card.Meta className="authors">{bookItem.authors}</Card.Meta>
                <Card.Meta className="publisher">{bookItem.publisher}</Card.Meta>
                <p>{bookItem.pageCount} pages</p>
                <p>Average Rating: {bookItem.averageRating}</p>
                <Card.Description></Card.Description>
                <Button primary onClick={this.openModal}>See More</Button>
                <BookDetail
                  book={bookItem}
                  isModalOpen={this.state.isModalOpen}
                  closeModal={this.closeModal}
                />
                {/* <Modal open={this.state.isModalOpen} closeIcon>
                  <Modal.Header><h1>{bookItem.title}{bookItem.subtitle}</h1></Modal.Header>
                  <Modal.Content image scrolling>
                    <Image fluid src={bookItem.thumbnail} alt={bookItem.title} />

                    <Modal.Description>
                      <Header><h2>{bookItem.title}{bookItem.subtitle}</h2></Header>
                      <h5 className="authors">{bookItem.authors}</h5>
                      <h6 className="publisher">{bookItem.publisher}</h6>
                      <p>{bookItem.pageCount} pages</p>
                      <p>Average Rating: {bookItem.averageRating}</p>
                      <p>{bookItem.description}</p>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button primary onClick={this.closeModal}>
                      <Icon name='chevron left' /> Back
                    </Button>
                  </Modal.Actions>
                </Modal> */}
              </Card.Content>
            </Card>
        </Grid.Column>
      );
    });

    return (
      <Grid stackable columns={4}>
        {bookList}
      </Grid>
    );
  }
}

export default BookList;
