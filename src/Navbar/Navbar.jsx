import { Link, Navigate, useNavigate } from "react-router-dom";
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useContext, useEffect, useState } from 'react';
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Navbar = () => {

    const { user, logOut,visitors } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error));
            localStorage.removeItem('user');
        navigate('/')
    }
    const [open, setOpen] = useState(false);
    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className=" shadow-sm">
            
            <div className=" text-black hover:text-white navbar flex flex-row justify-between rounded-sm backdrop-blur-3xl bg-transparent hover:bg-gray-900">
                <Link to="/">
                    <div className="flex flex-row">
                        <img src="https://seeklogo.com/images/D/dhaka-mass-transit-company-limited-dmtcl-logo-DA9F1D1088-seeklogo.com.png" className="h-8 w-12"></img>
                        <a className="md:text-2xl sm:text-xl ml-2 normal-case">Dhaka Metro</a>
                    </div>
                </Link>

                <ul className="menu menu-horizontal px-1 hidden md:flex mx-2 text-xl">
                    <li><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-blue-800" : ""}>Home</NavLink></li>
                    <li><HashLink smooth to="/#scroll">Buy Ticket </HashLink></li>
                    <li><NavLink to={user?.email ? '/mrt' : '/login'} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-blue-800" : ""}>MRT Pass</NavLink></li>
                    <li><NavLink to="/route" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-blue-800" : ""}>Route & Stations</NavLink></li>

                </ul>
                <div className={` gap-2 hidden  ${user?.email ? "md:flex z-30" : ""}`}>
                    <p className="text-lg">{user?.displayName}</p>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL ? user?.photoURL : "https://thumbs.dreamstime.com/b/female-avatar-profile-picture-vector-female-avatar-profile-picture-vector-102690279.jpg"} />
                            </div>
                        </label>
                        <ul tabIndex={0} className={` ${open ? "mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black" : 'absolute -top-36'}`}>
                            <li>
                                <NavLink to={user?.email?.includes('admin') ? '/adminDashboard' : user?.email?.includes('emp') ? '/employeeDashboard' : '/userDashboard'} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-blue-800" : ""}>Dashboard</NavLink>
                            </li>
                            {
                                user ? <li onClick={handleLogOut}><a>Logout</a></li> : ""
                            }
                        </ul>
                    </div>
                </div>
                <div onClick={() => navigate("/login")} className={` gap-2 hidden  ${user?.email ? "" : " md:flex btn btn-ghost text-xl normal-case"}`}>
                    Sign In
                </div>
                <div className="flex-none md:hidden">

                    <div className="dropdown dropdown-end">
                        <label onClick={() => setOpen(!open)} tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <span>
                                <Bars3Icon className="h-6 w-6" />
                            </span>
                        </label>
                        <ul tabIndex={0} className={` ${open ? 'text-black menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52' : 'absolute -top-96'}`}>
                            <li>
                                <NavLink to={user?.email?.includes('admin') ? '/adminDashboard' : user?.email?.includes('emp') ? '/employeeDashboard' : '/userDashboard'} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-blue-800" : ""}>Dashboard</NavLink>
                            </li>
                            <li><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-blue-800" : ""}>Home</NavLink></li>
                            <li><HashLink smooth to="/#scroll">Buy Ticket </HashLink></li>
                            <li><Link to="/mrt">MRT Pass</Link></li>
                            <li><Link to="/route">Routes & Stations</Link></li>

                            {
                                user ? <button onClick={handleLogOut} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    logout
                                </button> :
                                    <button onClick={() => navigate("/login")} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Login
                                    </button>

                            }
                        </ul>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default Navbar;