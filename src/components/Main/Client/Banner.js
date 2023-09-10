import React, { useState, useRef, useEffect } from "react";
import "./Banner.css";
import Calendar from "./Calendar";
import { Link } from "react-router-dom";
import Cards from "./Card";
import OrderTickets from "../../../pages/OrderTickets";
import { useNavigate } from "react-router-dom";


const Banner = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const nav = useNavigate();
  const [kw1, setKw1] = useState("");
  const [kw2, setKw2] = useState("");


  
  const search = async (evt) =>  {
    evt.preventDefault();
    console.log(kw1+ ' 1 - ' +kw2);
    // Construct the URL with selectedStartPlace and selectedDestination
     if(kw1 !== ''){
      console.log(2 + `/?kw=${kw1}`)
      nav(`/?kw=${kw1}`);
    }else if(kw2 !== ''){
      console.log(2 + `/?kw=${kw2}`)
      nav(`/?kw=${kw2}`);
    }else{
      console.log(2 + `/?kw=${''}`)
      nav(`/?kw=${''}`);}
      
  };
 

 

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <>
      <section className="Main">
        <div className="overlay-banner"></div>
        <div
          className="backgroundImage"
          style={{ backgroundImage: "url('/background.jpg')" }}
        ></div>
        <div className="mainContent container">
          <div className="cardDiv grid">
            <span className="textDiv">Tìm kiếm chuyến đi</span>
          </div>
          <div className="banner">
            <form action="#" onSubmit={search}>
              <div className="form-row">
                <div className="custom-dropdown-container" >
                  <div className="custom-dropdown">
                    <label className="start-place">Nơi xuất phát</label>
                    <div className="input-place">
                      <input
                        type="text"
                        value={kw1}
                        onChange={(event) => setKw1(event.target.value)}
                        placeholder="Start Place"
                        name="kw"
                        style={{ border: "none" }}
                      />
                    </div>
                    
                  </div>
                </div>
                <div className="custom-dropdown-container" >
                  <div className="custom-dropdown">
                    <label className="start-place">Destination</label>
                    <div className="input-place">
                      <input
                        type="text"
                        value={kw2}
                        onChange={(event) => setKw2(event.target.value)}
                        placeholder="Destination"
                        name="kw"
                        style={{ border: "none" }}
                      />
                    </div>
                    
                  </div>
                </div>
                <Calendar />
                 <button className="btn-search" onClick={handleButtonClick} type="submit">
              Tìm chuyến
            </button>
              </div>
            </form>
           
          </div>
        </div>
      </section>
      {isButtonClicked === true ? <OrderTickets/> : <Cards />}
    </>
  );
};

export default Banner;

