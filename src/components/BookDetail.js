import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

class BookDetail extends Component {

  render() {
    const { book, isModalOpen, closeModal } = this.props;

    return(
      <Modal open={isModalOpen} closeIcon>
        <Modal.Header><h1>{book.title}{book.subtitle}</h1></Modal.Header>
        <Modal.Content image scrolling>
          <Image fluid src={book.thumbnail} alt={book.title} />

          <Modal.Description>
            <Header><h2>{book.title}{book.subtitle}</h2></Header>
            <h5 className="authors">{book.authors}</h5>
            <h6 className="publisher">{book.publisher}</h6>
            <p>{book.pageCount} pages</p>
            <p>Average Rating: {book.averageRating}</p>
            <p>{book.description}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={closeModal}>
            <Icon name='chevron left' /> Back
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default BookDetail;
