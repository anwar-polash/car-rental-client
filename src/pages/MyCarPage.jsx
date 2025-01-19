import { useCallback, useEffect, useState } from 'react';
import CarManagement from '../components/CarManagement';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

// const myCars = [
//   {
//     carModel: 'Toyota Corolla',
//     dailyRentalPrice: '40',
//     availability: true,
//     vehicleRegistrationNumber: 'ABC-1234',
//     features: ['GPS', 'AC', 'Bluetooth'],
//     description: 'A reliable compact sedan with great fuel efficiency.',
//     carImageUrl: 'https://example.com/car1.jpg',
//     location: 'New York, NY',
//     bookingCount: 0,
//     owner: {
//       name: 'Admin',
//       email: 'admin@rentalcar.com',
//       photo: 'https://avatar.iran.liara.run/public/36',
//     },
//     createdAt: '2024-12-28T05:23:15.247Z',
//   },
//   {
//     carModel: 'Honda Civic',
//     dailyRentalPrice: '45',
//     availability: false,
//     vehicleRegistrationNumber: 'DEF-5678',
//     features: ['GPS', 'AC', 'Bluetooth', 'Sunroof'],
//     description: 'A stylish sedan perfect for city driving.',
//     carImageUrl: 'https://example.com/car2.jpg',
//     location: 'Los Angeles, CA',
//     bookingCount: 0,
//     owner: {
//       name: 'Admin',
//       email: 'admin@rentalcar.com',
//       photo: 'https://avatar.iran.liara.run/public/36',
//     },
//     createdAt: '2024-12-28T05:23:15.247Z',
//   },
// ];

const MyCarPage = () => {
  const [myCars, setMyCars] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // fetch my cars from the server
  const fetchMyCars = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/carList/user/${user.email}`
    );
    setMyCars(data);
    setLoading(false);
  }, [user.email]);

  useEffect(() => {
    fetchMyCars();
  }, [fetchMyCars]);

  return (
    <section className="min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">My Car</h2>{' '}
      <h2 className="max-width text-2xl font-bold mb-4">Car Management</h2>
      {loading && <LoadingSpinner />}
      {!loading && <CarManagement cars={myCars} refetchMyCars={fetchMyCars} />}
    </section>
  );
};

export default MyCarPage;
