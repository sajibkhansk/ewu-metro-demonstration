import React, { useContext, useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useCompactItemContext } from "antd/es/space/Compact";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PhoneVerify = ({ auth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    useEffect(() => {
        const ui =
            firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start(".otp-container", {
            signInOptions: [
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    defaultCountry: "BD",
                },
            ],
            signInSuccessUrl:
                `/pass?data=${encodeURIComponent(JSON.stringify(data))}`,
            privacyPolicyUrl: "/",
        });
        }, [auth]);

    return (
        <div className="text-3xl">
        <h1 className="text-3xl font-semibold w-fit mx-auto">Verify Phone Number with OTP</h1>
        <div className="otp-container"></div>;
        </div>
        
    );
    
};

export default PhoneVerify;