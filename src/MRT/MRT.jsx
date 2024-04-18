import { useContext, useEffect, useState } from "react";
import infoimg from "../../public/info.png"
import card from "../../public/card.png"
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";


const MRT = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [info, setInfo] = useState({});
    const { user, logOut } = useContext(AuthContext);
    const [email, setEmail] = useState('')

    useEffect(() => {
        setEmail(user?.email)

    }, [user]);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const dob = form.dob.value;
        const gender = form.gender.value;
        const id = form.id.value;
        const address = form.address.value;
        const no = form.no.value;
        const des = form.des.value;
        const phone = form.phone.value;
        const email = form.email.value;
        // Perform form validation
        let errors = {};
        if (name === '') {
            errors.name = "Please enter your name"
        }
        if (dob === '') {
            errors.dob = "Please enter your dob"
        }
        if (gender === "Select Gender") {
            errors.from = "Please select your gender";
        }
        if (id === '') {
            errors.id = "Please select a type"
        }
        if (no === '') {
            errors.no = "Please enter a valid NID/Passpor/Birth certificate id"
        }
        if (phone === '') {
            errors.phone = "Please enter your phone no"
        } if (email === '') {
            errors.email = "Please enter your email no"
        }
        // If there are validation errors, update the error state and return
        if (Object.keys(errors).length > 0) {
            setError(errors);
            console.log(errors);
            return;
        }
        else {
            setError({});
            const formdata = {};
            formdata.name = name;
            formdata.dob = dob;
            formdata.gender = gender;
            formdata.id = id;
            formdata.no = no;
            formdata.phone = phone;
            formdata.email = email;
            formdata.des = des;
            formdata.address = address;
            fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nid: no})
            })
                .then(res => res.json())
                .then(data => {
                    if(data.exist){
                        errors.no = "Indentification number already registered"
                        setError(errors)
                    } else{
                        navigate(`/pass`, { state: formdata });
                    }
                });
            
        }


    };
    useEffect(() => { console.log(info); }, [info])
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex justify-center ">

                <h1 className=" bg-blue-100 rounded-lg md:py-5 py-2 md:px-60 px-14 md:text-5xl text-xlfont-semibold md:mt-16 mt-8 md:mb-7 mb-5 border-b-4 w-fit border-blue-800 flex items-center"><span><img className=" md:mr-5 mr-2 md:w-20 md:h-20 w-8 h-8" src={card} /></span>Purchase MRT Pass</h1>
            </div>
            <div className="mx-auto grid md:grid-cols-2 grid-cols-1 w-full md:py-10 py-5 md:px-20 px-5 rounded-md bg-gray-100">
                <form onSubmit={handleSignUp} className="md:border-r-4 border-slate-700 md:pr-10">

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Name</label>
                        <input type="text" name="name" className={`${error.name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} placeholder="name " />
                        {
                            error.name ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.name}</p> : <></>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Date of Birth</label>
                        <input type="date" name="dob" className={`${error.dob ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} placeholder="dob" />
                        {
                            error.dob ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.dob}</p> : <></>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Gender</label>
                        <select id="countries" name="gender" className={`${error.from ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`}>
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        {
                            error.from ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.from}</p> : <></>
                        }
                    </div>
                    <fieldset className="md:flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Choose:</label>
                        <div className="flex items-center mb-4">
                            <input type="radio" name="id" value="NID" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700   " checked />
                            <label className="block ml-2 text-sm font-medium text-gray-900  ">
                                NID
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input type="radio" name="id" value="passport" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700   " />
                            <label className="block ml-2 text-sm font-medium text-gray-900  ">
                                Passport
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input type="radio" name="id" value="birth" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700   " />
                            <label className="block ml-2 text-sm font-medium text-gray-900  ">
                                Birth Certificate
                            </label>
                        </div>
                    </fieldset>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">NID/Birth Certificate/Passpost</label>
                        <input type="tel" name="no" className={`${error.no ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} placeholder="" />
                        {
                            error.no ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.no}</p> : <></>
                        }
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Designation</label>
                        <input type="tel" name="des" className={`${error.designation ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} placeholder="Designation" />
                        {
                            error.designation ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.designation}</p> : <></>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Address</label>
                        <input type="tel" name="address" className={`${error.address ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} placeholder="Address" />
                        {
                            error.address ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.address}</p> : <></>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Phone No</label>
                        <input type="tel" name="phone" className={`${error.phone ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} placeholder="Phone no" />
                        {
                            error.phone ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.phone}</p> : <></>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900  ">Email</label>
                        <input type="tel" name="email" className={`${error.email ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}`} value={email} disabled placeholder="Email " />
                        {
                            error.email ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.email}</p> : <></>
                        }
                    </div>

                    <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Apply" />

                </form>
                <div className="md:ml-10 md:mr-2 md:mt-0 mt-8">
                    <ul className=" w-full h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg      ">
                        <li className=" text-2xl w-full px-4 py-2 border-b-4 border-green-600 rounded-t-lg    flex items-center">
                            <img src={infoimg} className="w-7 h-7" />
                            <span className="ml-4">Instructions</span></li>
                        <li className="text-lg w-full px-4 py-2 border-b border-gray-200   ">1. Inset your name and date of birth properly</li>
                        <li className="text-lg w-full px-4 py-2 border-b border-gray-200   ">2. Select Your gender</li>
                        <li className="w-full px-4 py-2 text-lg border-b border-gray-200   ">3. Choose NID/Passport/Birth Certificate, that you have and provide the Id/Number of that</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200   ">4. Insert your Job title in Designation field"</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200   ">5. Provide your Address properly</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200   ">6. Provide your phone number nad Email</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200   ">7. Press Apply to purchase MRT Pass</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200    text-red-600">*Note: The MRT pass will cost you 500 BDT</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MRT;