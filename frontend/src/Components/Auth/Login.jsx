import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import './signup.css'
import background from "../Assets/background.png";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            email: "",
            password: "",
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const handlesubmit = async (e) => {
            e.preventDefault();
    
            await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            })
                .then((res) => {
                    return res.json();
                })
                .then((response) => {
                    console.log("login res ", response);
                    if (response.ok) {
                        toast(response.message);
                        navigate("/home");
                        window.location.reload();
                        // await setCookie('authToken', response.data.authToken)
                        // await setCookie('refreshToken', response.data.refreshToken)
                        // const authToken = await getCookie('authToken');
                        // console.log('My Cookie Value:', authToken);
                        // checkLogin();
                    } else {
                        toast(response.message);
                    }
                })
                .catch((error) => {
                    toast("Error logging in", {
                        type: "error",
                        position: "top-right",
                        autoClose: 2000,
                    });
                });
        };


    return (
        <>
        <ToastContainer/>
            <div className="login-body">
                <div className="sign-container" style={{backgroundImage: `url(${background})`,
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        width: "100%",
                                                        height: "100vh", }}>
                    <div className="sign-col">
                        {/* <img src={signimg} alt="man" className="sign-img"/> */}
                    </div>
                    <div class="login-box sign-col">
                        <h2 className="page-head">Log-in</h2>
                        
                            <div className="input-field">
                                <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="sign-input"/>
                            </div>

                            <div className="input-field">
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="sign-input"  />
                            </div>

                            <button onClick={handlesubmit} className="sign-submit">Log in</button>

                            <p className="check-line">New to our Chatbot? <Link to='/'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login