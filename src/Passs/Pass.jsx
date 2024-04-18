import React, { useContext, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../Providers/AuthProviders";
import Navbar from '../Navbar/Navbar';

const Pass = () => {
    const [save, setSave] = useState(false);
    const [show, setShow] = useState(true);
    const [printing, setPrinting] = useState(true);
    const dateApi = 'https://worldtimeapi.org/api/timezone/Asia/Dhaka';
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dataParam = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataParam));

    const formdata = location.state;

    useEffect(() => {
        if (save) {
            if (formdata) {
                console.log(formdata);
                let FormDatas = { ...formdata, date: dateM, expire: date, id: `MRT-${formdata.phone}`, balance: 300 }
                console.log(FormDatas);
                fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/postMrt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(FormDatas)
                })
                    .then(res => res.json())
                    .then(data => console.log(data));
            }
            else {
                let FormDatas = { ...data, id: `MRT-${user.phoneNumber}`, phone: user.phoneNumber }
                console.log(FormDatas);
                fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/bookTicket', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(FormDatas)
                })
                    .then(res => res.json())
                    .then(data => console.log(data));
            }
        }
    }, [save])

    const getDate = (dateString) => {
        const date = new Date(dateString);
        let monthName = date.toLocaleString('default', { month: 'long' });
        const print = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
        return print;
    }

    const [dateM, setDateM] = useState("");
    useEffect(() => {
        fetch(dateApi)
            .then(res => res.json())
            .then(data => {
                const dateTime = data.datetime.split('T');
                setDateM(getDate(dateTime[0]));
            })
    }, []);

    const [date, setDate] = useState('');
    useEffect(() => {
        const dateParts = dateM.split(', ');
        const d = parseInt(dateParts[1]) + 10;
        setDate(dateParts[0] + ', ' + d);
    }, [dateM]);

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'p') {
                setPrinting(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.ctrlKey && event.key === 'p') {
                setPrinting(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div>
            <Navbar></Navbar>

            {show ? (
                <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto">
                    <figure><img src="https://repository-images.githubusercontent.com/198359987/a5145380-e312-11e9-89e0-33b42410e0fd" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Enter Your Number!</h2>
                        <div className='form-control border'>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900  ">Your Phone Number</label>
                                <input disabled value="01xxxxxxxx" type="text" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Phone" />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900  ">Password</label>
                                <input value="******" disabled type="password" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Password" />
                            </div>

                        </div>
                        <div className="card-actions justify-end">
                            <button onClick={() => { setShow(false); setPrinting(false); setSave(true) }} className="btn btn-primary">Proceed</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-8/12 mx-auto my-5">

                    <div className="w-full bg-gray-100 border border-gray-200 rounded-lg shadow">
                        <div className=' border-b-2 border-red-600 rounded-t-lg'>
                            <div className='flex justify-between items-center my-3 py-2 md:px-5 px-3'>
                                <div className="flex flex-row items-center">
                                    <img src="https://seeklogo.com/images/D/dhaka-mass-transit-company-limited-dmtcl-logo-DA9F1D1088-seeklogo.com.png" className="md:h-8 h-6 md:w-12 w-8"></img>
                                    <a className="md:text-2xl text-md ml-2 normal-case">Dhaka Metro</a>
                                </div>
                                <div className='border-2 border-green-800 rounded-lg py-1 md:px-4 px-1'>
                                    <h1 className='text-green-700 md:text-xl text-sm uppercase'> {data ? "regular" : "MRT"}</h1>
                                </div>
                            </div>
                        </div>

                        <div className='px-8 py-8 md:grid grid-cols-6 gap-4 bg-yellow-100'>
                            <div className='col-span-4'>
                                <div className='mb-8'>
                                    {
                                        data ? '' : <h1 className='md:text-3xl text-xl uppercase font-bold mb-2'>{formdata.name}</h1>
                                    }
                                    <h3 className='md:text-xl text-md font-semibold uppercase'>Phone: {formdata ? formdata.phone : user ? user.phoneNumber : ''}</h3>
                                    {
                                        data ? '' : <h3 className='md:text-xl text-md font-semibold uppercase'>{formdata.id}: {formdata.no}</h3>
                                    }
                                </div>
                                <h2 className='md:text-3xl text-xl font-semibold uppdercase mb-4'>{data ? "Ticket info" : "MRT PASS INFO"}</h2>
                                <div className='md:flex justify-between'>
                                    <div>
                                        <div className='mb-4'>
                                            <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>MRT ID</h1>
                                            <h1 className='md:text-xl text-md'>MRT-{formdata ? formdata.phone : user ? user.phoneNumber : ''}</h1>
                                        </div>
                                        <div>
                                            <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>Balance</h1>
                                            <h1 className='md:text-xl text-md'>{data ? data.fair : "300 BDT"}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='mb-4 mt-3'>
                                            <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>{data ? "From" : "Issued date"}</h1>
                                            <h1 className='md:text-xl text-md'>{data ? data.from : dateM}</h1>
                                        </div>
                                        <div>
                                            <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>{data ? "To" : "Expiry date"}</h1>
                                            <h1 className='md:text-xl text-md'>{data ? data.to : date}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 pr-4 md:flex flex-col items-center justify-between mt-3'>
                                <QRCode value={formdata ? formdata.phone : user?.phoneNumber}></QRCode>
                                <p className='md:ml-10'><span className='md:text-lg text-md font-semibold mt-1 '>Issued By</span> <br /> <span className='md:text-lg text-md'>Dhaka Metro Authority</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!printing && (
                <button onClick={handlePrint} className="btn btn-primary mx-auto block">Print Ticket</button>
            )}

            {!printing && (
                <div className="print-only">
                    <div className="w-full bg-gray-100 border border-gray-200 rounded-lg shadow">
                        {/* Printing section content */}
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pass;
