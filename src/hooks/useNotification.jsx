import { useState, useEffect } from "react";

export default function useNotification() {
  const [permission, setPermission] = useState(Notification.permission);
  const [subscription, setSubscription] = useState(null);
  console.log("subcription : ", subscription);

  useEffect(() => {
    if (permission === "default") {
      Notification.requestPermission().then(setPermission);
    }
  }, [permission]);

  // 🔔 Minta izin notifikasi
  const requestNotificationPermission = async () => {
    const newPermission = await Notification.requestPermission();
    setPermission(newPermission);

    if (newPermission === "granted") {
      subscribeUserToPush();
    }
  };

  // 📌 Subscribe ke Push Manager
  const subscribeUserToPush = async () => {
    if (!("serviceWorker" in navigator)) {
      console.error("Service Worker tidak didukung di browser ini.");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (existingSubscription) {
        console.log(
          "User sudah berlangganan push notifications:",
          existingSubscription
        );
        setSubscription(existingSubscription);
        return;
      }

      const publicVapidKey =
        "BM79ezDNwJzUqdHtZfzHOcrKq9iaFFOY1sHC0SJizyh9L5J7AbbX227XtGI9ku7eGgFvqknHHaFXyfMAVp0Mqn8"; // Ganti dengan kunci asli jika ada

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      console.log("Subscription berhasil:", newSubscription);
      setSubscription(newSubscription);
    } catch (error) {
      console.error("Gagal subscribe ke push notifications:", error);
    }
  };

  // 🚀 Tampilkan Notifikasi
  const showNotification = (title, options) => {
    if (permission === "granted") {
      new Notification(title, options);
    } else {
      alert("🚨 Izin notifikasi belum diberikan!");
    }
  };

  return { permission, showNotification, requestNotificationPermission };
}

// 🔄 Konversi Public VAPID Key ke Uint8Array
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
};
