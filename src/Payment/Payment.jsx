import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dataParam = searchParams.get('data');
    console.log(encodeURIComponent(JSON.stringify(dataParam)));
    return (
        <div className='flex justify-center items-center mt-48'>
            <div className=''>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://repository-images.githubusercontent.com/198359987/a5145380-e312-11e9-89e0-33b42410e0fd" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Enter Your Number!</h2>
                        <div className='form-control border'>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900  ">Your Phone Number</label>
                                <input type="text" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Phone" />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900  ">Password</label>
                                <input type="password" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Password" />
                            </div>

                        </div>
                        <div className="card-actions justify-end">
                           <button onClick={() => navigate(`/pass?data=${encodeURIComponent(JSON.stringify(dataParam))}`)} className="btn btn-primary">Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;