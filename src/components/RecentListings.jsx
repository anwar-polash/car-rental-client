import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/carList/all`
      );
      const shortedListings = await data
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 6);
      setListings(shortedListings);
      setLoading(false);
    };

    fetchCars();
  }, []);

  // const listings = [
  //   {
  //     id: 1,
  //     image: 'https://via.placeholder.com/300x200',
  //     model: 'Toyota Camry 2023',
  //     price: '$45/day',
  //     availability: 'Available',
  //     bookingCount: 12,
  //     datePosted: 'Added 2 days ago',
  //   },
  //   {
  //     id: 2,
  //     image: 'https://via.placeholder.com/300x200',
  //     model: 'Honda Accord 2022',
  //     price: '$50/day',
  //     availability: 'Available',
  //     bookingCount: 9,
  //     datePosted: 'Added 3 days ago',
  //   },
  //   {
  //     id: 3,
  //     image: 'https://via.placeholder.com/300x200',
  //     model: 'Ford Mustang 2023',
  //     price: '$75/day',
  //     availability: 'Unavailable',
  //     bookingCount: 20,
  //     datePosted: 'Added 1 day ago',
  //   },
  //   // Add more listings as needed
  // ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Recent Listings
        </h2>
        {loading && <LoadingSpinner />}
        {!loading && listings.length === 0 && (
          <h3 className="text-xl text-center">No bookings found</h3>
        )}
        {!loading && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={listing.carImageUrl}
                  alt={listing.carModel}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {listing.carModel}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(listing.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-800 font-medium mt-2">
                    {listing.price}
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${
                      listing.availability ? "text-green-500" : "text-red-500"
                    }`}>
                    {listing.availability ? "Available" : "Unavailable"}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Booked {listing.bookingCount} times
                  </p>
                </div>
                <Link to={`/car-details/${listing._id}`}>
                  <button className="mt-4 w-full bg-[#FFC147] text-white py-2 rounded-md hover:bg-[#FFC147]">
                    {listing.availability ? "Book Now" : "Show Details"}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
