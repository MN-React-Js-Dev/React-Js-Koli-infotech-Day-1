import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { decNumber, incNumber } from './actions';
import NavBar from './NavBar';

const baseURL = "https://jsonplaceholder.typicode.com/comments"

const Dashbord = () => {
 const [showdata, setdata] = useState([])
     useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
         document.documentElement.setAttribute("data-theme", storedTheme);
        var token = localStorage.getItem("token");

        axios.get(baseURL, {
            headers: {
                // 'Authorization': `${token}`,
                "access-control-allow-origin": "*",
                "Content-type": "application/json"
            }
        }).then((res) => {
            console.log(res )
            setdata(res.data)
        }).catch((error) => {
            console.error(error)
        })


    }, [])

    const columns = [
        {
            name: 'SrNo',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Posts',
            selector: 'body',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        
    ];

    const myState = useSelector((state) => state.ChnageNumber)
    const dispatch = useDispatch();
    
        console.log(myState)
  
    return (
        <>
            <NavBar />
            <div>
                <h1>{myState.number}</h1>
                <button className='btn btn-success    me-3' onClick={() => dispatch(incNumber())}>+</button>
                <button className='btn btn-success  me-3  ' onClick={() => dispatch(decNumber())}>-</button>
            </div>
            <DataTable
                title="Fake Users  Data"
                columns={columns}
                data={showdata}
                pagination
                highlightOnHover
            />
           
            
        </>
    )
}

export default Dashbord