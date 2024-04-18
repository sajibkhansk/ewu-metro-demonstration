import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
useEffect(() => {
        // Check if user is authenticated on component mount
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser || loggedInUser !== 'mrtadmin@gmail.com') {
            // Redirect to login page if user is not authenticated
            navigate('/login'); // Use navigate function for redirection
        }
    }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Date:', date);
    console.log('Title:', title);
    console.log('Description:', description);

    const data = {
      date: date,
      title: title,
      description: description
    }
    fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/postNotice', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
        }
      })
    // Reset form fields
    setDate('');
    setTitle('');
    setDescription('');
  };
  return (

    <div className="bg-gray-100 min-h-screen">
      <Navbar></Navbar>
      <header className="bg-green-400 text-white pt-4">
        <h1 className="text-2xl font-bold text-center text-black pb-3">Admin Dashboard</h1>
      </header>
      <div>
        <div className="lg:container mx-auto p-4 flex justify-between">
          <div className="flex items-center mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="User Avatar" className="w-20 h-20 rounded-full" />
            <div className="ml-2">
              <h2 className="text-lg font-bold">Admin</h2>
              <p className="text-gray-600">ID: 123-456-7890</p>
              <p className="text-gray-600">Position: Ticket collector </p>
            </div>

          </div>


        </div>
      </div>
      <div className='lg:container mx-auto  flex justify-between items-center'>
        <div>
          <form onSubmit={handleSubmit} className="bg-gradient-to-r from-orange-500 to-blu-500 bg-white rounded-lg shadow-md p-6 lg:w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Post Something !!</h2>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className=" bg-gradient-to-r from-green-500 to-blue-500 text-black font-bold py-2 px-4 rounded ">Submit</button>
          </form>

          <div>

          </div>
        </div>
        <div>
          <img src="https://t4.ftcdn.net/jpg/05/83/13/79/360_F_583137908_Yk110BYszdrp134CCsfF1MPdcVTLNZBo.jpg" alt="" />
        </div>

      </div>

      <h1 className='text-center font-bold text-2xl p-4'>Employee List</h1>
      <table className="lg:container mx-auto p-4 bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">Email</th>
            <th className="px-6 py-3 bg-blue-500 text-white text-left text-sm font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap">Sajib Khan</td>
            <td className="px-6 py-4 whitespace-nowrap">employee@gmail.com</td>
            <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Sakib</td>
            <td className="px-6 py-4 whitespace-nowrap">emp@gmail.com</td>
            <td className="px-6 py-4 whitespace-nowrap">emp@gmail.com</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;