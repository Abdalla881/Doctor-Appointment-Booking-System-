import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctort'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const doc = doctors.find(doc => doc._id === docId)
    setDocInfo(doc)
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);  // Clear previous slots
  
    let today = new Date();
    let allSlots = [];
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(10, 0, 0, 0); // Start at 10:00 AM
  
      let endTime = new Date(currentDate);
      endTime.setHours(20, 0, 0, 0); // End at 8:00 PM
  
      let timeSlots = [];
  
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
        let slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        let slotTime = formattedTime;
  
        const isSlotAvailable = !(docInfo?.slots_booked?.[slotDate]?.includes(slotTime));
  
        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }
  
        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      allSlots.push(timeSlots);
    }
  
    setDocSlots(allSlots); // Update state once
  };
  

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment')
      return navigate('/login')
    }
  
    if (!docSlots[slotIndex] || !slotTime) {
      toast.error('Please select a valid time slot')
      return
    }
  
    try {
      const date = docSlots[slotIndex][0].datetime
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
  
      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, 
        { docId, slotDate, slotTime }, 
        { headers: { token } }
      )
  
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while booking the appointment')
    }
  }

  useEffect(() => {
    fetchDocInfo(docInfo)
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      {/* ---------- Doctor Details ---------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ---------- Doc Info : name, degree, experience ---------- */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* ---------- Doctor About ---------- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="" /></p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">Appointment fee: <span className='text-gray-600 font-bold'>{docInfo.fees}{currencySymbol}</span></p>
        </div>
      </div>

      {/* ---------- Booking Slots ---------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
     docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
      <p 
        onClick={() => setSlotTime(item.time)} 
        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} 
        key={index}
      >
        {item.datetime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
      </p>
    ))
          }
        </div>

        <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />

    </div>
  )
}

export default Appointment