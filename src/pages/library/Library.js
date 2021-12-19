import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Footer from '../../components/footer/Footer';
import Books from '../../components/book/Books';
import PaginationComp from '../../components/pagination/PaginationComp';
import Header from '../../components/header/Header';
import { BOOK_API, LIBRARY_API } from '../../services/api-url';

const Library = () => {
  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9);
  const [numBooks, setNumBooks] = useState(0);
  const [userData, setUserData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

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
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  };

  const fetchBooks = async (currentPage) => {
    setLoading(true);
    try {
      const res = await fetch(`${BOOK_API}?page=${currentPage}&size=${booksPerPage}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        }
      });
      const data = await res.json();
      setBooks(data.books);
      setNumBooks(data.count);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    callLibrary();
    fetchBooks(currentPage);
  }, []);

  /*
   * Change Page
   */
  const paginate = (pageNumber) => {
    if (pageNumber !== currentPage) {
      console.log(isSearching);
      if (isSearching) {
        searchBook(searchText, pageNumber);
      } else {
        fetchBooks(pageNumber);
      }
      setCurrentPage(pageNumber);
    }
  };

  const searchBook = async (searchText, currentPage) => {
    setIsSearching(searchText !== '');
    setSearchText(searchText);
    const res = await fetch(`${BOOK_API + 'search/'}?page=${currentPage}&size=${booksPerPage}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        searchString: searchText
      })
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        scrollbarPadding: false
      });
    } else {
      setBooks(data.books);
      setNumBooks(data.count);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Books
          books={books}
          loading={loading}
          user={userData}
          currentPage={currentPage}
          searchText={searchText}
          onSearchBook={(searchText, currentPage) => searchBook(searchText, currentPage)}
        />
        <PaginationComp
          loading={loading}
          currentPage={currentPage}
          totalCount={numBooks}
          pageSize={booksPerPage}
          onPageChange={(page) => paginate(page)}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default Library;
