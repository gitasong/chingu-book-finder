import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

class BookDetail extends Component {
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
    const { book } = this.props;

    return(
      <div>
        <Button primary onClick={this.openModal}>See More</Button>

        <Modal open={this.state.isModalOpen} book={book} onClose={this.closeModal} closeIcon>
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
            <Button primary onClick={this.closeModal}>
              <Icon name='chevron left' /> Back
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default BookDetail;
