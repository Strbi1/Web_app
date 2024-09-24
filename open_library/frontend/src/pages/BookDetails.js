import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import BookCover from '../assets/cover_not_found.jpg';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import Loader from '../components/Loader';
import { useReservationStore } from '../store/reservationStore';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { getBook, updateBookStock, isLoading, error } = useBookStore();
  const { user } = useAuthStore();
  const {
    createReservation,
    isLoading: resLoading,
    error: resError,
  } = useReservationStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBook(id);
        setBook(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id, getBook]);

  const handleReservation = async () => {
    try {
      await createReservation({
        user_id: user.user_id,
        book_id: book.book_id,
        date: new Date().toISOString().slice(0, 10),
      });

      let newStock = book.in_stock - 1;
      await updateBookStock(book.book_id, newStock);
      navigate('/reservations');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='book-details'>
      <div className='container'>
        <button
          type='button'
          className='flex flex-c back-btn'
          onClick={() => navigate('/books')}
        >
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className='error'>Book not found</div>
        ) : (
          <div className='book-details-content grid'>
            <div className='book-details-img'>
              <img src={book?.image || BookCover} alt='cover img' />
            </div>
            <div className='book-details-info'>
              <div className='book-details-item title'>
                <span className='fw-6 fs-24'>{book?.title}</span>
              </div>
              <div className='book-details-item description'>
                <span>{book?.description}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Author: </span>
                <span className='text-italic'>{book?.author}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Published: </span>
                <span className='text-italic'>
                  {new Date(book?.published).getFullYear()}
                </span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>In stock: </span>
                <span>{book?.in_stock}</span>
              </div>

              {user && !user.is_admin && (
                <div className='reserve'>
                  <button
                    disabled={resLoading || isLoading || book?.in_stock === 0}
                    type='button'
                    onClick={handleReservation}
                  >
                    {resLoading || isLoading ? <Loader /> : 'Reserve'}
                  </button>

                  {resError && (
                    <div className='error'>
                      You already reserved two books or already have this title
                      in your reservations!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetails;