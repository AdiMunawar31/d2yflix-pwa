import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useNotification from "../hooks/useNotification";
import { Bell, BellOff } from "lucide-react";

const Header = () => {
  const { showNotification, requestNotificationPermission } = useNotification();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (permission === "granted") {
      setIsSubscribed(true);
    }
  }, [permission]);

  const handleNotification = () => {
    console.log("🔔 Mencoba menampilkan notifikasi...");
    showNotification("🚀 Notifikasi Berhasil!", {
      body: "Notifications D2YFLIX PWA.",
      icon: "/icons/icon-192x192.png",
    });
  };

  return (
    <div className="sticky top-0 w-full z-50">
      <div className="flex justify-between items-center bg-black/20 backdrop-blur-md p-4 sm:p-6 shadow-md">
        {/* Logo */}
        <Link to={"/"}>
          <div className="-ml-16">
            <svg
              viewBox="0 0 111 30"
              fill="#e50914"
              className="w-24 sm:w-28"
              focusable="false"
            >
              <g id="d2yflix-logo">
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z" />
              </g>
            </svg>
          </div>
        </Link>

        {/* Tombol */}
        <div className="flex space-x-3 sm:space-x-6 opacity-100">
          <button
            onClick={requestNotificationPermission}
            className="rounded-md mr-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5"
          >
            {isSubscribed ? <Bell /> : <BellOff />}
          </button>
          <button
            onClick={handleNotification}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition"
          >
            Notification
          </button>
          <Link
            to={"/watchlist"}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition"
          >
            Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
