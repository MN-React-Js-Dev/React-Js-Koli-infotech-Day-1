import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux';
import { loginForm } from './actions';

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegx = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
const baseURL = "https://c76b-203-109-79-214.in.ngrok.io/api/"
var passwordregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        document.documentElement.setAttribute("data-theme", storedTheme);

    }, [])
    const myState = useSelector((state) => state)
    
    const dispatch = useDispatch()


    const [submit, setsubmit] = useState(false)

    const [inputDatas, setinputDatas] = useState({

        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, seterror] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const HandleInputFields = (e) => {
        const { name, value } = e.target
        setinputDatas({ ...inputDatas, [name]: value })
        switch (name) {

            case "email":
                if (!value) {
                    error.email = value.length > 0 ? "" : "Enter your email"
                }
                else {
                    error.email = emailRegx.test(value) === false && "Enter your valid email"
                }
                break;
            case 'password':
                const isUpperCase = value === value.toUpperCase()
                const isLowercase = value === value.toLowerCase()
                if (!value) {
                    error.password = "Please enter your Password";
                }
                else if (isUpperCase) {
                    error.password = (value.length === true ? "" : "Password Must contains at least one upper case, lower case, digit, special character and no white space")
                }
                else if (isLowercase) {
                    error.password = ""
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

        if (!inputDatas.email) {
            error.email = "Enter your email"
        }

        if (!inputDatas.password) {
            error.password = "Enter your password"
        }
        if (!inputDatas.confirmPassword) {
            error.confirmPassword = "Enter your confirm password"
        }

        return error
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && Object.keys(inputDatas).length !== 0) {
            console.log(error, "error")
        }
    }, [])

    const HandleLoginButton = (e) => {
        e.preventDefault()
        setsubmit(true)
        seterror(validate(inputDatas));
        if (inputDatas.email !== "" && inputDatas.password !== "" && inputDatas.confirmPassword !== "") {
            if (inputDatas.password === inputDatas.confirmPassword) {
                var LoginPaylod = {
                    email: inputDatas.email,
                    password: inputDatas.password,
                }
                console.log(myState.ChnageNumber.users, "LoginPaylod")
                dispatch(loginForm(LoginPaylod))
                axios.post(`${baseURL}` + "user/Login", myState.ChnageNumber.users).then((response) => {
                    localStorage.setItem('token', response.data.data.token)
                    swal("success!", response.data.message, "success");
                    setTimeout(() => navigate("/dashbord"), 500);

                }).catch(e => {
                    if (e.response.status === 422) {
                        console.log(e.response.data.errors.password)
                        swal("Oops!", e.response.data.errors.password, "error");
                        console.log(e.response.status)
                    }
                    if (e.response.status === 401) {
                        console.log(e)
                        swal("Oops!", e.response.data.message, "error");
                        console.log(e.response.status)
                    }
                    swal("Oops!", error.response.data.message, "error");
                });
            }
        }
    }
    return (
        <>
            <>
                <section className="vh-100"  >
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="text-black"  >
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                                                <form className="mx-1 mx-md-4">

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="form3Example3c">Your Email</label>
                                                            <input type="email" id="form3Example3c" className="form-control" name='email' value={inputDatas.email} onChange={HandleInputFields} />
                                                            <span className='error-red'>{error.email}</span>
                                                        </div>
                                                    </div>


                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="form3Example4c">Password</label>
                                                            <input type="password" id="form3Example4c" className="form-control" name='password' value={inputDatas.password} onChange={HandleInputFields} />
                                                            <span className='error-red'>{error.password}</span>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="form3Example4cd">Confirm your password</label>
                                                            <input type="password" id="form3Example4cd" className="form-control" name='confirmPassword' value={inputDatas.confirmPassword} onChange={HandleInputFields} />
                                                            <span className='error-red'>{error.confirmPassword}</span>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex mx-4 mb-3 mb-lg-4">
                                                        <button type="submit" className="btn btn-primary btn-lg" onClick={HandleLoginButton}>Login</button>
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
                </section>
            </>
        </>
    )
}

export default Login