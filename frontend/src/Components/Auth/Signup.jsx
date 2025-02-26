import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import background from "../Assets/background.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.ok) {
                    toast.success(response.message, {
                        position: "top-right",
                    });
                    window.location.href = "/login";
                } else {
                    toast.error(response.message, {
                        position: "top-right",
                    });
                }
            })
            .catch((err) => {
                toast.error(err.message, {
                    position: "top-right",
                });
                console.log(err);
            });
    };

    return (
        <>
            <ToastContainer />
            <login
                className="login-body" /*style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/background.png'})` }}*/
            >
                <div
                    className="sign-container"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="sign-col">
                        {/* <img src={signimg} alt="man" className="sign-img"/> */}
                    </div>
                    <div className="login-box sign-col">
                        <h2 className="page-head">Sign-up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-field">
                                <input
                                    type="text"
                                    name="name"
                                    className="sign-input"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    type="text"
                                    name="email"
                                    className="sign-input"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    type="password"
                                    name="password"
                                    className="sign-input"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="sign-submit">
                                SignUp
                            </button>

                            <p className="check-line">
                                Have an account? <Link to="/login">Log in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </login>
        </>
    );
};

export default Signup;
