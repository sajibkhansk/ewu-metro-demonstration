import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const [tickets, setTickets] = useState(null);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState({});
    const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically

    useEffect(() => {
        // Check if user is authenticated on component mount
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser || loggedInUser !== 'employee@gmail.com') {
            // Redirect to login page if user is not authenticated
            navigate('/login'); // Use navigate function for redirection
        } else {
            fetchTickets();
        }
    }, [navigate]);

    const fetchTickets = () => {
        // Check if user is authenticated before fetching tickets
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser !== 'employee@gmail.com') {
            // Redirect to login page if user is not authenticated
            navigate('/login'); // Use navigate function for redirection
            return;
        }

        fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/tickets')
            .then(res => res.json())
            .then(data => setTickets(data))
            .catch(err => console.error('Error fetching tickets:', err));
    };

    useEffect(() => {
        if (tickets !== null)
            setTotal(tickets.length);
    }, [tickets])

    console.log(tickets);
    return (

        <div>
<Navbar></Navbar>
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-orange-400 text-white pt-4">
                    <h1 className="text-2xl font-bold text-center text-black pb-3">Employee DashBoard</h1>
                </header>
                <div>
                    <div className="container mx-auto p-4 flex justify-between">
                        <div className="flex items-center mb-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <div className="ml-2">
                                <h2 className="text-lg font-bold">Sajib Khan</h2>
                                <p className="text-gray-600">ID: 123-456-7890</p>
                                <p className="text-gray-600">Position: Ticekt colllector </p>
                            </div>

                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded p-4 shadow">
                            <h2 className="text-lg text-white">Total Ticekt</h2>
                            <p className='text-5xl text-white'>{total}</p>
                        </div>

                    </div>
                </div>

                <table className="container mx-auto p-4 bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">Date</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">PHONE</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tickets && tickets.map(ticket => <tr className="bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{ticket._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{ticket.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{ticket.phone}</td>
                            </tr>)
                        }


                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
