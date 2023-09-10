import React, { useState, useEffect } from "react";
import "./BookingForm.css";
import Seat from "../../../context/Seat";
import { useSearchParams } from "react-router-dom";
import Apis, { endpoints } from "../../../config/Apis";
import MySpinner from "../MySpinner";
import axios from "axios";
import cookie from "react-cookies";

function BookingForm(props) {
  const [firstFloorSeats, setFirstFloorSeats] = useState([]);
  const [secondFloorSeats, setSecondFloorSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState("");
  const [price, setSelectedPrice] = useState("");
  //const [isChoosing, isSeatClicked] = useState(false);
  const [q] = useSearchParams();
  const [bustrips, setBusTrips] = useState(null);
  const [selectedSeatList, setSelectedSeatList] = useState([]);
  const [sltSeatTmp, setSltSeatTmp] = useState([]);
  const getInitialState = () => {
    const value = "Tiền mặt";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    // Initialize the first and second floor seats arrays with Seat objects
    const firstFloorInitialSeats = [];
    const secondFloorInitialSeats = [];
    const columnCounts = [6, 5, 6]; // Define the number of seats in each column

    let seatId = 1;
    //isSeatClicked(false);
    for (let col = 0; col < 3; col++) {
      for (let row = 0; row < columnCounts[col]; row++) {
        const newSeatA = new Seat(seatId, `A${seatId}`, false, false);
        // Generate seat objects for each column on the first floor
        firstFloorInitialSeats.push(newSeatA);

        // Generate seat objects for each column on the second floor (all labeled as B)
        const newSeatB = new Seat(seatId, `B${seatId}`, false, false);
        secondFloorInitialSeats.push(newSeatB);

        seatId++;
      }
    }

    const loadBusTrips = async () => {
      try {
        let e = endpoints["bustrips"];

        let tripId = q.get("tripId");
        if (tripId !== null) e = `${e}?tripId=${tripId}`;
        else {
          let kw = q.get("kw");
          if (kw !== null) e = `${e}?kw=${kw}`;
        }

        let res = await Apis.get(e);
        // Set the bus trips data using setBusTrips function
        setBusTrips(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadBusTrips();

    setFirstFloorSeats(firstFloorInitialSeats);
    setSecondFloorSeats(secondFloorInitialSeats);
    loadBusTrips();

    setSltSeatTmp([]);
    setSelectedPrice(0);
  }, []);

  const orderTicket = async (evt) => {
    console.log(cookie.load("token"))
    evt.preventDefault();
    let e = endpoints["add-ticket"];
    try {
      for (let index = 0; index < sltSeatTmp.length; index++) {
        let form = new FormData();
        //form.append("ticketId", index + 2);
        form.append("numSeat", "a03");
        form.append("price", 290000);
        form.append("status", "0");
        form.append("paymentMethod", "tienmat");
        form.append("createDate", 1693929600000);
        //form.append("tripId", 2);
        //form.append("orderId", 2);
        console.log(form);
        let res = await Apis.post(e, form);
        if (res.status === 201) {
          alert("post success");
        }
      }
    } catch (e) {
      alert("post failed with " + e.toString());
    }
  };

  const handleSeatClick = (seat) => {
    // Create a copy of sltSeatTmp
    const updatedSltSeatTmp = [...sltSeatTmp];

    if (seat.isChoosing === false) {
      seat.isChoosing = true;
    } else {
      seat.isChoosing = false;
    }

    addSelectedSeatToList(seat.floor, updatedSltSeatTmp);
  };

  const addSelectedSeatToList = (seatId, updatedSltSeatTmp) => {
    function arrayRemove(arr, value) {
      return arr.filter(function (seatId) {
        return seatId !== value;
      });
    }

    if (updatedSltSeatTmp.includes(seatId)) {
      setSltSeatTmp(arrayRemove(updatedSltSeatTmp, seatId));
      setSelectedPrice(price - 290000);
    } else {
      updatedSltSeatTmp.push(seatId);
      console.log(updatedSltSeatTmp);
      setSltSeatTmp(updatedSltSeatTmp);
      setSelectedPrice(updatedSltSeatTmp.length * 290000);
      console.log(sltSeatTmp);
      console.log(price);
    }
  };

  var seatWithSpan = sltSeatTmp.map((item, index) => (
    <span key={index}>{item} </span>
  ));

  if (bustrips === null) return <MySpinner />;

  return (
    <>
      <div id="bookingForm">
        <div id="seatSelection">
          <label className="tang1">Tầng 1</label>
          <label className="tang2">Tầng 2</label>
          <div className="ticket-form">
            <div className="column">
              {firstFloorSeats.slice(0, 6).map((seat) => (
                <div
                  key={seat.seatId}
                  className={`seat ${seat.isBooked ? "booked" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <img
                    src={
                      seat.isChoosing ? seat.seatImageChoosing : seat.seatImage
                    }
                    alt={`Seat ${seat.seatId}`}
                  />
                  <span>{seat.floor}</span>
                </div>
              ))}
            </div>
            <div className="column">
              {firstFloorSeats.slice(6, 11).map((seat) => (
                <div
                  key={seat.seatId}
                  className={`seat ${seat.isBooked ? "booked" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <img
                    src={
                      seat.isChoosing ? seat.seatImageChoosing : seat.seatImage
                    }
                    alt={`Seat ${seat.seatId}`}
                  />
                  <span>{seat.floor}</span>
                </div>
              ))}
            </div>
            <div className="column">
              {firstFloorSeats.slice(11, 17).map((seat) => (
                <div
                  key={seat.seatId}
                  className={`seat ${seat.isBooked ? "booked" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <img
                    src={
                      seat.isChoosing ? seat.seatImageChoosing : seat.seatImage
                    }
                    alt={`Seat ${seat.seatId}`}
                  />
                  <span>{seat.floor}</span>
                </div>
              ))}
            </div>
            <div className="column">
              {secondFloorSeats.slice(0, 6).map((seat) => (
                <div
                  key={seat.seatId}
                  className={`seat ${seat.isBooked ? "booked" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <img
                    src={
                      seat.isChoosing ? seat.seatImageChoosing : seat.seatImage
                    }
                    alt={`Seat ${seat.seatId}`}
                  />
                  <span>{seat.floor}</span>
                </div>
              ))}
            </div>
            <div className="column">
              {secondFloorSeats.slice(6, 11).map((seat) => (
                <div
                  key={seat.seatId}
                  className={`seat ${seat.isBooked ? "booked" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <img
                    src={
                      seat.isChoosing ? seat.seatImageChoosing : seat.seatImage
                    }
                    alt={`Seat ${seat.seatId}`}
                  />
                  <span>{seat.floor}</span>
                </div>
              ))}
            </div>
            <div className="column">
              {secondFloorSeats.slice(11, 17).map((seat) => (
                <div
                  key={seat.seatId}
                  className={`seat ${seat.isBooked ? "booked" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <img
                    src={
                      seat.isChoosing ? seat.seatImageChoosing : seat.seatImage
                    }
                    alt={`Seat ${seat.seatId}`}
                  />
                  <span>{seat.floor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="seat-status">
            <div className="picked-seat">
              <img src="/sold-seat.png" alt="Sold Seat" />
              <label>Ghế đã bán</label>
            </div>
            <div className="picking-seat">
              <img src="/picking-seat.png" alt="Picking Seat" />
              <label>Ghế đang chọn</label>
            </div>
          </div>
        </div>
        <div id="customerInfo">
          <div className="seat-information">
            <label className="ghe-chon">
              Ghế đã chọn: <div>{seatWithSpan}</div>{" "}
            </label>

            <label className="tong-tien">
              Tổng tiền: {Intl.NumberFormat().format(price)}
            </label>
          </div>
          <form id="infoForm" onSubmit={orderTicket}>
            <label htmlFor="name">Họ tên:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="phone">Số điện thoại:</label>
            <input type="tel" id="phone" name="phone" required />
            <label>Phương thức thanh toán:</label>
            <select value={value} onChange={handleChange}>
              <option value="Orange">Tiền mặt</option>
              <option value="Radish">Chuyển khoản</option>
            </select>
            <button type="submit" className="continue-button">
              Đặt vé
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookingForm;
