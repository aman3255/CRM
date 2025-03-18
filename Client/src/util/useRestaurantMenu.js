import { useState, useEffect } from "react";
import { MENU_API } from "./constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (resId) fetchMenu();
  }, [resId]); // Added resId as a dependency

  const fetchMenu = async () => {
    try {
        const response = await fetch(`http://localhost:2000/menu?resId=${resId}`); 


        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const json = await response.json();
        setResInfo(json.data.data);
    } catch (error) {
        console.error("Error fetching menu:", error);
        setResInfo(null);
    }
};


  return resInfo;
};

export default useRestaurantMenu;
