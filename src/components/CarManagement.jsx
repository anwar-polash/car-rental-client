import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CarManagement = ({ cars, refetchMyCars }) => {
  const [carData, setCarData] = useState(cars);
  const [sortOption, setSortOption] = useState("");
  const [editingCar, setEditingCar] = useState(null);

  // Sorting cars
  const sortCars = (option) => {
    const sortedCars = [...carData].sort((a, b) => {
      if (option === "dateNewest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (option === "dateOldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (option === "priceLowest") {
        return parseFloat(a.dailyRentalPrice) - parseFloat(b.dailyRentalPrice);
      } else if (option === "priceHighest") {
        return parseFloat(b.dailyRentalPrice) - parseFloat(a.dailyRentalPrice);
      }
      return 0;
    });
    setCarData(sortedCars);
  };

  // Submit edited car
  const handleEditSubmit = async (updatedCar) => {
    const { _id: id, ...rest } = updatedCar;

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/carList/update/${id}`,
      rest
    );
    if (data?.acknowledged) {
      toast.success("Car details updated successfully!");
      setEditingCar(null);
      refetchMyCars();
    }
  };

  // Delete car
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/carList/deleteOne/${id}`
      );

      if (data?.acknowledged) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        refetchMyCars();
      }
    }
  };

  return (
    <div className="max-width overflow-x-auto">
      {carData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-center text-lg">
            No cars available. to get started.
          </p>
          <Link to="/add-car" className="btn bg-[#2B3440] text-white mt-4">
            Add a car
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="mr-2">Sort By:</label>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                sortCars(e.target.value);
              }}
              className="border rounded p-2">
              <option value="">Select</option>
              <option value="dateNewest">Date Added (Newest First)</option>
              <option value="dateOldest">Date Added (Oldest First)</option>
              <option value="priceLowest">Price (Lowest First)</option>
              <option value="priceHighest">Price (Highest First)</option>
            </select>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">Car Image</th>
                <th className="p-2 text-left">Car Model</th>
                <th className="p-2 text-left">Daily Rental Price</th>
                <th className="p-2 text-left">Bookings</th>
                <th className="p-2 text-left">Availability</th>
                <th className="p-2 text-left">Date Added</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {carData.map((car) => (
                <tr key={car._id} className="border-b">
                  <td className="p-2">
                    <img
                      src={car.carImageUrl}
                      alt={car.carModel}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{car.carModel}</td>
                  <td className="p-2">${car.dailyRentalPrice}</td>
                  <td className="p-2">{car.bookingCount}</td>
                  <td className="p-2">
                    {car.availability ? "Available" : "Unavailable"}
                  </td>
                  <td className="p-2">
                    {new Date(car.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => setEditingCar(car)}
                      className="bg-[#FFC147] text-white px-3 py-1 rounded mr-2">
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="bg-[#2B3440] text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {editingCar && (
        <EditCarModal
          car={editingCar}
          onClose={() => setEditingCar(null)}
          onSave={handleEditSubmit}
        />
      )}
    </div>
  );
};

// EditCarModal component
const EditCarModal = ({ car, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...car });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Car Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Car Model</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Daily Rental Price
            </label>
            <input
              type="number"
              name="dailyRentalPrice"
              value={formData.dailyRentalPrice}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required>
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="vehicleRegistrationNumber"
              value={formData.vehicleRegistrationNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Features</label>
            <input
              type="text"
              name="features"
              value={formData.features.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  features: e.target.value.split(",").map((f) => f.trim()),
                }))
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="carImageUrl"
              value={formData.carImageUrl}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarManagement;
