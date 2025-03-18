import RestaurantCard, { withPromotedLabel } from "../restaurant/RestaurantCard.js";
import { useEffect, useState, useContext } from "react";
import Shimmer from "../common/Shimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../util/useOnlineStatus.js";

const Body = () => {
  const [listofRestaurant, setListofRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [filteredRestaurants, setfilteredRestaurant] = useState([]);
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);


  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  const fetchData = async () => {
    const { latitude, longitude } = await getLocation();
    const data = await fetch(
      
      `http://localhost:2000/restaurant?latitude=${latitude}&longitude=${longitude}`
    );
// `https://swiggy-proxy-production.up.railway.app/restaurant?latitude=${latitude}&longitude=${longitude}
    
    const json = await data.json();
    // Optional Chaining
    const restaurants =
      json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    setListofRestaurant(restaurants);
    setfilteredRestaurant(restaurants);
  };

  const onlinestatus = useOnlineStatus();
  if (onlinestatus === false) {
    return <h1>You are offline!</h1>;
  }

  return listofRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body pb-24 px-10 ">
      <div className="filter flex justify-end mr-4">
        <div className="mr-5 my-2">
          <input
            type="text"
            name="search"
            className="px-2 h-7 border-2 border-black rounded-md mr-3"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          ></input>
          <button
            className="font-medium py-1 px-5 border border-blue-500 bg-blue-300 rounded-md hover:bg-blue-400"
            onClick={() => {
              const filteredRestaurants = listofRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="my-2 py-1 px-3 font-medium border border-blue-500 bg-blue-300 rounded-md hover:bg-blue-400"
          onClick={() => {
            const filterList = listofRestaurant.filter(
              (res) => res.info.avgRating > 4.5
            );
            setfilteredRestaurant(filterList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="flex flex-wrap m-2">
        {filteredRestaurants.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
