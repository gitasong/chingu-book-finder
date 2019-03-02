import React, { Component } from 'react';
import BookDetail from './BookDetail';
import { Grid, Card, Image } from 'semantic-ui-react';
import noImage from '../assets/no-image-available.png';

class BookList extends Component {

  render() {
    const data = this.props.data;

    const bookData = data.map(book => {
      if (book.volumeInfo) {
        // breaks multiple authors into two lines on card,
        // single line w/space in-betwen on modal
        const authorsArray = book.volumeInfo.authors[1] ? `${book.volumeInfo.authors[0]}\xa0\xa0\xa0 ${book.volumeInfo.authors[1]}` : `${book.volumeInfo.authors[0]}`;

        return({
          id: book.id,
          thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage,
          title: book.volumeInfo.title || 'No title available',
          subtitle: book.volumeInfo.subtitle ? ': ' + book.volumeInfo.subtitle : '',
          authors: authorsArray || 'No author information available',
          publisher: book.volumeInfo.publisher || 'No publisher information available',
          pageCount: book.volumeInfo.pageCount || '?',
          averageRating: book.volumeInfo.averageRating || 'No ratings yet',
          description: book.volumeInfo.description || 'No description available.'
        });
      } else {
        return({
          id: book.id,
          thumbnail: noImage,
          title: '',
          subtitle: '',
          authors: '',
          publisher: '',
          pageCount: '?',
          averageRating: '',
          description: 'No volume information available.'
        });
      }
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
                <BookDetail
                  book={bookItem}
                />
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
