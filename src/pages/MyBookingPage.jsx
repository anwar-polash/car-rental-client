import { useCallback, useEffect, useState } from 'react';
import MyBookingTable from '../components/MyBookingTable';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const MyBookingPage = () => {
  const [myBookedCars, setMyBookedCars] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // fetch my cars from the server
  const fetchMyCars = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/bookedCar/user/${user.email}`
    );
    setMyBookedCars(data);
    setLoading(false);
  }, [user.email]);

  useEffect(() => {
    fetchMyCars();
  }, [fetchMyCars]);

  console.log(myBookedCars);

  return (
    <section className="min-h-screen">
      <h2 className="text-2xl font-bold text-center my-20">My Bookings</h2>
      <div className="max-width">
        {loading && <LoadingSpinner />}
        {!loading && myBookedCars.length === 0 && (
          <h3 className="text-xl text-center">No bookings found</h3>
        )}
        {!loading && myBookedCars.length > 0 && (
          <MyBookingTable bookings={myBookedCars} refetchMyCars={fetchMyCars} />
        )}
      </div>
    </section>
  );
};

export default MyBookingPage;
