import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Apis, { endpoints } from "../../../config/Apis";
import MySpinner from "../MySpinner";
import { Table, Button, Form, Accordion } from "react-bootstrap";
import { authApi } from "../../../config/Apis";

function BusManagement() {
    const [businfo, setBusInfo] = useState({
        "tripId": "",
        "tripName": "",
        "totalSeat": "",
        "price":"",
        "timeStart": "",
        "timeStop": "",
    });

    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setBusInfo(current => {
            return { ...current, [field]: evt.target.value }
        })
    }
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

    const addBusTrips = () => {
        const process = async () => {
            let {data} = await authApi().post(endpoints['bustrips'], {
                "tripId": businfo.tripId,
                "tripName": businfo.tripName,
                "totalSeat":businfo.totalSeat,
                "price": businfo.price,
                "timeStart":businfo.timeStart,
                "timeStop":businfo.timeStop,
            });

            setBusTrips([...bustrips, data]);
        }

        process();
    }

    if (bustrips === null || buses === null)
        return <MySpinner />;
    return (
        <>
            <h1>Quản lý chuyến và tuyến xe</h1>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><Button variant="success" onClick={addBusTrips}>Thêm chuyến</Button>{' '}</Accordion.Header>
                    <Accordion.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>STT</Form.Label>
                            <Form.Control as="textarea" value={businfo.tripId} onChange={(e) => change(e, "tripId")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Tên chuyến đi</Form.Label>
                            <Form.Control as="textarea" value={businfo.tripName} onChange={(e) => change(e, "tripName")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Số lượng ghế</Form.Label>
                            <Form.Control type="text" placeholder="" value={businfo.totalSeat} onChange={(e) => change(e, "totalSeat")} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Giá tiền</Form.Label>
                            <Form.Control type="text" placeholder="" value={businfo.price} onChange={(e) => change(e, "price")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Giờ chạy</Form.Label>
                         <Form.Control type="date" placeholder="" value={businfo.timeStart} onChange={(e) => change(e, "timeStart")} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Giá dự kiến kết thúc</Form.Label>
                        <Form.Control type="date" placeholder="" value={businfo.timeStop}onChange={(e) => change(e, "timeStop")}/>
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên chuyến</th>
                        <th>Số lượng ghế</th>
                        <th>Giá</th>
                        <th>Giờ chạy</th>
                        <th>Giờ dự kiến kết thúc</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bustrips.map(c => {
                        const dateStart = c.timeStart instanceof Date ? c.timeStart : new Date(c.timeStart);
                        const dateEnd = c.timeStart instanceof Date ? c.timeStart : new Date(c.timeStart);

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


                        return <tr>
                            <td>{c.tripId}</td>
                            <td>{c.tripName}</td>
                            <td>{c.licensePlateId.totalSeat}</td>
                            <td>{c.price} VNĐ</td>
                            <td>{formattedDateStart} {formattedTimeStart}</td>
                            <td>{formattedDateEnd} {formattedTimeEnd}</td>
                            <td>
                                <Button variant="info" >Chỉnh sửa</Button>
                                <Button variant="danger" >Xóa</Button>
                            </td>
                        </tr>
                    })}


                </tbody>
            </Table>
        </>
    )
}

export default BusManagement;