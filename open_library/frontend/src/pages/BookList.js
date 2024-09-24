import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useBookStore } from '../store/bookStore';
import Loader from '../components/Loader';
import Book from '../components/Book';

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { getBooks, searchBooks, isLoading, searchedBooks } = useBookStore();
  const location = useLocation();

  useEffect(() => {
    const fetchAllBooks = async () => {
      await getBooks();
    };

    const fetchSearchedBooks = async (q) => {
      await searchBooks(q);
    };

    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('q');
    setSearchTerm(searchTermFromUrl);

    if (searchTermFromUrl) {
      fetchSearchedBooks(searchTermFromUrl);
    } else {
      fetchAllBooks();
    }
  }, [location, getBooks, searchBooks]);

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{searchTerm ? `Search: ${searchTerm}` : 'All Books'}</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : searchedBooks?.length > 0 ? (
          <div className='booklist-content grid'>
            {searchedBooks.map((book, index) => {
              return <Book key={index} book={book} />;
            })}
          </div>
        ) : (
          <div>No results. Try something else!</div>
        )}
      </div>
    </section>
  );
};

export default BookList;
