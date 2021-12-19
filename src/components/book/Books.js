import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';
import reptile from '../../assets/reptile.jpg';
import { LIBRARY_API } from '../../services/api-url';

const Books = ({ books, loading, user, onSearchBook = null, currentPage, searchText }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [userName, setUserName] = useState('');

  // const history = useHistory();

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
        returnDate: new Date().setDate(new Date().getDate() + 3 * 7)
      })
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      Swal.fire({
        icon: 'error',
        title: 'Book Already Exists',
        scrollbarPadding: false
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Book Issued',
        showConfirmButton: false,
        scrollbarPadding: false,
        timer: 1000
      });
      // history.push('/library');
    }
  };

  const searchBook = () => {
    onSearchBook(searchText, currentPage);
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-info text-center mt-2 display-3">Library</h1>
        <Badge
          style={{ padding: 10, fontSize: '1em', marginBottom: 25 }}
          bg="info"
          as={Link}
          to={user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard'}
        >
          Go To Dashboard
        </Badge>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              searchText = e.target.value;
            }}
          />
          <Button variant="outline-secondary" id="button-search" onClick={searchBook}>
            <i className="fas fa-search" />
          </Button>
        </InputGroup>
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : !books || books.length <= 0 ? (
          <div className="d-flex justify-content-center mt-5 mb-5">
            <span>
              <b>No Results found</b>. Clear filters to refine your Search.
            </span>
          </div>
        ) : (
          <Row>
            {books.map((book, i) => (
              <Col md={4} sm={12} className="d-flex align-items-stretch" key={i}>
                <Card key={book._id} style={{ width: '25rem' }} className="mt-3 mb-2 shadow-lg p-3 bg-white rounded">
                  <Card.Img
                    variant="top"
                    src={book.thumbnailUrl && book.thumbnailUrl !== '' ? book.thumbnailUrl : reptile}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    {book.categories.map((category, i) => (
                      <>
                        {category !== '' && i === 0 ? <hr /> : null}
                        <Badge style={{ whiteSpace: 'normal' }} bg="info" className="m-1" key={i}>
                          {category}
                        </Badge>
                      </>
                    ))}
                    <hr />
                    {book.author ? <Card.Text>{book.author.name}</Card.Text> : null}
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
                        variant="info"
                        type="submit"
                        className="mt-1"
                        onClick={() => {
                          setTitle(book.title);
                          setUserId(String(user._id));
                          setBookId(String(book._id));
                          setUserName(user.firstname + ' ' + user.lastname);
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
        )}
      </div>
    </div>
  );
};

export default Books;
