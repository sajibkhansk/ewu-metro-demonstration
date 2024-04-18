import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import signinimg from '../../public/signIn.png';

const Login = () => {
    const { signIn, googleProvider, signWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginWithGoogle = () => {
        signWithGoogle(googleProvider)
            .then(result => {
                console.log(result.user);
                navigate('/mrt');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleLogin = event => {
        event.preventDefault();
        console.log(email, password);
    
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // Set email in local storage
                localStorage.setItem('user', email);
                navigate("/");
            })
            .catch(error => {
                console.log(error);
                setEmail(''); // Clear email input
                setPassword(''); // Clear password input
                setError('Invalid email or password');
            });
    };

    return (
        <div>
            <div className="hero-content flex-col lg:flex-row mx-auto">
                <div className="w-1/2 mr-12">
                    <img src="https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg?w=2000" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" className="input input-bordered" />
                            </div>
                            {error && <p className="text-red-600">{error}</p>}
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>

                        <p className='text-center font-semibold text-orange-600'> or </p>

                        <button className='flex justify-center' onClick={handleLoginWithGoogle}>
                            <img className='h-14 w-72' src={signinimg} alt="Sign in with Google" />
                        </button>

                        <p className='my-4 text-center'>New to Dhka Metro <Link className='text-orange-600 font-bold' to="/signup">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
