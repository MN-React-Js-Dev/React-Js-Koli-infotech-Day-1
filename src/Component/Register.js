import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerForm } from './actions';

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegx = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
const baseURL = "https://c76b-203-109-79-214.in.ngrok.io/api/"
var passwordregx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const Register = () => {

    const myState = useSelector((state) => state)
    
    const dispatch = useDispatch();

    const [submit, setsubmit] = useState(false)
    const [inputDatas, setinputDatas] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        password: "",
        confirmPassword: "",
        address: ""
    })
    const [error, seterror] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        password: "",
        confirmPassword: "",
        address: ""
    })

    const HandleInputFields = (e) => {
        const { name, value } = e.target
        setinputDatas({ ...inputDatas, [name]: value })
        switch (name) {
            case "name":
                error.name = value.length > 0 ? "" : "Enter your Name"
                break;
            case "email":
                if (!value) {
                    error.email = value.length > 0 ? "" : "Enter your email"
                }
                else {
                    error.email = emailRegx.test(value) === false && "Enter your valid email"
                }
                break;
            case "phone":
                 if (!value) {
                    error.phone = value.length > 0 ? "" : "Enter your phone"
                } else {
                    error.phone = phoneRegx.test(value) === false && "Enter your valid phone number"
                }
                break;
            case "age":
                error.age = value.length > 0 ? "" : "Enter your age"
                break;
            case 'password':
                if (!value) {
                    error.password = "Please enter your Password";
                }
                else if (value.length < 4) {
                    error.password = "Password length must more than 4 character";

                }
                else if (value.length > 16) {
                    error.password = "Password length must be less than 16 characters";
                }
                else if (value !== inputDatas.confirmPassword) {
                    error.password = "Password and Confirm Password does not match.";
                }
                else {
                    error.password = passwordregx.test(value) === false && "Enter your valid password"

                    error.password = ""
                    error.confirmPassword = "";
                }
                break;
            case 'confirmPassword':

                if (!value) {
                    error.confirmPassword = "Please enter your Confirm Password ";
                }
                else if (value.length < 4) {
                    error.confirmPassword = "Password length must more than 4 character";

                }
                else if (value.length > 16) {
                    error.confirmPassword = "Password length must be less than 16 characters";
                }
                else if (value !== inputDatas.password) {
                    error.confirmPassword = "Password and Confirm Password does not match.";
                }
                else {
                    error.confirmPassword = ""
                    error.password = "";
                }
                break;

            case "address":
                error.address = value.length > 0 ? "" : "Enter your Address"
                break;

            default:
                break;
        }
        seterror(error)
    }

    function validate(value) {
        if (!inputDatas.name) {
            error.name = "Enter your Name"
        }
        if (!inputDatas.email) {
            error.email = "Enter your email"
        }
        if (!inputDatas.phone) {
            error.phone = "Enter your phone"
        }
        if (!inputDatas.age) {
            error.age = "Enter your age"
        }
        if (!inputDatas.password) {
            error.password = "Enter your password"
        }
        if (!inputDatas.confirmPassword) {
            error.confirmPassword = "Enter your confirm password"
        }
        if (!inputDatas.address) {
            error.address = "Enter your Address"
        }
        return error
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && Object.keys(inputDatas).length !== 0) {
            console.log(error, "error")
        }
    }, [])

    const HandleSubmitButton = (e) => {
        e.preventDefault()

        setsubmit(true)
        seterror(validate(inputDatas));
        if (inputDatas.name !== "" && inputDatas.email !== "" && inputDatas.phone !== "" && inputDatas.age !== "" && inputDatas.password !== "" && inputDatas.confirmPassword !== "" && inputDatas.address !== "") {
            if (inputDatas.password === inputDatas.confirmPassword) {

                dispatch(registerForm(inputDatas))
                // console.log(inputDatas, "inputDatas----")

                var registerPaylod = {
                name: inputDatas.name,
                email: inputDatas.email,
                phonenumber: inputDatas.phone,
                age: inputDatas.age,
                password: inputDatas.password,
                address: inputDatas.address,
                }
                console.log(myState.ChnageNumber.users,"-----Registration Payload--------")
                 axios.post(`${baseURL}` + "user/Create", registerPaylod,{
                    headers: {                        
                        "access-control-allow-origin": "*",
                        "Content-type": "application/json"
                    }
                 }).then((response) => {
                    console.log(response.data.message);
                    swal("success!", response.data.message, "success");

                }).catch(error => {
                    console.log(error.response.data.errors)
                    swal("Oops!", error.response.data.message, "error");

                });
            }
        }
    }
    const setDark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    };

    const setLight = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
    };

    const storedTheme = localStorage.getItem("theme");

    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const defaultDark =
        storedTheme === "dark" || (storedTheme === null && prefersDark);

    if (defaultDark) {
        setDark();
    }


    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDark();
        } else {
            setLight();
        }
    }
    return (
        <>
            {/* Theme */}
             <section className="vh-100"  >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="text-black"  >
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                        <input type="text" id="form3Example1c" className="form-control" name='name' value={inputDatas.name} onChange={HandleInputFields} />
                                                        <span className='error-red'>{error.name}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example3cemail">Your Email</label>
                                                        <input type="email" id="form3Example3emailc" className="form-control" name='email' value={inputDatas.email} onChange={HandleInputFields} />
                                                        <span className='error-red'>{error.email}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example3cphone">Your Phone</label>
                                                        <input type="text" id="form3Example3cphone" className="form-control" name='phone' value={inputDatas.phone} onChange={HandleInputFields} />
                                                        <span className='error-red'>{error.phone}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example3cage">Your Age</label>
                                                        <input type="number" id="form3Example3cage" className="form-control" name='age' value={inputDatas.age} onChange={HandleInputFields} />
                                                        <span className='error-red'>{error.age}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example3caddress">Your Address</label>
                                                        <textarea id="form3Example3caddress" className="form-control" name="address" rows="2" cols="30" value={inputDatas.address} onChange={HandleInputFields}></textarea>
                                                        <span className='error-red'>{error.address}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example4cpassword">Password</label>
                                                        <input type="password" id="form3Example4cpassword" className="form-control" name='password' value={inputDatas.password} onChange={HandleInputFields} />
                                                        <span className='error-red'>{error.password}</span>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example4cdconfirmPassword">Confirm your password</label>
                                                        <input type="password" id="form3Example4cdconfirmPassword" className="form-control" name='confirmPassword' value={inputDatas.confirmPassword} onChange={HandleInputFields} />
                                                        <span className='error-red'>{error.confirmPassword}</span>
                                                    </div>
                                                </div>

                                                <div className="d-flex mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg" onClick={HandleSubmitButton}>Register</button>
                                                </div>
                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="toggle-theme-wrapper flotone">
                    <span>☀️</span>
                    <label className="toggle-theme" htmlFor="checkbox">
                        <input
                            type="checkbox"
                            id="checkbox"
                            onChange={toggleTheme}
                            defaultChecked={defaultDark}
                        />
                        <div className="slider round"></div>
                    </label>
                    <span>🌒</span>
                </div>
            </section>


        </>
    )
}

export default Register