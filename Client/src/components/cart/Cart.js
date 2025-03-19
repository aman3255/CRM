import { useSelector, useDispatch } from "react-redux";
import Item from "../restaurant/Item";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../util/cartSlice";
import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((sum, item) => {
      return sum + (item.card?.info?.price || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOrder = async () => {
    try {
      if (cartItems.length === 0){
        alert("Your cart is empty!");
        return;
      }
      else{
      const response = await axios.post("http://localhost:2000/order", {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Order placed successfully!");
        dispatch(clearCart()); // Clear cart after order
      } else {
        alert("Error placing order. Please try again.");
      }}
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Please login to place your order");
        navigate("/auth");
      } else {
        console.error("Order Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="mb-24 flex flex-col items-center p-4">
        <div className="w-2/3 p-4 flex justify-between items-center">
          <h1 className="font-medium text-3xl tracking-wider">Cart</h1>
          <div>
            <Link to={"/restaurants"}>
              <button className="p-2 m-2 border-2 border-black rounded-lg transition-custom">
                Add Items
              </button>
            </Link>
            <button
              className="p-2 m-2 border-2 border-black rounded-lg transition-custom"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
        <div className="w-2/3 text-center">
          <Item items={cartItems} />
          {cartItems.length === 0 && (
            <h1 className="m-4 font-medium text-2xl">Your cart is empty!</h1>
          )}
        </div>
        <div className="w-2/3 text-right font-medium m-3 text-xl tracking-wider">
          <button
            className="p-2 m-2 border-2 border-black rounded-lg"
            onClick={handleOrder}
          >
            Order Now
          </button>
          <span className="text-2xl">Total:</span> Rs.{totalPrice / 100}
        </div>
      </div>
    </div>
  );
};

export default Cart;
