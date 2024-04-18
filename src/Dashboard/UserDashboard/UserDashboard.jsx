import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { AuthContext } from '../../Providers/AuthProviders';


const UserDashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [bal, setBal] = useState(0)
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setEmail(user?.email)
        console.log(user);
    }, [user]);


    useEffect(() => {
        fetch(`https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/bookings?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                let money = 0;
                data.map((booking) => {
                    money += parseInt(booking.balance ? booking.balance : 0)
                })
                setBal(money)
                setLoading(false);
            });

    }, [email, loading])

    const sum = () => {
        let money = 0;
        bookings.map((booking) => {
            money += parseInt(booking.balance)
        })
        return money;
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-blue-500 text-white pt-4">
                    <h1 className="text-2xl font-bold text-center pb-3">User Dashboard</h1>
                </header>
                <div className="container mx-auto p-4">
                    <div className="flex items-center mb-4">
                        <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="User Avatar" className="w-20 h-20 rounded-full" />
                        <div className="ml-2">
                            <h2 className="text-lg font-bold">{user?.displayName}</h2>
                            
                            <p className="text-gray-600">Email: {email}</p>
                            
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Add your dashboard cards or widgets here */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-300 rounded p-4 shadow">
                            <h2 className="text-lg font-bold ">Total Ticket</h2>
                            <p className='text-5xl'>{bookings.length}</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded p-4 shadow">
                            <h2 className="text-lg text-bold ">Total Spend</h2>
                            <p className='text-5xl'>{bal}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded p-4 shadow">
                            <h2 className="text-lg text-white">MRT PASS</h2>
                            <p className='text-5xl text-white'>29 DAYS</p>
                        </div>
                    </div>
                </div>
                <table className="container mx-auto p-4 bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">NAME</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">DATE</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">EXPIRE</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">BALANCE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <tr className='className="bg-gray-100"'>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.expire}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.balance}</td>
                            </tr>)
                        }
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDashboard;