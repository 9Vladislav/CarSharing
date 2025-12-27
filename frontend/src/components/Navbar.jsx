import { NavLink } from "react-router-dom";
import Container from "./Container";

const linkCls = ({ isActive }) =>
  "rounded-xl px-3 py-2 text-sm font-semibold transition whitespace-nowrap " +
  (isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100");

export default function Navbar() {
  return (
    <div className="border-b bg-white">
      <Container>
        <div className="flex items-center py-3">
          <div className="mr-6 text-lg font-extrabold text-red-600">
            CarSharing
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <NavLink to="/" end className={linkCls}>Авто</NavLink>
            <NavLink to="/rentals" end className={linkCls}>Оренди</NavLink>
            <NavLink to="/rentals/active" className={linkCls}>Активні оренди</NavLink>
            <NavLink to="/users" className={linkCls}>Користувачі</NavLink>
            <NavLink to="/categories" className={linkCls}>Категорії</NavLink>
            <NavLink to="/create" className={linkCls}>Створити оренду</NavLink>
            <NavLink to="/stats" className={linkCls}>Статистика</NavLink>
            <NavLink to="/db-exception" className={linkCls}>DB Exception</NavLink>
          </nav>

          <a
            className="ml-auto rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noreferrer"
          >
            Swagger
          </a>
        </div>
      </Container>
    </div>
  );
}
