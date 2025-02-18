import React, { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";
import Location from "../assets/location.png";
import navBurger from "../assets/burger.svg";

function Home() {
    const [userLocation, setUserLocation] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [route, setRoute] = useState("");
    const [passengerCount, setPassengerCount] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => setAlertMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    const handleLocation = () => {
        if (!navigator.geolocation) {
            setAlertMessage({ text: "Geolokatsiya funksiyasi qo‘llab-quvvatlanmaydi.", type: "error" });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    setAlertMessage({ text: "Iltimos, lokatsiya funksiyasini yoqing.", type: "error" });
                } else {
                    setAlertMessage({ text: "Lokatsiya aniqlanmadi, qaytadan urinib ko‘ring.", type: "error" });
                }
            }
        );
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni saqlash

        if (value.startsWith("998")) {
            value = value.slice(3); // Agar foydalanuvchi 998 ni kiritgan bo‘lsa, olib tashlaymiz
        }

        value = value.slice(0, 9); // Maksimum 9 ta raqam

        let formatted = "";
        if (value.length > 7) {
            formatted = `${value.slice(0, 2)} ${value.slice(2, 5)}-${value.slice(5, 7)}-${value.slice(7)}`;
        } else if (value.length > 5) {
            formatted = `${value.slice(0, 2)} ${value.slice(2, 5)}-${value.slice(5)}`;
        } else if (value.length > 2) {
            formatted = `${value.slice(0, 2)} ${value.slice(2)}`;
        } else {
            formatted = value;
        }

        setPhone(formatted);
    };


    return (
        <div className="relative font-display flex flex-col mx-auto max-w-lg h-dvh">
            <div className={`transition ${isModalOpen ? "blur-sm pointer-events-none" : ""}`}>
                <button className="z-1 absolute bg-white mt-[48px] ml-[24px] pt-[21px] pr-[16px] pb-[21px] pl-[16px] rounded-[50%] active:scale-95 transition-[0.3s] cursor-pointer">
                    <img src={navBurger} alt="" />
                </button>
                <div>
                    <MapComponent userLocation={userLocation} />
                </div>
                <div className="bottom-0 z-20 absolute bg-white shadow-xl py-4 rounded-tl-4xl rounded-tr-4xl w-full h-full max-h-[200px] transition-transform duration-300 ${isModalOpen ? 'translate-y-10 opacity-50' : 'translate-y-0 opacity-100'}">
                    <div className="flex justify-center items-center">
                        <button
                            className="bottom-28 absolute flex items-center gap-2 bg-white px-20 py-3 border-2 border-black rounded-2xl font-semibold text-black active:scale-95 transition-[0.3s] cursor-pointer"
                            onClick={handleLocation}
                        >
                            <img src={Location} alt="" width={20} />
                            Lokatsiya
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className="bottom-3 absolute bg-[#151513] px-24 py-4 rounded-2xl font-semibold text-white active:scale-95 transition-[0.3s] cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Buyurtma berish
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30">
                    <div className="w-[300px] bg-white shadow-2xl rounded-xl h-[420px] p-4 relative">
                        <h3 className="text-center text-xl font-semibold">Buyurtma berish</h3>
                        <form className="flex flex-col items-center gap-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                            <select className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm">
                                <option value="" disabled>🚖 Qayerdan? - Qayerga?</option>
                                <option value="beshariq-fargona">📍 Beshariqdan - Farg‘onaga</option>
                                <option value="fargona-beshariq">📍 Farg‘onadan - Beshariqga</option>
                            </select>
                            <select className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm">
                                <option value="" disabled>🔢 Yo‘lovchilar soni</option>
                                <option value="1">🧍 1 kishi</option>
                                <option value="2">🧑‍🤝‍🧑 2 kishi</option>
                                <option value="3">👨‍👩‍👦 3 kishi</option>
                                <option value="4">👨‍👩‍👧‍👦 4 kishi</option>
                            </select>
                            <select className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm">
                                <option value="" disabled>🚻 Erkak yoki Ayol?</option>
                                <option value="male">👨 Erkak</option>
                                <option value="female">👩 Ayol</option>
                            </select>
                            <input
                                type="text"
                                value={phone ? `+998 ${phone}` : ""}
                                onChange={handlePhoneChange}
                                placeholder="+998 00 000-00-00"
                                className="w-full p-2 border-2 border-yellow-500 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-yellow-600 text-sm"
                                maxLength={17}
                            />


                            <button className="bg-[#FFDC71] shadow-md w-full py-2.5 mt-4 rounded-[16px] cursor-pointer text-black font-semibold">
                                Buyurtma berish
                            </button>
                            <button
                                className="bg-white border-[#FFDC71] border-2 shadow-md w-full py-2 rounded-[16px] cursor-pointer text-black font-semibold"
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Yopish
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(Home);
