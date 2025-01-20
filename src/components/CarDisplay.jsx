import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

const CarDisplay = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("dateNewest");
  const [isGridView, setIsGridView] = useState(true);

  // fetch cars from the server
  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/carList/all`
      );
      setCars(data);
      setLoading(false);
    };

    fetchCars();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (a, b) => {
    if (sortOption === "dateNewest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "dateOldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOption === "priceLowest") {
      return a.dailyRentalPrice - b.dailyRentalPrice;
    } else if (sortOption === "priceHighest") {
      return b.dailyRentalPrice - a.dailyRentalPrice;
    }
    return 0;
  };

  const filteredCars = cars
    .filter(
      (car) =>
        car.carModel.toLowerCase().includes(searchQuery) ||
        car.location.toLowerCase().includes(searchQuery)
    )
    .sort(handleSort);

  return (
    <div className="max-width mb-28">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by model, brand, or location"
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#2B3440]"
          value={searchQuery}
          onChange={handleSearch}
        />

        <select
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#2B3440]"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}>
          <option value="dateNewest">Date Added (Newest First)</option>
          <option value="dateOldest">Date Added (Oldest First)</option>
          <option value="priceLowest">Price (Lowest First)</option>
          <option value="priceHighest">Price (Highest First)</option>
        </select>

        <div>
          <button
            className={`px-4 py-2 rounded-md mr-2 ${
              isGridView ? "bg-[#2B3440] text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsGridView(true)}>
            Grid View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              !isGridView ? "bg-[#2B3440] text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsGridView(false)}>
            List View
          </button>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {!loading && (
        <div
          className={
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="border rounded-lg shadow-md overflow-hidden">
              <img
                src={car.carImageUrl}
                alt={car.carModel}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{car.carModel}</h3>
                <p className="text-sm text-gray-600">{car.description}</p>
                <p className="text-sm font-medium mt-2">
                  ${car.dailyRentalPrice}/day
                </p>
                <p className="text-sm text-gray-500">
                  Location: {car.location}
                </p>
                <Link to={`/car-details/${car._id}`}>
                  <button className="mt-4 w-full bg-[#FFC147] text-white py-2 rounded-md hover:bg-[#2B3440]">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarDisplay;
