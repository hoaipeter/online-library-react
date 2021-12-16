import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Badge, Row, Col } from 'react-bootstrap';
import { LIBRARY_API } from '../../services/api-url';

const Books = ({ books, loading, user }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [userName, setUserName] = useState('');

  const history = useHistory();
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const issueBook = async (e) => {
    e.preventDefault();
    const res = await fetch(LIBRARY_API.issueBook, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        title: title,
        userId: userId,
        bookId: bookId,
        userName: userName,
        issueDate: Date.now(),
        returnDate: Date.now()
      })
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert('Book Already Exists');
    } else {
      window.alert('Book Issued');
      history.push('/library');
    }
  };
  return (
    <div>
      <div className="container">
        <h1 className="text-info text-center mt-2 display-3">Library</h1>
        <Button as={Link} to={user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard'} variant="success">
          Go To Dashboard
        </Button>
        <Row>
          {books.map((book, i) => (
            <Col md={3} sm={12} className="d-flex align-items-stretch" key={i}>
              <Card key={book._id} style={{ width: '25rem' }} className="mt-3 mb-2 shadow-lg p-3 bg-white rounded">
                <Card.Img variant="top" src={book.thumbnailUrl} />
                <Card.Body>
                  <Card.Title className="text-secondary">{book.title}</Card.Title>
                  {book.categories.map((category, i) => (
                    <Badge pill bg="info" className="m-1" key={i}>
                      {category}
                    </Badge>
                  ))}
                  {book.authors.map((author, i) => (
                    <Card.Text className="lead" key={i}>
                      {author}
                    </Card.Text>
                  ))}
                </Card.Body>
                <div className="d-grid gap-2">
                  <Button as={Link} to={`/books/${book._id}`} variant="outline-warning">
                    View More
                  </Button>
                </div>
                <form onSubmit={issueBook}>
                  <input type="hidden" name="title" value={book.title} />
                  <input type="hidden" name="userId" value={user._id} />
                  <input type="hidden" name="bookId" value={book._id} />
                  <input type="hidden" name="userName" value={book._id} />
                  <div className="d-grid gap-2">
                    <Button
                      variant="success"
                      type="submit"
                      className="mt-1"
                      onClick={() => {
                        setTitle(book.title);
                        setUserId(String(user._id));
                        setBookId(String(book._id));
                        setUserName(user.name);
                      }}
                    >
                      Get this Book
                    </Button>
                  </div>
                </form>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Books;
