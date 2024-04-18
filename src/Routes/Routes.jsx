import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import MRT from "../MRT/MRT";
import MapWithForm from "../MapWithForm/MapWithForm";
import Login from "../component/Login";
import SignUp from "../component/SignUp";
import Pass from "../Passs/Pass";
import EmployeeDashboard from "../Dashboard/EmployeeDashboard/EmployeeDashboard";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "../Dashboard/UserDashboard/UserDashboard";
import App from "../App";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/mrt",
                element:<MRT></MRT>
            },
            {
                path:"/route",
                element:<MapWithForm></MapWithForm>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/Signup",
                element:<SignUp></SignUp>
            },
            {
                path:"/pass",
                element:<Pass></Pass>
            },
            {
                path:"/employeeDashboard",
                element:<EmployeeDashboard></EmployeeDashboard>
            }
            ,
            {
                path:"/userDashboard",
                element:<UserDashboard></UserDashboard>
            }
            ,
            {
                path:"/adminDashboard",
                element:<AdminDashboard></AdminDashboard>
            },
            {
                path:"/app",
                element:<App></App>
            }
        ]
    },
    {
        
    }
])

export default routes;