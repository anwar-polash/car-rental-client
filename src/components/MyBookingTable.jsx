import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";

const MyBookingTable = ({ bookings, refetchMyCars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState(null);

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure? to cancel this booking",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/bookedCar/update/bookingStatus/${bookingId}`
      );

      if (data?.acknowledged) {
        Swal.fire({
          title: "Canceled!",
          text: "Your booking is canceled.",
          icon: "success",
        });
        refetchMyCars();
      }
    }
  };

  const handleModifyBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleConfirmDateChange = async (bookingId) => {
    if (newDate) {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/bookedCar/update/bookingDate/${bookingId}`,
        { bookingDate: newDate.toISOString() }
      );

      if (data?.acknowledged) {
        Swal.fire({
          title: "Canceled!",
          text: "Your booking is updated.",
          icon: "success",
        });
        refetchMyCars();
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300">Car Image</th>
              <th className="p-2 border border-gray-300">Car Model</th>
              <th className="p-2 border border-gray-300">Booking Date</th>
              <th className="p-2 border border-gray-300">Total Price</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}>
                <td className="p-2 border border-gray-300">
                  <img
                    src={booking.carDetails.carImageUrl}
                    alt={booking.carDetails.carModel}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  {booking.carDetails.carModel}
                </td>
                <td className="p-2 border border-gray-300">
                  {format(new Date(booking.bookingDate), "dd-MM-yyyy HH:mm")}
                </td>
                <td className="p-2 border border-gray-300">
                  ${booking.carDetails.dailyRentalPrice}
                </td>
                <td className="p-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      booking.bookingStatus ? "bg-[#2B3440]" : "bg-[#FFC147]"
                    }`}>
                    {booking.bookingStatus ? "Confirmed" : "Cancelled"}
                  </span>
                </td>
                <td className="p-2 border border-gray-300 space-x-2">
                  <button
                    disabled={!booking.bookingStatus}
                    onClick={() => handleModifyBooking(booking)}
                    className={`${
                      !booking.bookingStatus
                        ? "bg-slate-400"
                        : "bg-[#FFC147] hover:bg-[#FFC147]"
                    } px-3 py-1 text-white rounded shadow `}>
                    <i className="fas fa-calendar mr-1"></i> Modify
                  </button>
                  <button
                    disabled={!booking.bookingStatus}
                    onClick={() => handleCancelBooking(booking._id)}
                    className={`${
                      !booking.bookingStatus
                        ? "bg-slate-400"
                        : "bg-[#2B3440] hover:bg-[#FFC147]"
                    } px-3 py-1 text-white rounded shadow`}>
                    <i className="fas fa-trash mr-1"></i> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Date Picker */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Modify Booking Date</h2>
            <DatePicker
              selected={newDate}
              onChange={(date) => setNewDate(date)}
              showTimeSelect
              dateFormat="dd-MM-yyyy HH:mm"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-[#FFC147]">
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDateChange(selectedBooking._id)}
                className="px-4 py-2 bg-[#FFC147] text-white rounded shadow hover:bg-[#FFC147]">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingTable;
