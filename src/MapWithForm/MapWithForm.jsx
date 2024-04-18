import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import mrt_line from '../../public/mrt_line.svg'
import Navbar from '../Navbar/Navbar';

const MapWithForm = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [directions, setDirections] = useState(null);
    const apiKey = 'AIzaSyCWMPjB14EMyIGLnt5JgXJEO6B7phaDTfc'; // Replace with your Google Maps API key

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Perform necessary logic to get the directions
        calculateDirections();
    };

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

    return (
        <div >
            <Navbar></Navbar>
            <h1 className=" bg-green-100 md:py-5 py-2 w-2/3 md:text-5xl px-2  text-xlfont-semibold md:mt-16 mt-8 md:mb-10 mb-5 border-b-4 text-right border-blue-800 ">Map and destination</h1>
            <div className='bg-gray-100 md:p-5 p-2'>
                <div className='w-6/12 mx-auto'><form onSubmit={handleFormSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Origin</label>
                        <input type="text"
                            id="origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="Enter origin" className={`"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} />
                    </div>
                    <div className="mb-6 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Destination</label>
                        <input
                            type="text"
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter destination" className={`"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} />
                    </div>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Get Directions</button>
                </form></div>


                <div className='w-11/12 md:h-[600px] h-[300px] mx-auto mt-10 border-2 border-white'>
                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            mapContainerStyle={{ height: '100%', width: '100%' }}
                            center={{ lat: 23.827960749304314, lng: 90.36445188667143 }} // Default map center
                            zoom={15} // Default zoom level
                        >
                            {directions && <DirectionsRenderer directions={directions} />}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>

            <div className='flex justify-end'>
                <h1 className=" bg-green-100 md:py-5 py-2 w-2/3 md:text-5xl px-2  text-xlfont-semibold md:mt-16 mt-8 md:mb-16 mb-5 border-b-4 text-left border-blue-800 ">Stations and Fair</h1>
            </div>
            <div className='bg-gray-100 p-4'>
                <div className='flex justify-center'>
                    <h1 className="border-b-4 border-b-cyan-950 w-fit mb-5 md:text-5xl text-lg text-blue-600 font-semibold">Fair Chart</h1>
                </div>
                <div className='w-10/12 mx-auto md:h-[500px] h-[300px] border-2 border-gray-800'>
                    <iframe src="https://dmtcl.portal.gov.bd/sites/default/files/files/dmtcl.portal.gov.bd/page/d35b2fc3_915c_4656_8dba_373e3ef4c5a6/2023-05-21-07-04-92d05cca942d0471cc571601d8aa395f.pdf" title="PDF Viewer" width="100%" height="100%"></iframe>
                </div>

                <div>
                    <div className='flex justify-center md:mt-10 mt-5'>
                        <h1 className="border-b-4 border-b-cyan-950 w-fit mb-5 md:text-5xl text-lg text-blue-600 font-semibold">Route Maps</h1>
                    </div>
                    <div className='bg-gray-600 p-5 w-10/12 mx-auto grid md:grid-cols-8 border-2 gap-6'>
                        <img className='md:w-[850px] md:h-[1000px] col-span-6' src={mrt_line} />
                        <img className="col-span-2" src='https://i.pinimg.com/originals/1e/b7/45/1eb74506bcdee5b1db6e6e933a01476c.jpg' alt="" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapWithForm;

{/* <div className='w-6/12 mx-auto'>
<form onSubmit={handleFormSubmit}>
    <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">Origin</label>
        <input type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter origin" className={`"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} />
    </div>
    <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">Destination</label>
        <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination" className={`"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} />
    </div>
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Get Directions</button>
</form>
</div>


</div> */}