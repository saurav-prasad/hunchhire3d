import { useEffect, useState } from "react";

// Custom hook to check device type - mobile/pc
const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };

    checkDeviceType(); // Initial check
    window.addEventListener("resize", checkDeviceType); // Update on resize

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  return isMobile;
};

export default useDeviceType;
