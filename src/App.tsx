import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Login from "./Modules/Authentacations/components/Login/Login";
import MasterLayout from "./shard/MasterLayout/MasterLayout";
import RoomsList from "./Modules/Rooms/Roomslist/Roomslist";
import RoomsForm from "./Modules/Rooms/RoomsForm/RoomsForm";
import Dashboard from "./Modules/Dashboard/components/Dashboard";
import NotFound from "./shard/NotFound/NotFound";
import ChangePassword from "./Modules/Authentacations/components/ChangePassword/ChangePassword";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFound />,
    },
      {
          path: "change-password",
          element: <ChangePassword />,
        },
    {
      path: "",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "rooms/:roomId", element: <RoomsForm /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
