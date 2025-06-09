import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Superhéroes SPA</h1>
        <nav className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/marvel"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Marvel
          </NavLink>
          <NavLink
            to="/dc"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            DC
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Crear Superhéroe
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
