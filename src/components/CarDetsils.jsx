import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const CarDetails = ({ carData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();

  const {
    carModel,
    dailyRentalPrice,
    availability,
    features,
    carImageUrl,
    description,
    location,
    owner,
    _id,
  } = carData;

  const handleConfirm = async () => {
    if (selectedDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
      alert("Please select today or a future date.");
      return;
    }

    // send booking request to the server
    const bookingData = {
      client: { name: user.displayName, email: user.email },
      bookingStatus: true,
      carDetails: {
        carId: _id,
        carModel,
        dailyRentalPrice,
        availability,
        features,
        carImageUrl,
        description,
        location,
        owner,
      },
      bookingDate: selectedDate.toISOString(),
    };
    console.table({ bookingData });

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/bookedCar/add`,
      bookingData
    );

    if (data?.acknowledged) {
      Swal.fire({
        title: "Booking Confirmed!",
        icon: "success",
      });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-6">
      {/* Car Image */}
      <div className="lg:w-1/3 flex justify-center items-center mb-4 lg:mb-0">
        <img
          src={carImageUrl}
          alt={carModel}
          className="w-full h-auto max-w-md rounded-lg"
        />
      </div>

      {/* Car Details */}
      <div className="lg:w-2/3 lg:pl-6 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">{carModel}</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Price Per Day:</span> $
          {dailyRentalPrice}
        </p>
        <p
          className={`font-semibold ${
            availability ? "text-green-600" : "text-red-600"
          }`}>
          {availability ? "Available" : "Unavailable"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> {location}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Owner:</span> {owner.name} (
          <a href={`mailto:${owner.email}`} className="text-blue-500 underline">
            {owner.email}
          </a>
          )
        </p>
        <div>
          <h3 className="font-semibold text-lg">Features:</h3>
          <ul className="list-disc pl-5">
            {features.map((feature, index) => (
              <li key={index} className="text-gray-600">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-600">{description}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!availability || !user}
          className="mt-4 px-4 py-2 bg-[#FFC147] text-white rounded-lg hover:bg-blue-600 transition">
          {availability ? (user ? "Book Now" : "Login to Book") : "Unavailable"}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Booking Confirmation</h3>
            <p>
              <span className="font-semibold">Car Model:</span> {carModel}
            </p>
            <p>
              <span className="font-semibold">Price Per Day:</span> $
              {dailyRentalPrice}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">Owner:</span> {owner.name} (
              {owner.email})
            </p>

            <div className="mt-4">
              <label className="block font-semibold mb-2">Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-[#FFC147] transition">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-[#FFC147] transition">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
