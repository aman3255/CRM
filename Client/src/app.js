import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import UserContext from "./util/UserContext";
import { Provider } from "react-redux";
import appStore from "./util/appStore";
import Dashboard from "./components/home/DashBoard";
import Shimmer from "./components/common/Shimmer";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Auth from "./components/auth/Auth";

const Contact = lazy(() => import("./components/contact/Contact"));
const About = lazy(() => import("./components/about/About"));
const Body = lazy(() => import("./components//home/Body"));
const Cart = lazy(() => import("./components/cart/Cart"));
const RestaurantMenu = lazy(() => import("./components/restaurant/RestaurantMenu"));

const AppLayout = () => {
  const [userName, setuserName] = useState("Default User");

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setuserName }}>
        <div className="app">
          <Header />
          <Outlet />
          <ScrollRestoration />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/restaurants",
        element: (
          <Suspense fallback={<Shimmer />}>
            {" "}
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <Cart />
          </Suspense>
        ),
      },
      // {
      //   path: "/grocery",
      //   element: (
      //     <Suspense fallback={<h1>Loading..</h1>}>
      //       <Grocery />
      //     </Suspense>
      //   ),
      // },
      {
        path: "/restaurants/:resId",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <Auth />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
