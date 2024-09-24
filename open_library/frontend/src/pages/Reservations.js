import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';
import { useReservationStore } from '../store/reservationStore';
import Loader from '../components/Loader';
import Reservation from '../components/Reservation';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const {
    user,
    getUserByIdWithReservations,
    isLoading: userLoading,
  } = useAuthStore();
  const { getReservations, isLoading: resLoading } = useReservationStore();

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const res = await getReservations();
        setReservations(res);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMyReservations = async () => {
      try {
        const res = await getUserByIdWithReservations(user.user_id);
        setReservations(res.reservations);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.is_admin) {
      fetchAllReservations();
    } else {
      if (user) {
        fetchMyReservations();
      }
    }
  }, [user]);

  if (user) {
    return (
      <section className='reservations'>
        <div className='container'>
          <div className='section-title'>
            <h2>{user?.is_admin ? 'All Reservations' : 'My Reservations'}</h2>
          </div>
          {resLoading || userLoading ? (
            <Loader />
          ) : reservations.length > 0 ? (
            <div className='reservations-list'>
              {reservations.map((res) => (
                <Reservation key={res.reservation_id} reservation={res} />
              ))}
            </div>
          ) : (
            <div>You do not have any book reservations at the moment</div>
          )}
        </div>
      </section>
    );
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default Reservations;