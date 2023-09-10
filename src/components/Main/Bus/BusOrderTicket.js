import React, { useState, useEffect} from "react";
import { Card, Row, Col, Button } from 'react-bootstrap';
import Apis, { endpoints } from "../../../config/Apis";
import MySpinner from "../MySpinner";
import { useSearchParams, Link } from "react-router-dom";

function BusOrderTicket() {

    const [bustrips, setBusTrips] = useState(null);
    
    const [buses, setBuses] = useState(null);
    const [q] = useSearchParams();

    useEffect(() => {
        const loadBuses = async () => {
            try {
                let e = endpoints['buses'];

                let licensePlateId = q.get("licensePlateId");
                if (licensePlateId !== null)
                    e = `${e}?licensePlateId=${licensePlateId}`;
                
                let res = await Apis.get(e);
                setBuses(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }
        const loadBusTrips = async () => {
            try {

                let e = endpoints['bustrips'];

                let tripId = q.get("tripId");
                if (tripId !== null)
                    e = `${e}?tripId=${tripId}`;
                
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

    if (bustrips === null || buses === null)
        return <MySpinner />;
    return (
        <>
            <h1>Đặt vé cho khách hàng</h1>
            <Row>

                {bustrips.map(p => {
                    const h = `/?tripId=${p.tripId}`;
                    return (<Col xs={12} md={3} className="mt-2 mb-2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body to={h} key={p.tripId}>
                                <Card.Title>Chuyến {p.tripName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Giờ chạy: {p.timeStart}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Giờ dự kiến kết thúc: {p.timeStop}</Card.Subtitle>
                                <Card.Text>Số ghế: {p.licensePlateId.totalSeat} </Card.Text>
                                <Card.Text>Giá: {p.price}.000 </Card.Text>
                                <Link to="/book-ticket-client"><Button variant="primary">Đặt vé</Button></Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    );

                })}

            </Row>
        </>
    )
}

export default BusOrderTicket;