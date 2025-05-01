import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getprofileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (dToken) {
      getprofileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData?.image) {
      setImagePreview(profileData.image);
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("degree", profileData.degree);
      formData.append("speciality", profileData.speciality);
      formData.append("experience", profileData.experience);
      formData.append("about", profileData.about);
      formData.append("fees", profileData.fees);
      formData.append("address", JSON.stringify(profileData.address));

      if (profileImage) {
        formData.append("image", profileImage);
      }

      await axios.post(`${backendUrl}/api/doctor/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${dToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      getprofileData(); // Refresh profile data
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Doctor Profile</h1>
        {isEdit ? (
          <div className="flex gap-2">
            <button
              onClick={updateProfile}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setImagePreview(profileData.image);
              }}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture Section */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            <img
              className="w-full h-64 md:h-80 object-cover rounded-lg border-2 border-primary/20"
              src={imagePreview || "/default-profile.png"}
              alt="Doctor Profile"
            />
            {isEdit && (
              <>
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-4 right-4 bg-primary hover:bg-primary-dark text-white p-2 rounded-full shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="w-full md:w-2/3 bg-white rounded-lg border border-stone-100 p-6">
          {/* Doctor Info */}
          <div className="mb-6">
            {isEdit ? (
              <input
                type="text"
                name="name"
                value={profileData.name || ""}
                onChange={handleInputChange}
                className="text-2xl font-bold w-full p-2 border border-gray-200 rounded-lg mb-2"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {profileData.name}
              </h2>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    name="degree"
                    value={profileData.degree || ""}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="Degree"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    name="speciality"
                    value={profileData.speciality || ""}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="Speciality"
                  />
                </>
              ) : (
                <p className="text-gray-600">
                  {profileData.degree} - {profileData.speciality}
                </p>
              )}

              {isEdit ? (
                <input
                  type="text"
                  name="experience"
                  value={profileData.experience || ""}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Years of experience"
                />
              ) : (
                <span className="inline-block py-1 px-3 bg-primary/10 text-primary text-xs rounded-full">
                  {profileData.experience} years experience
                </span>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-primary mb-1">About:</h3>
            {isEdit ? (
              <textarea
                name="about"
                value={profileData.about || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700"
                rows="4"
                placeholder="Tell patients about your practice and expertise..."
              />
            ) : (
              <p className="text-sm text-gray-600">
                {profileData.about || "No information provided"}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Appointment Fee */}
            <div>
              <h3 className="text-sm font-medium text-primary mb-1">
                Appointment fee:
              </h3>
              {isEdit ? (
                <div className="flex items-center">
                  <span className="mr-2 text-gray-600">{currency}</span>
                  <input
                    type="number"
                    name="fees"
                    value={profileData.fees || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    min="0"
                  />
                </div>
              ) : (
                <p className="text-gray-800">
                  {currency} {profileData.fees || "Not specified"}
                </p>
              )}
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-sm font-medium text-primary mb-1">
                Clinic Address:
              </h3>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="line1"
                    value={profileData.address?.line1 || ""}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="Address line 1"
                  />
                  <input
                    type="text"
                    name="line2"
                    value={profileData.address?.line2 || ""}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="Address line 2"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  {profileData.address?.line1 || "No address provided"}
                  <br />
                  {profileData.address?.line2}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
