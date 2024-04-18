import { Outlet, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Main.css'
import { AuthContext } from "../Providers/AuthProviders";


const Main = () => {
    const { setVisitors } = useContext(AuthContext);
    const [done, setDone] = useState(false)

    useEffect(() => {
        const loadFingerprint = async () => {
            try {
                const fp = await FingerprintJS.load();
                const result = await fp.get();
                const fingerprint = result.visitorId;
                console.log(fingerprint);

                const domain = window.location.hostname;
                const key = `${domain}_user_key`
                const storedVisitorKey = JSON.parse(localStorage.getItem(key));
                //localStorage.setItem(key, JSON.stringify('fingerprint'))
                //localStorage.removeItem(key)

                if (storedVisitorKey) {
                    setDone(true)
                    if (storedVisitorKey != fingerprint) {
                        console.log('new fingerprint updated');
                        localStorage.setItem(key, JSON.stringify(fingerprint))
                        let info = {
                            prev_key: storedVisitorKey,
                            new_key: fingerprint
                        }
                        fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/postPrevVisitor', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(info)
                        })
                            .then(res => res.json())
                            .then(data => console.log(data));
                    }
                } else {
                    console.log('fingerprint saved');
                    localStorage.setItem(key, JSON.stringify(fingerprint))
                    let info = {
                        new_key: fingerprint
                    }
                    fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/postVisitor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(info)
                    })
                        .then(res => res.json())
                        .then(data => { console.log(data); setDone(true) });
                }


            } catch (error) {
                console.error('Fingerprinting failed:', error);
            }
        };

        loadFingerprint();
    }, []);

    useEffect(() => {
        if (done) {
            fetch('https://metro-server-tyti-sajibkhansk-sajibkhansks-projects.vercel.app/visitorsCount')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setVisitors(parseInt(data.visitors))
                });
        }
    }, [done])


    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="h-screen overflow-y-scroll hide-scrollbar bg-gray-50" >
            <div className="max-w-screen-xl mx-auto bg-gray-100 border px-1 py-1 rounded-sm">
                <Outlet></Outlet>
                {/* <Footer></Footer> */}
                {isHomePage && <Footer />}
            </div>
        </div>
    );
};

export default Main;