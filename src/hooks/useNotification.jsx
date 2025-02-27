import { useState, useEffect } from "react";

export default function useNotification() {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (permission === "default") {
      Notification.requestPermission().then(setPermission);
    }
  }, [permission]);

  const showNotification = (title, options) => {
    if (permission === "granted") {
      new Notification(title, options);
    } else {
      alert("🚨 Izin notifikasi belum diberikan!");
    }
  };

  return { permission, showNotification };
}
