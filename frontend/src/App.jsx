import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import CarsPage from "./pages/CarsPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import RentalsPage from "./pages/RentalsPage";
import CreateRentalPage from "./pages/CreateRentalPage";
import StatsPage from "./pages/StatsPage";
import UsersPage from "./pages/UsersPage";
import CategoriesPage from "./pages/CategoriesPage";
import DbExceptionPage from "./pages/DbExceptionPage";
import ActiveRentalsPage from "./pages/ActiveRentalsPage";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />

          <Route path="/rentals" element={<RentalsPage />} />
          <Route path="/rentals/active" element={<ActiveRentalsPage />} />
          <Route path="/create" element={<CreateRentalPage />} />

          <Route path="/stats" element={<StatsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/db-exception" element={<DbExceptionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
