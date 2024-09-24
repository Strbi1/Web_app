import React, { useEffect, useState } from 'react';

import BookCover from '../assets/cover_not_found.jpg';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import Loader from './Loader';
import { useReservationStore } from '../store/reservationStore';
import { useNavigate } from 'react-router-dom';

const Reservation = ({ reservation }) => {
  const [book, setBook] = useState(null);

  const { getBook, updateBookStock, isLoading: bookLoading } = useBookStore();
  const { user, isLoading: userLoading } = useAuthStore();
  const { deleteReservation, isLoading: resLoading } = useReservationStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBook(reservation.book_id);
        setBook(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (reservation) {
      fetchBook();
    }
  }, [reservation, getBook]);

  const handleReturn = async () => {
    try {
      await deleteReservation(reservation.reservation_id);

      let newStock = book.in_stock + 1;
      await updateBookStock(book.book_id, newStock);
      navigate(`/books`);
    } catch (error) {
      console.error(error);
    }
  };

  if (userLoading || bookLoading) {
    return <Loader />;
  } else {
    return (
      <div className='reservation'>
        <img src={book?.image || BookCover} alt={book?.title || 'book'} />
        <div className='reservation-details'>
          <div className='details'>
            <p>{book?.title}</p>
            <p>{book?.author}</p>
            {user?.is_admin && (
              <p>Reserved by (User ID): {reservation.user_id}</p>
            )}
            <p>
              Reserved on: {new Date(reservation.date).toLocaleDateString()}
            </p>
          </div>

          <div className='actions'>
            <button
              type='button'
              disabled={resLoading || bookLoading}
              onClick={handleReturn}
            >
              {resLoading || bookLoading ? <Loader /> : 'Return'}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Reservation;
