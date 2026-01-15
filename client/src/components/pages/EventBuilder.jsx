import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api";
import { FaCheckCircle, FaCalendarAlt, FaUsers, FaArrowRight, FaArrowLeft, FaBirthdayCake, FaGlassCheers, FaBriefcase, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EventBuilder = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  
  // Step 0: Event Type, 1: Details, 2: Venue, 3: Catering, 4: Decoration, 5: Review
  // We'll treat Event Type as Step 0 internally or just shift everything by 1.
  // Let's shift everything by 1 for clarity. 
  // Step 1: Celebration Type
  // Step 2: Date/Guests
  // ...
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Data
  const [venues, setVenues] = useState([]);
  const [caterings, setCaterings] = useState([]);
  const [decorations, setDecorations] = useState([]);

  // Selections
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedCatering, setSelectedCatering] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);

  // Customizations
  const [eventDetails, setEventDetails] = useState({
    date: "",
    guests: 100,
    specialRequests: "",
  });

  const celebrationTypes = [
    { name: "Wedding", icon: <FaHeart className="text-pink-500 text-4xl mb-2" />, desc: "Complete wedding planning" },
    { name: "Birthday", icon: <FaBirthdayCake className="text-purple-500 text-4xl mb-2" />, desc: "Fun-filled birthday bashes" },
    { name: "Corporate", icon: <FaBriefcase className="text-blue-500 text-4xl mb-2" />, desc: "Professional corporate events" },
    { name: "Anniversary", icon: <FaGlassCheers className="text-red-500 text-4xl mb-2" />, desc: "Celebrate your love story" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [venueRes, cateringRes, decorationRes] = await Promise.all([
          api.get("/banquet"),
          api.get("/catering"),
          api.get("/decoration"),
        ]);
        setVenues(venueRes.data.data);
        setCaterings(cateringRes.data.data);
        setDecorations(decorationRes.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load resources");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const calculateTotal = () => {
    let total = 0;
    if (selectedVenue) total += selectedVenue.rentalPrice || 0;
    if (selectedCatering) {
        total += selectedCatering.pricePerPlate * eventDetails.guests;
    } else if (selectedVenue && !selectedCatering) {
        total += selectedVenue.pricePerPlate * eventDetails.guests;
    }
    if (selectedDecoration) total += selectedDecoration.price;
    return total;
  };

  const handleBooking = async () => {
    if (!isLogin) {
      toast.error("Please login to proceed with booking");
      navigate("/login");
      return;
    }

    try {
        const payload = {
            type: "Custom",
            banquet: selectedVenue?._id,
            catering: selectedCatering?._id,
            decoration: selectedDecoration?._id,
            eventDate: eventDetails.date,
            guests: eventDetails.guests,
            totalAmount: calculateTotal(),
            specialRequests: `Event Type: ${selectedEventType}. ${eventDetails.specialRequests}`,
            customizations: {
                eventType: selectedEventType,
                venue: selectedVenue?.name,
                catering: selectedCatering?.name,
                decoration: selectedDecoration?.name
            }
        };

        await api.post("/booking", payload);
        toast.success("Event Successfully Booked!");
        navigate("/CustomerDashboard");
    } catch (error) {
        toast.error("Booking Failed");
    }
  };

  if (loading) return <div className="text-center py-20">Loading Builder...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0"></div>
            {[1, 2, 3, 4, 5, 6].map((s) => (
                <div key={s} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${step >= s ? "bg-amber-500" : "bg-gray-300"}`}>
                    {s}
                </div>
            ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 min-h-[60vh]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                {step === 1 && "Start Planning: What are we celebrating?"}
                {step === 2 && "Step 2: Event Details"}
                {step === 3 && "Step 3: Select Venue"}
                {step === 4 && "Step 4: Select Catering"}
                {step === 5 && "Step 5: Select Decoration"}
                {step === 6 && "Step 6: Review & Confirm"}
            </h2>

            {/* Step 1: Celebration Type */}
            {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 hover:cursor-pointer">
                    {celebrationTypes.map((type) => (
                        <div 
                            key={type.name} 
                            onClick={() => { setSelectedEventType(type.name); handleNext(); }}
                            className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${selectedEventType === type.name ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-300"}`}
                        >
                            {type.icon}
                            <h3 className="font-bold text-lg text-gray-800">{type.name}</h3>
                            <p className="text-sm text-gray-500 mt-2">{type.desc}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
                <div className="max-w-md mx-auto space-y-4">
                    <div className="text-center mb-6">
                        <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold">Selected: {selectedEventType}</span>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Event Date</label>
                        <input type="date" className="w-full border p-2 rounded" value={eventDetails.date} onChange={e => setEventDetails({...eventDetails, date: e.target.value})} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Guests</label>
                        <input type="number" className="w-full border p-2 rounded" value={eventDetails.guests} onChange={e => setEventDetails({...eventDetails, guests: parseInt(e.target.value)})} />
                    </div>
                    <div className="flex justify-between mt-8">
                         <button onClick={handleBack} className="px-6 py-2 bg-gray-300 rounded">Back</button>
                         <button onClick={handleNext} disabled={!eventDetails.date} className="px-6 py-2 bg-amber-500 text-white rounded disabled:opacity-50">Next</button>
                    </div>
                </div>
            )}

            {/* Step 3: Venue */}
            {step === 3 && (
                <div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div onClick={() => setSelectedVenue(null)} className={`bg-gray-100 p-4 rounded cursor-pointer border-2 ${selectedVenue === null ? "border-amber-500" : "border-transparent"}`}>
                             <h3 className="font-bold">No Venue (I have my own)</h3>
                        </div>
                        {venues.map(v => (
                            <div key={v._id} onClick={() => setSelectedVenue(v)} className={`bg-white shadow p-4 rounded cursor-pointer border-2 ${selectedVenue?._id === v._id ? "border-green-500" : "border-transparent"}`}>
                                <img src={v.images[0]} className="h-32 w-full object-cover mb-2 rounded" alt="" />
                                <h3 className="font-bold">{v.name}</h3>
                                <p className="text-sm">Cap: {v.capacity} | Base: ₹{v.rentalPrice}</p>
                            </div>
                        ))}
                     </div>
                     <div className="flex justify-between mt-8">
                        <button onClick={handleBack} className="px-6 py-2 bg-gray-300 rounded">Back</button>
                        <button onClick={handleNext} className="px-6 py-2 bg-amber-500 text-white rounded">Next</button>
                     </div>
                </div>
            )}

             {/* Step 4: Catering */}
             {step === 4 && (
                <div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div onClick={() => setSelectedCatering(null)} className={`bg-gray-100 p-4 rounded cursor-pointer border-2 ${selectedCatering === null ? "border-amber-500" : "border-transparent"}`}>
                             <h3 className="font-bold">Use Venue Food / None</h3>
                             <p className="text-sm">If Venue selected, uses venue price/plate</p>
                        </div>
                        {caterings.map(c => (
                            <div key={c._id} onClick={() => setSelectedCatering(c)} className={`bg-white shadow p-4 rounded cursor-pointer border-2 ${selectedCatering?._id === c._id ? "border-green-500" : "border-transparent"}`}>
                                <img src={c.images[0]} className="h-32 w-full object-cover mb-2 rounded" alt="" />
                                <h3 className="font-bold">{c.name}</h3>
                                <p className="text-sm">Price: ₹{c.pricePerPlate}/plate</p>
                                <p className="text-xs text-gray-500">{c.menuType}</p>
                            </div>
                        ))}
                     </div>
                     <div className="flex justify-between mt-8">
                        <button onClick={handleBack} className="px-6 py-2 bg-gray-300 rounded">Back</button>
                        <button onClick={handleNext} className="px-6 py-2 bg-amber-500 text-white rounded">Next</button>
                     </div>
                </div>
            )}

            {/* Step 5: Decoration */}
            {step === 5 && (
                <div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div onClick={() => setSelectedDecoration(null)} className={`bg-gray-100 p-4 rounded cursor-pointer border-2 ${selectedDecoration === null ? "border-amber-500" : "border-transparent"}`}>
                             <h3 className="font-bold">No Decoration</h3>
                        </div>
                        {decorations.map(d => (
                            <div key={d._id} onClick={() => setSelectedDecoration(d)} className={`bg-white shadow p-4 rounded cursor-pointer border-2 ${selectedDecoration?._id === d._id ? "border-green-500" : "border-transparent"}`}>
                                <img src={d.images[0]} className="h-32 w-full object-cover mb-2 rounded" alt="" />
                                <h3 className="font-bold">{d.name}</h3>
                                <p className="text-sm">Price: ₹{d.price}</p>
                                <p className="text-xs text-gray-500">{d.type}</p>
                            </div>
                        ))}
                     </div>
                     <div className="flex justify-between mt-8">
                        <button onClick={handleBack} className="px-6 py-2 bg-gray-300 rounded">Back</button>
                        <button onClick={handleNext} className="px-6 py-2 bg-amber-500 text-white rounded">Next</button>
                     </div>
                </div>
            )}

            {/* Step 6: Review */}
            {step === 6 && (
                <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Confirm Your Event</h3>
                    <div className="space-y-3 mb-6">
                         <div className="flex justify-between border-b pb-2">
                            <span>Event Type:</span>
                            <span className="font-bold text-purple-600">{selectedEventType}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Date:</span>
                            <span className="font-bold">{eventDetails.date}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Guests:</span>
                            <span className="font-bold">{eventDetails.guests}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Venue:</span>
                            <span className="font-bold">{selectedVenue ? selectedVenue.name : "None"}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Catering:</span>
                            <span className="font-bold">{selectedCatering ? selectedCatering.name : "Venue/Other"}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Decoration:</span>
                            <span className="font-bold">{selectedDecoration ? selectedDecoration.name : "None"}</span>
                        </div>
                        <div className="flex justify-between pt-2 text-xl font-bold text-amber-600">
                            <span>Estimated Total:</span>
                            <span>₹{calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <textarea 
                        className="w-full border p-3 rounded mb-4" 
                        placeholder="Any special requests?" 
                        value={eventDetails.specialRequests}
                        onChange={e => setEventDetails({...eventDetails, specialRequests: e.target.value})}
                    ></textarea>

                    <div className="flex justify-between">
                        <button onClick={handleBack} className="px-6 py-2 bg-gray-300 rounded">Back</button>
                        <button onClick={handleBooking} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold shadow-lg hover:from-green-600 hover:to-emerald-700">Confirm Booking</button>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default EventBuilder;
