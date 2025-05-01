import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../../../admin/src/assets/assets_admin/assets";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-5">
      <h2 className="mb-4 text-xl font-semibold">All Appointments</h2>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 py-3 px-6 bg-gray-50 border-b">
          <p className="col-span-1 font-medium text-gray-600 text-sm">#</p>
          <p className="col-span-3 font-medium text-gray-600 text-sm">
            Patient
          </p>
          <p className="col-span-2 font-medium text-gray-600 text-sm">
            Payment
          </p>
          <p className="col-span-1 font-medium text-gray-600 text-sm">Age</p>
          <p className="col-span-3 font-medium text-gray-600 text-sm">
            Date & Time
          </p>
          <p className="col-span-2 font-medium text-gray-600 text-sm">
            Actions
          </p>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No appointments found
          </div>
        ) : (
          appointments.reverse().map((item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors items-center"
            >
              {/* Serial Number */}
              <p className="col-span-1 text-gray-600">{index + 1}</p>

              {/* Patient Info */}
              <div className="col-span-3 flex items-center gap-3">
                <img
                  src={item.userData.image || assets.defaultAvatar}
                  alt={item.userData.name}
                  className="w-8 h-8 rounded-full object-cover border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = assets.defaultAvatar;
                  }}
                />
                <div>
                  <p className="font-medium">{item.userData.name}</p>
                  <p className="text-xs text-gray-500">{item.userData.email}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="col-span-2">
                <span
                  className={`text-xs inline-block px-3 py-1 rounded-full ${
                    item.payment
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  }`}
                >
                  {item.payment ? "Online" : "CASH"}
                </span>
              </div>

              {/* Age */}
              <p className="col-span-1 max-sm:hidden">
                {calculateAge(item.userData.dob)}
              </p>

              {/* Date & Time */}
              <div className="col-span-3">
                <p className="font-medium">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>
                <p className="text-xs text-gray-500">
                  {item.status || "Scheduled"}
                </p>
              </div>

              {/* Fees and Actions */}
              <div className="col-span-2 flex items-center justify-between">
                <p className="font-medium mr-2 text-gray-700">
                  {currency}
                  <span className="ml-1">{item.amount || "0"}</span>
                </p>

                {item.isCompleted ? (
                  <p className="text-xs text-green-500">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-5 cursor-pointer"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-5 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
