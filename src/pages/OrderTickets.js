import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./OrderTickets.css"
import Apis, { endpoints } from "../config/Apis";
import DropdownListStartPlace from "../components/Main/Client/DropdownListStartPlace";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import Calendar from "../components/Main/Client/Calendar";
import { Link } from 'react-router-dom';
// import "../components/Main/Banner.css";
import BookingForm from "../components/Main/Client/BookingForm";
import MySpinner from "../components/Main/MySpinner";
import Comment from "../components/Main/Client/Comment";




function OrderTickets() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBookButtonClick = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  const [buses, setBuses] = useState(null);
  const [bustrips, setBusTrips] = useState(null);
  const [q] = useSearchParams();

  useEffect(() => {
    const loadBuses = async () => {
      try {
        let e = endpoints["buses"];

        let licensePlateId = q.get("licensePlateId");
        if (licensePlateId !== null) {
          e = `${e}?licensePlateId=${licensePlateId}`;
          console.log("licensePlateId " + e);
        } else {
          let kw = q.get("kw");
          if (kw !== null) {
            e = `${e}?kw=${kw}`;
           
          } 
        }

        let res = await Apis.get(e);
        setBuses(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    const loadBusTrips = async () => {
      try {
        let e = endpoints["bustrips"];

        let tripId = q.get("tripId");
        if (tripId !== null) {
          e = `${e}?tripId=${tripId}`;
        } else {
          let kw = q.get("kw");
          if (kw !== null) {
            e = `${e}?kw=${kw}`;
          } 
        }

        let res = await Apis.get(e);
        // Set the bus trips data using setBusTrips function
        setBusTrips(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadBusTrips();
    loadBuses();
  }, [q]);

  if (buses === null || bustrips === null) return <MySpinner />;
  // // if (buses=== null)
  //     return <BusRegistration />

  // const getData = (data) => {
  //     console.log("Coming from Banner.js", data);
  // }



  return (
    <>

      <Col>

        {bustrips.map((p) => {
          const dateStart = p.timeStart instanceof Date ? p.timeStart : new Date(p.timeStart);
          const dateEnd = p.timeStart instanceof Date ? p.timeStart : new Date(p.timeStart);

          // Check if date is a valid Date object
          if (isNaN(dateStart.getTime()) && isNaN(dateEnd.getTime())) {
            // Handle the case where c.timeStart is not a valid date
            return null; // or handle it in some way
          }
        
          const formattedDateStart = dateStart.toLocaleDateString("vi-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });

          const formattedTimeStart = dateStart.toLocaleTimeString("vi-GB", {
              hour: "numeric",
              minute: "numeric",
            });

          const formattedDateEnd = dateEnd.toLocaleDateString("vi-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            });
          
            
            const formattedTimeEnd = dateEnd.toLocaleTimeString("vi-GB", {
              hour: "numeric",
              minute: "numeric",
            });

          let url = `/bustrips/${p.tripId}`;
          return (<div className="bus-list">
            <div className="bus-item">
              <div className="icon">
                <img src="/clock.png" />
              </div>
              <text className="label">{formattedDateStart} {formattedTimeStart}</text>
            </div>
            <div className="bus-item">
              <div className="icon">
                <img src="/bus.png" />
              </div>
              <div className="label">
                <div className="bus-line">{formattedDateEnd} {formattedTimeEnd}</div>
              </div>
            </div>

            <div className="bus-item">
              <div className="icon">
                <img src="/seats.png" />
              </div>

              <div className="label" >
                <div className="bus-line">
                  {p.licensePlateId.totalSeat} chỗ trống
                </div>
                <div className="bus-info">Xe {p.licensePlateId.busType}</div>
              </div>
            </div>

            <div className="bus-item">
              <div className="big-text">{p.price}.000</div>
            </div>
            <div className="bus-item">
              <button
                className="center-button"
                onClick={handleBookButtonClick}
              >
                Chọn chỗ
              </button>
            </div>
            <Link to={url} className="btn btn-info" style={{ marginRight: "5px" }} variant="primary">Xem chi tiết</Link>
          </div>
          );
        })}
        <div className="booking-form">{isFormVisible && <BookingForm />}</div>
      </Col>
    </>
  );
}

export default OrderTickets;