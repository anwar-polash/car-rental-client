import { useEffect, useState } from 'react';
import CarDetails from '../components/CarDetsils';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const CarDetailsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // fetch car from the server
  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/carList/one/${id}`
      );
      setCars(data);
      setLoading(false);
    };

    fetchCars();
  }, [id]);

  return (
    <section className="min-h-screen">
      <h2 className="text-2xl font-bold text-center my-20">Car Details</h2>
      <div className="max-width">
        {loading && <LoadingSpinner />}
        {!loading && <CarDetails carData={cars} />}
      </div>
    </section>
  );
};

export default CarDetailsPage;
