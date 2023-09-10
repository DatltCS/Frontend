import './App.css';
import React, { createContext, useReducer, useState } from "react";
import { BrowserRouter as Router, BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Header/Navbar";
import Banner from "../src/components/Main/Client/Banner";
import BusRegistration from "../src/pages/BusRegistration";
import SignIn from "../src/pages/SignIn";
import OrderTickets from "../src/pages/OrderTickets";
import cookie from "react-cookies";
import MyUserReducer from "../src/config/MyUserReducer";
import Register from './pages/Register';
import SideBar from '../src/components/Main/Bus/Sidebar';
import SidebarContent from '../src/components/Main/Bus/SidebarContent';
import BusTripsDetails from '../src/components/Main/Bus/BusTripsDetails';
import ChatWindow from '../src/components/Main/Chat/ChatWindow';




export const MyUserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  return (

    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>

        <Navbar />

        <Routes>
          {user !== null && user.userRole === 'ROLE_BUSCOMPANY' ? <Route path="*" element={<div className="App wrapper">
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <SidebarContent toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
          </div>} /> : <Route path="/" element={<Banner />} />}
          <Route path="/home" element={<Banner />} />
          <Route path="/bus-registration" element={<BusRegistration />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bustrips/:tripId" element={<BusTripsDetails />} />
          <Route path="/bustrips" element={<OrderTickets />} />
          <Route path="/chat-window" element={<ChatWindow />} />
        </Routes>

      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;
