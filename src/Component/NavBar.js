import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [showtheme, settheme] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        settheme(storedTheme)
        document.documentElement.setAttribute("data-theme", storedTheme);

    }, [])
    function handlelogin() {
        navigate("/login")
    }
    function handlelogOut() {
        navigate("/login")
    }
    return (
        <>
            <nav class={`navbar navbar-expand-lg navbar-${showtheme} bg-${showtheme}`}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Home</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Dashbord</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Contact</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Blogs</a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <button class="btn btn-outline-success me-3" type="submit" onClick={handlelogin}>Login</button>
                            <button class="btn btn-outline-primary me-3" type="submit" onClick={handlelogOut}>Logout</button>

                        </form>

                    </div>

                </div>
            </nav>
        </>
    )
}

export default NavBar