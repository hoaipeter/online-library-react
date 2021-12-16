import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Books from '../../components/book/Books';
import PaginationComp from '../../components/pagination/PaginationComp';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { BOOK_API, LIBRARY_API } from '../../services/api-url';

const Library = () => {
  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(20);
  const [userData, setUserData] = useState([]);

  const callLibrary = async () => {
    try {
      const res = await fetch(LIBRARY_API.library, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(BOOK_API, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        }
      });
      const data = await res.json();
      setBooks(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    callLibrary();
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Get current Books
   */
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  /*
   * Change Page
   */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header />
      <Container>
        <Books books={currentBooks} loading={loading} user={userData} />
        <PaginationComp booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} />
      </Container>
      <Footer />
    </div>
  );
};

export default Library;
