import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";
import background from "../Assets/background.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://lifelink-3.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message, { autoClose: 2000 });

                // Store token (optional)
                localStorage.setItem("authToken", result.authToken);
                localStorage.setItem("refreshToken", result.refreshToken);
                console.log("Auth Token:", result.authToken);
                console.log("Refresh Token:", result.refreshToken);

                setTimeout(() => {
                    navigate("/home");
                    window.location.reload();
                }, 2000);
            } else {
                toast.error(result.message, { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Error logging in", {
                autoClose: 2000,
                position: "top-right",
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="login-body">
                <div
                    className="sign-container"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100vh",
                    }}
                >
                    <div className="sign-col"></div>
                    <div className="login-box sign-col">
                        <h2 className="page-head">Log-in</h2>
                        <div className="input-field">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="sign-input"
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="sign-input"
                            />
                        </div>
                        <button onClick={handleSubmit} className="sign-submit">
                            Log in
                        </button>
                        <p className="check-line">
                            New to our Chatbot? <Link to="/">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
