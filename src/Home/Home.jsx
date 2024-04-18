
import Marquee from "react-fast-marquee";
import { FaRegEye } from "react-icons/fa";

import { createContext, useContext, useEffect, useState } from "react";
import gmail from "../../public/gmail.png"
import info from "../../public/info.png"
import Ticket from "../../public/ticket.png"
import news from "../../public/megaphone.png"
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './Home.css'
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
const Home = ({ child }) => {
    const { user, logOut, visitors } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an asynchronous task
        setTimeout(() => {
            setLoading(false); // Set loading to false when the task is complete
        },);
    }, []);
    const stationList = [
        "Uttara North", "Uttara Center", "Uttara South", "Pallabi", "Mirpur 11", "Mirpur 10", "Kazipara", "Shewrapara", "Agargaon", "Bijoy Sarani", "Farmgate", "Kawran Bazar", "Shahbagh", "Dhaka University", "Bangladesh Secretariat", "Motijheel", "Komolapur"];
    const fairList = [
        [0, 20, 20, 30, 30, 40, 40, 50, 60, 60, 70, 80, 80, 90, 90, 100, 100],
        [20, 0, 20, 20, 30, 30, 40, 40, 50, 60, 60, 70, 80, 80, 90, 90, 100],
        [20, 20, 0, 20, 20, 30, 30, 40, 40, 50, 60, 60, 70, 70, 80, 90, 90],
        [30, 20, 20, 0, 20, 20, 20, 30, 30, 40, 50, 50, 60, 60, 70, 80, 80],
        [30, 30, 20, 20, 0, 20, 20, 20, 30, 40, 40, 50, 50, 60, 70, 70, 80],
        [40, 30, 30, 20, 20, 0, 20, 20, 20, 30, 30, 40, 50, 50, 60, 60, 70],
        [40, 40, 30, 20, 20, 20, 0, 20, 20, 20, 30, 40, 40, 50, 50, 60, 70],
        [50, 40, 40, 30, 20, 20, 20, 0, 20, 20, 20, 30, 40, 40, 50, 50, 60],
        [60, 50, 40, 30, 30, 20, 20, 20, 0, 20, 20, 20, 30, 30, 40, 50, 50],
        [60, 60, 50, 40, 40, 30, 20, 20, 20, 0, 20, 20, 20, 30, 40, 40, 50],
        [70, 60, 60, 50, 40, 30, 30, 20, 20, 20, 0, 20, 20, 20, 30, 30, 40],
        [80, 70, 60, 50, 50, 40, 40, 30, 20, 20, 20, 0, 20, 20, 20, 30, 30],
        [80, 80, 70, 60, 50, 50, 40, 40, 30, 20, 20, 20, 0, 20, 20, 20, 30],
        [90, 80, 70, 60, 60, 50, 50, 40, 30, 30, 20, 20, 20, 0, 20, 20, 20],
        [90, 90, 80, 70, 70, 60, 50, 50, 40, 40, 30, 20, 20, 20, 0, 20, 20],
        [100, 90, 90, 80, 70, 60, 60, 50, 50, 40, 30, 30, 20, 20, 20, 0, 20],
        [100, 100, 90, 80, 80, 70, 70, 60, 50, 50, 40, 30, 30, 20, 20, 20, 0]
    ];
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [directions, setDirections] = useState(null);
    const [fair, setFair] = useState(0);
    const [notices, setNotices] = useState([])
    const navigate = useNavigate();
    const apiKey = 'AIzaSyCWMPjB14EMyIGLnt5JgXJEO6B7phaDTfc';

    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=23.8103&lon=90.4125&appid=1d978d91ed6f50a0d6ea61d8136e8caf`;
    const dateApi = 'https://worldtimeapi.org/api/timezone/Asia/Dhaka';
    const [weather, setWeather] = useState(null);
    const [date, setDate] = useState(null);
    const [dateM, setDateM] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState({});
    const [email, setEmail] = useState(false);
    const [ticket, setTicket] = useState({});
    const [data, setData] = useState(null);
    const [originSelect, setOriginSelect] = useState(false);
    const [destSelect, setDestSelect] = useState(false);
    const [ban, setBan] = useState(false);
    const fetchWeatherData = () => {
        fetch(weatherApi)
            .then(res => res.json())
            .then(data => setWeather(data));
    }

    useEffect(() => {
        fetch(`https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/getNotice`)
            .then(res => res.json())
            .then(data => setNotices(data));

    }, [email])

    useEffect(() => {
        fetchWeatherData();

        const interval = setInterval(() => {
            fetchWeatherData();
        }, 3600000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    useEffect(() => {
        fetch(dateApi)
            .then(res => res.json())
            .then(data => {
                setDate(data)
                const dateTime = data.datetime.split('T');
                setDateM(getDate(dateTime[0]));

                const [hours, minutes] = dateTime[1].split(':');
                let hours12 = parseInt(hours, 10);
                const meridiem = hours12 >= 12 ? 'PM' : 'AM';
                if (hours12 === 0) {
                    hours12 = 12;
                } else if (hours12 > 12) {
                    hours12 -= 12;
                }
                const time12 = `${hours12}:${minutes} ${meridiem}`;
                setTime(time12);
            });

    }, []);
    const updateTime = (p) => {
        let str = p.split(':');
        const hours = parseInt(str[0], 10);

        if (typeof str[1] !== 'undefined') {
            const str2 = str[1].split(' ');
            const minutes = parseInt(str2[0], 10);
            if (typeof str2[1] !== 'undefined') {
                let med = str2[1];
                let hr = parseInt(hours, 10);
                let min = parseInt(minutes, 10);
                console.log(hr, min, med);
                min += 1;
                if (min == 60) {
                    hr++;
                    min = 0;
                }
                if (hr > 12) {
                    hr -= 11
                    if (med === 'AM') {
                        med = 'PM'
                    } else {
                        med = 'AM'
                    }
                }
                let t = `${hr}:${min} ${med}`
                if (min <= 9) {
                    t = `${hr}:0${min} ${med}`
                }
                return t;
            }
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(updateTime(time));
        }, 60000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);
    const calculateFair = () => {
        if (originSelect && destSelect) {
            const i = stationList.indexOf(origin);
            const j = stationList.indexOf(destination);
            if (i !== -1 && j !== -1) {
                setFair(fairList[i][j]);
            }
        }
    }
    const location = useLocation();
    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const from = form.from.value;
        const to = form.to.value;
        // Perform form validation
        let errors = {};
        if (from === "Select Station") {
            errors.from = "Please select a station";
        }
        if (to === "Select Station") {
            errors.to = "Please select a station";
        }
        // If there are validation errors, update the error state and return
        if (Object.keys(errors).length > 0) {
            setError(errors);
            console.log(errors);
            return;
        }
        else {
            setError({});
            const data = {
                from: from,
                to: to,
                fair: fair,
                date: dateM,
                time: time
            };

            navigate(`/app`, { state: data });
            // send();
        }

    };



    useEffect(() => {
        if (ticket !== null) {
            // navigate(`/app`, { state : ticket} );
        }
    }, [ticket])

    const [selectedOption, setSelectedOption] = useState('');
    const calculateDirections = () => {

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING',
            },
            (response, status) => {
                if (status === 'OK') {
                    setDirections(response);
                } else {
                    console.error('Directions request failed:', status);
                }
            }
        );
    };
    const handleSelectChangeFrom = (value) => {
        if (value !== 'Select Station') {
            setOrigin(value);
            setOriginSelect(true);
        }
        else {
            setOriginSelect(false);
        }

    };

    const handleSelectChangeTo = (value) => {
        if (value !== 'Select Station') {
            setDestination(value);
            setDestSelect(true);
        }
        else {
            setDestSelect(false);
        }
    };
    useEffect(() => {
        if (!loading) {
            console.log("i am false");
            calculateDirections()
        }

        calculateFair()
    }, [destination, origin])


    return (
        <div className="relative">

            <div className={`w-full h-[700px] bg-container  bg-cover bg-center`}>
                <div className="absolute top-0 z-30 w-full">
                    <Navbar></Navbar>
                </div>

                <div className="my-0 md:top-20 top-20 absolute w-full h-15 text-lg text-red-600 font-semibold backdrop-blur-sm bg-white/80 md:flex">

                    <div className="flex align-middle items-center">

                        <button className=" btn btn-secondary btn-xs sm:btn-sm md:h-10 md:w-18 lg:btn-lg bg-red-600 md:block">Notices</button>
                        <Marquee className="">
                            নতুন সময় অনুযায়ী সকাল ৮টা থেকে বেলা ১১টা পর্যন্ত ‘পিক আওয়ার’ হিসেবে বিবেচনা করে প্রতি ১০ মিনিট পর পর মেট্রো ছাড়বে। বেলা ১১টার পর থেকে ১৫ মিনিটের ব্যবধানে মেট্রো ছাড়বে বিকেল ৩টা পর্যন্ত। পরবর্তী ৩ ঘণ্টা আবারও ১০ মিনিট পর পর স্টেশন ছাড়বে মেট্রো রেল। সন্ধ্যা ৬টা এক মিনিট থেকে ‘নন পিক আওয়ার’ ধরে ১৫ মিনিট পরপর মেট্রো চলবে রাত ৮টা পর্যন্ত
                        </Marquee>
                    </div>



                </div>

                <div className="md:p-12 p-3 mx-auto absolute md:top-44 md:left-8 top-60 left-0  text-center flex flex-col justify-center items-center backdrop-blur-sm bg-black/30 rounded-sm">
                    <h1 id="google_translate_element" className="md:text-5xl text-3xl drop-shadow-2xl font-bold text-white"><span className="text-sky-500">Welcome</span> to Dhaka Metro</h1>
                    <div className="md:text-3xl text-xl drop-shadow-2xl font-semibold text-white  mt-10">
                        {
                            dateM !== null && time !== null &&
                            <div className="flex">
                                <h2>{dateM}</h2>
                                <h2 className="md:ml-14 ml-5">{time}</h2>
                            </div>
                        }
                    </div>
                    <div className="md:text-3xl drop-shadow-2xl text-xl font-semibold text-white  mt-5">
                        {
                            weather !== null &&
                            <div className="flex items-center">
                                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
                                <h1>{weather.weather[0].main}</h1>
                                <div className="text-center">
                                    <h1 className="md:ml-14 ml-5">{Math.round((weather.main.temp - 273.15).toFixed(2))} <sup className="text-xl">o</sup>C</h1>
                                    <h1 className="md:ml-14 ml-5">Dhaka</h1>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="md:text-3xl text-xl drop-shadow-2xl font-semibold text-white  mt-10 w-full flex justify-center">
                        <div>
                        <div className="flex w-7/12 items-center">
                            <h2>{visitors == 0 ? '' : <FaRegEye className="ms-4" />}</h2>
                           
                            <p className="ms-2">{visitors == 0 ? '' : visitors}</p>
                        </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="md:my-8 my-4">
                <div>
                    <div className="carousel w-11/12 md:h-60 h-80 mx-auto">
                        <div id="slide1" className="carousel-item relative w-full">
                            <img src="https://bddealbazar.com/wp-content/uploads/2023/05/Bkash-10-Cashback-offer-02.jpg" className="w-full" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full">
                            <img src="https://bioxin.s3.ap-south-1.amazonaws.com/uploads/all/5noyFAfrRwp4xN8PeT5jSJ9uDd96Su8fnc5erYY5.png" className="w-full" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full">
                            <img src="https://www.nop-station.com/images/uploaded/Products/nagad-manual-payment-banner.png" className="w-full" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div id="scroll" className="flex justify-center ">

                <h1 className=" bg-blue-100 rounded-lg md:py-5 py-2 md:px-40 px-14 md:text-5xl text-xlfont-semibold md:mt-16 mt-8 md:mb-7 mb-5 border-b-4 w-fit border-blue-800 flex"><span><img className=" md:mr-5 mr-2 md:w-14 md:h-14 w-8 h-8" src={Ticket} /></span>Buy Single Journey Ticket</h1>
            </div>

            <div className="mx-auto grid md:grid-cols-2 grid-cols-1 w-full md:py-10 py-5 md:px-20 px-5 rounded-md bg-gray-100">


                <form className="md:border-r-4 border-slate-700 md:pr-10" onSubmit={handleSignUp}>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">From</label>
                        <select onChange={(e) => handleSelectChangeFrom(e.target.value)} id="origin" name="from" className={`${error.from ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}>
                            <option>Select Station</option>
                            <option>Uttara North</option>
                            <option>Uttara Center</option>
                            <option>Uttara South</option>
                            <option>Pallabi</option>
                            <option>Mirpur 11</option>
                            <option>Mirpur 10</option>
                            <option>Kazipara(Mirpur)</option>
                            <option>Shewrapara</option>
                            <option>Agargaon</option>
                            <option>Bijoy Sarani</option>
                            <option>Farmgate</option>
                            <option>Kawran Bazar</option>
                            <option>Shahbagh</option>
                            <option>Dhaka University</option>
                            <option>Bangladesh Secretariat</option>
                            <option>Motijheel</option>
                            <option>Komolapur</option>
                        </select>
                        {
                            error.from ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.from}</p> : <></>
                        }
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">To</label>
                        <select id="destination" onChange={(e) => handleSelectChangeTo(e.target.value)} name="to" className={`${error.to ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}>
                            <option>Select Station</option>
                            <option>Uttara North</option>
                            <option>Uttara Center</option>
                            <option>Uttara South</option>
                            <option>Pallabi</option>
                            <option>Mirpur 11</option>
                            <option>Mirpur 10</option>
                            <option>Kazipara(Mirpur) </option>
                            <option>Shewrapara</option>
                            <option>Agargaon</option>
                            <option>Bijoy Sarani</option>
                            <option>Farmgate</option>
                            <option>Kawran Bazar</option>
                            <option>Shahbagh</option>
                            <option>Dhaka University</option>
                            <option>Bangladesh Secretariat</option>
                            <option>Motijheel</option>
                            <option>Komolapur</option>
                        </select>
                        {
                            error.to ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.to}</p> : <></>
                        }
                    </div>

                    {/* <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Phone No</label>
                        <input type="tel" name="phone" className={`${error.phone ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} placeholder="Phone no" />
                        {
                            error.phone ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.phone}</p> : <></>
                        }
                    </div> */}
                    <div className="mb-6">
                        <h1 className={`border border-blue-500 rounded-lg p-[10px] block mb-2  text-xl font-medium text-gray-900   ${originSelect && destSelect ? 'block' : 'hidden'}`}>Fair for the choice : <span className="text-green-600">{originSelect && destSelect ? fair : '0'} BDT</span> </h1>
                    </div>
                    {/* <div className="flex">
                        <div className="mb-6">
                            <button onClick={() => setEmail(true)} className="border border-blue-500 rounded-lg p-[10px] block mb-2 text-sm font-medium text-gray-900  ">Don't have a phone number ?</button>
                        </div>
                        <div className={`ml-8 ${email ? 'block' : 'hidden'}`}>
                            <button className="flex bg-white border-2 border-slate-400 text-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <img src={gmail} className="h-4 w-4" /> <span className="ml-2">Gmail</span>
                            </button>
                        </div>
                    </div> */}
                    <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Continue" />
                </form>

                <div>
                    {/* Instructions section */}
                    <div className={`md:ml-10 md:mr-2 md:mt-0 mt-8 ${originSelect && destSelect ? 'hidden' : ''}`}>
                        <ul className="w-full h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg     ">
                            <li className="text-2xl w-full px-4 py-2 border-b-4 border-green-600 rounded-t-lg    flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={info} className="w-7 h-7" alt="Info Icon" />
                                    <span className="ml-4">{ban ? 'নির্দেশনা' : 'Instructions'}</span>
                                </div>
                                <span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input onChange={() => setBan(!ban)} type="checkbox" value="" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all    peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 ">{ban ? 'BN' : 'EN'}</span>
                                    </label>
                                </span>
                            </li>
                            <li className="text-lg w-full px-4 py-2 border-b border-gray-200   ">{ban ? '১. বাম দিকের ফর্ম থেকে স্টার্ট স্টেশন নির্বাচন করুন৷' : '1. Select start station from the form on the left'}</li>
                            <li className="text-lg w-full px-4 py-2 border-b border-gray-200   ">{ban ? '2. বাম দিকের ফর্ম থেকে গন্তব্য স্টেশন নির্বাচন করুন৷' : '2. Select destination station from the form on the left'}</li>
                            <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200   ">{ban ? '৩. চালিয়ে যেতে প্রেস করুন' : '3. Press continue to proceed'}</li>
                        </ul>
                    </div>

                    {/* Map section */}
                    <div className={`md:ml-10 md:mr-2 md:mt-0 mt-8 ${originSelect && destSelect ? 'block' : 'hidden'}`}>
                        <LoadScript googleMapsApiKey={apiKey}>
                            <GoogleMap
                                mapContainerStyle={{ height: '400px', width: '100%' }} // Define height and width of the map container
                                center={{ lat: 23.827960749304314, lng: 90.36445188667143 }} // Default map center
                                zoom={15} // Default zoom level
                            >
                                {directions && <DirectionsRenderer directions={directions} />}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>




            </div>

            <div id="scroll" className="flex justify-center ">

                <h1 className=" bg-blue-100 rounded-lg md:py-5 py-2 md:px-60 px-14 md:text-5xl text-xlfont-semibold md:mt-36 mt-8 md:mb-7 mb-5 border-b-4 w-fit border-blue-800 flex"><span><img className=" md:mr-5 mr-2 md:w-14 md:h-14 w-8 h-8" src={news} /></span>News and Notices</h1>
            </div>
            <div className=" bg-gray-100 mt-5 md:grid grid-cols-6 md:px-36 px-2 md:py-8 border-2 gap-5">

                <div className="overflow-x-auto md:col-span-4">
                    <h1 className="mb-5 md:text-3xl text-lg text-center text-blue-600 font-semibold">Topics</h1>
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Date</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                notices.map((notice, indx) =>
                                    <tr className="hover">
                                        <th>{indx + 1}</th>
                                        <td>{notice.date}</td>
                                        <td>{notice.title}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                    <button onClick={() => window.location.href = 'http://dmtcl.gov.bd/site/view/notices'} className="btn  w-full mt-4">See More</button>
                </div>
                <div className="mt-8 md:ml-16 flex center">
                    <iframe width="750" height="315" src="https://www.youtube.com/embed/3KtdjhgGi7g" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>

            {/* <div className="hidden">
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={{ height: '100%', width: '100%' }}
                        center={{ lat: 23.827960749304314, lng: 90.36445188667143 }} // Default map center
                        zoom={15} // Default zoom level
                    >
                        {directions && <DirectionsRenderer directions={directions} />}
                    </GoogleMap>
                </LoadScript>
            </div> */}
        </div>
    );

};

const getDate = (dateString) => {
    const date = new Date(dateString);
    let monthName = date.toLocaleString('default', { month: 'long' });
    const print = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
    return print;
}



export default Home;