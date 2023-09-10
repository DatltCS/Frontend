import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../../../config/Apis";
import { NavDropdown, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import MySpinner from "../MySpinner";
import BusOrderTicket from "./BusOrderTicket";

function TicketManagement() {
    const [bustrips, setBusTrips] = useState(null);

    const loadBusTrips = async () => {
        try {
            const res = await Apis.get(endpoints['bustrips']);
            setBusTrips(res.data);
        } catch (error) {
            console.error("Error loading bus trips:", error);
        }
    };

    const [isMenuClicked, setIsMenuClicked] = useState(false);

    // Function to handle button click
    const handleMenuClick = () => {
        setIsMenuClicked(true);
        // You can perform other actions here when the button is clicked.
    };

    useEffect(() => {
        loadBusTrips();
    }, []);

    if (bustrips === null)
        return <MySpinner />;

    


    return (
        <>
            <h1>Quản lý vé</h1>
            <Row>
                <DropdownButton id="dropdown-basic-button" title="Chọn chuyến đi cần đặt">
                {bustrips.map((c) => {
                        const h = `/?tripId=${c.tripId}`;
                        return (
                            <Dropdown.Item className="dropdown-item"  to={h} key={c.tripId} onClick={handleMenuClick}>
                                {c.tripName}
                            </Dropdown.Item>
                        );
                    })}
                </DropdownButton>

            </Row>  
            {isMenuClicked === true ? <BusOrderTicket/> : null}

        </>
    );
}

export default TicketManagement;
