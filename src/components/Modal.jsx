import React, { useState } from "react";

function Modal({ onClose }) {
  const [phone, setPhone] = useState("");
  const [route, setRoute] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [gender, setGender] = useState("");


  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "").slice(0, 9); // faqat raqamlar va 9 raqam

    if (value.length <= 2) {
      value = value.replace(/(\d{2})/, "$1");
    } else if (value.length <= 5) {
      value = value.replace(/(\d{2})(\d{3})/, "$1 $2");
    } else if (value.length <= 7) {
      value = value.replace(/(\d{2})(\d{3})(\d{2})/, "$1 $2-$3");
    } else {
      value = value.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2-$3-$4");
    }

    setPhone(value);
  };

  return (
    <div className="h-dvh fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[300px] bg-white shadow-2xl rounded-xl h-[415px] p-4 relative">
        <h3 className="text-center text-xl font-semibold">Buyurtma berish</h3>

        <form className="flex flex-col items-center gap-4 mt-4" onSubmit={(e) => e.preventDefault()}>
          <select
            className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          >
            <option value="" disabled>🚖 Qayerdan? - Qayerga?</option>
            <option value="beshariq-fargona">📍 Beshariqdan - Farg‘onaga</option>
            <option value="fargona-beshariq">📍 Farg‘onadan - Beshariqqa</option>
          </select>

          <select
            className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
          >
            <option value="" disabled>🔢 Yo‘lovchilar soni</option>
            <option value="1">🧍 1 kishi</option>
            <option value="2">🧑‍🤝‍🧑 2 kishi</option>
            <option value="3">👨‍👩‍👦 3 kishi</option>
            <option value="4">👨‍👩‍👧‍👦 4 kishi</option>
          </select>

          <select
            className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>🚻 Erkak yoki Ayol?</option>
            <option value="female">👩 Ayol</option>
            <option value="male">👨 Erkak</option>
          </select>

          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="00 000-00-00"
            className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm pl-[70px]"
          />
          <button className="bg-[#FFDC71] shadow-md w-full py-2.5 mt-4 rounded-[16px] cursor-pointer text-black font-semibold">
            Buyurtma berish
          </button>
          <button
            className="bg-white border-[#FFDC71] border-2 shadow-md w-full py-2 rounded-[16px] cursor-pointer text-black font-semibold"
            type="button"
            onClick={onClose} // Modalni yopish
          >
            Yopish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
