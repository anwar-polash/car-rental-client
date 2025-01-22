import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddCarForm = () => {
  document.title = "Add Car | Car Rental";
  const { user } = useAuth();
  const [car, setCar] = useState({
    carModel: "",
    dailyRentalPrice: "",
    availability: true,
    vehicleRegistrationNumber: "",
    features: [],
    description: "",
    carImageUrl: "",
    location: "",
  });

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name.startsWith("feature-")) {
      const featureValue = name.split("feature-")[1];
      if (checked) {
        setSelectedFeatures([...selectedFeatures, featureValue]);
      } else {
        setSelectedFeatures(
          selectedFeatures.filter((item) => item !== featureValue)
        );
      }
      setCar((prevCar) => ({
        ...prevCar,
        features: selectedFeatures,
      }));
      return;
    }

    setCar((prevCar) => ({
      ...prevCar,
      [name]:
        type === "number" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = {
      ...car,
      bookingCount: 0,
      features: selectedFeatures,
      availability: car.availability === "true", // Convert to boolean
      owner: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
      createdAt: new Date().toISOString(),
    };

    // Send car data to the server
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/carList/add`,
      fromData
    );

    if (data?.acknowledged) {
      Swal.fire({
        title: "Car Added!",
        icon: "success",
      });
      setCar({
        carModel: "",
        dailyRentalPrice: 0,
        availability: true,
        vehicleRegistrationNumber: "",
        features: [],
        description: "",
        bookingCount: 0,
        carImageUrl: "",
        location: "",
      });
      setSelectedFeatures([]);
    }

    // Reset form fields
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Car</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="carModel"
              className="block text-gray-700 text-sm font-medium mb-1">
              Car Model
            </label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              value={car.carModel}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-bg-[#FFC147]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dailyRentalPrice"
              className="block text-gray-700 text-sm font-medium mb-1">
              Daily Rental Price
            </label>
            <input
              type="number"
              id="dailyRentalPrice"
              name="dailyRentalPrice"
              value={car.dailyRentalPrice}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-bg-[#FFC147]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="availability"
              className="block text-gray-700 text-sm font-medium mb-1">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={car.availability}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-bg-[#FFC147]"
              required>
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="vehicleRegistrationNumber"
              className="block text-gray-700 text-sm font-medium mb-1">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              id="vehicleRegistrationNumber"
              name="vehicleRegistrationNumber"
              value={car.vehicleRegistrationNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-bg-[#FFC147]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Features
            </label>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="feature-GPS"
                  checked={selectedFeatures.includes("GPS")}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">GPS</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="feature-AC"
                  checked={selectedFeatures.includes("AC")}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">AC</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="feature-Bluetooth"
                  checked={selectedFeatures.includes("Bluetooth")}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Bluetooth</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="feature-Sunroof"
                  checked={selectedFeatures.includes("Sunroof")}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Sunroof</span>
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={car.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-[#FFC147]"
              rows={3}></textarea>
          </div>
          <div>
            <label
              htmlFor="carImageUrl"
              className="block text-gray-700 text-sm font-medium mb-1">
              Car Image URL
            </label>
            <input
              type="text"
              id="carImageUrl"
              name="carImageUrl"
              value={car.carImageUrl}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-[#FFC147]"
              required
            />
            {car.carImageUrl && (
              <img
                src={car.carImageUrl}
                alt="Car Preview"
                className="mt-2 w-32 h-24 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={car.location}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-[#FFC147]"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full mt-5 bg-[#FFC147] hover:bg-[#FFC147] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarForm;
