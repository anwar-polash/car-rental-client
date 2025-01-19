import { Link, NavLink } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
  const { user, logOut } = useAuth();
  return (
    <section className="bg-neutral">
      <div className="max-w-[1320px] w-full mx-auto px-4 max-w-[1330px]:px-0 flex flex-col items-center  md:flex-row md:justify-between md:items-center py-6 space-y-4">
        <div>
          <Link
            to="/"
            className="text-center text-white font-bold text-[2.5rem]">
            <span className="text-[#FFB320]">C</span>ar
            <span className="text-[#FFB320]">R</span>ental
          </Link>
        </div>

        <div className="justify-center text-white text-[1rem] font-semibold hidden lg:flex">
          <ul className="flex items-center gap-5">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/available-cars">Available Cars</NavLink>
            {user && <NavLink to="/add-car">Add Car</NavLink>}
            {user && <NavLink to="/my-cars">My Cars</NavLink>}
            {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
          </ul>
        </div>

        <div className="flex items-center gap-4 text-white">
          {/* user pic */}
          {user && (
            <div className="w-12 h-12 rounded-full">
              <img
                className="w-full h-full rounded-full"
                src={user.photoURL}
                data-tooltip-id="user-name"
                data-tooltip-content={user.displayName}
              />
              <Tooltip id="user-name" />
            </div>
          )}

          {!user && (
            <Link
              to="/login"
              className="text-[#FFB320] px-8 py-3 bg-white rounded-full font-bold">
              Login
            </Link>
          )}

          {user && (
            <Link
              to={'/'}
              onClick={logOut}
              className="bg-[#FFB320] px-8 py-3 text-black rounded-full">
              Logout
            </Link>
          )}
          {/* mobile menu */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-gray-500 rounded-box z-[1] ml-[-160px] lg:ml-[0px] mt-6 w-52 p-2 shadow">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/available-cars">Available Cars</NavLink>
              {user && <NavLink to="/add-car">Add Car</NavLink>}
              {user && <NavLink to="/my-cars">My Cars</NavLink>}
              {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
