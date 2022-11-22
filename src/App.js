import './App.css';
import Register from './Component/Register';
import Login from './Component/Login';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Dashbord from './Component/Dashbord';

function App() {
  let myObj = {
    name: "Sufiyan",
    age: 21,
  };
   let myMap = new Map(Object.entries(myObj));
   let myKeyArr = [...myMap.keys()] // spreads all the keys of Map in the Array `myKeyArr`.
  console.log(myKeyArr);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashbord" element={<Dashbord />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;


