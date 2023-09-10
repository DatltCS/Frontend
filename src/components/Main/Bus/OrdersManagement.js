import React, { useEffect, useState } from 'react';
import "./OrdersManagement.css";
import Apis, { endpoints } from '../../../config/Apis';
import { useSearchParams } from 'react-router-dom';
import MySpinner from '../MySpinner';
import { Table } from 'react-bootstrap';


function OrdersManagement() {
    const [q] = useSearchParams();
    const [deliveries, setDeliveries] = useState(null);

    useEffect(() => {
        const loadDeliveries = async () => {
            try {
                let e = endpoints["deliveries"];

                let deliveryId = q.get("deliveryId");
                if (deliveryId !== null) {
                    e = `${e}?deliveryId=${deliveryId}`;
                    console.log("deliveryId " + e);
                } else {
                    e = `${e}`;
                    console.log("link" + e);
                }

                let res = await Apis.get(e);
                console.log('api', res);
                setDeliveries(res.data);
                console.log(res.data)
                console.log(deliveries)
            } catch (ex) {
                console.error(ex);
            }
        };

        loadDeliveries();
    }, [q]);

    if (deliveries === null)
        return <MySpinner />;

    return (
        <>
        <h3>DANH SÁCH ĐƠN HÀNG</h3>
        <Table striped bordered hover> 
               
            <thead>
                <tr>
                    <th>Tên món hàng</th>
                    <th>Họ tên người gửi</th>
                    <th>Số điện thoại người gửi</th>
                    <th>Email người gửi</th>
                    <th>Họ tên người nhận</th>
                    <th>Số điện thoại người nhận</th>
                    <th>Email người nhận</th>
                    <th>Thời gian gửi</th>
                    <th>Thời gian nhận</th>
                    <th>Hình thức thanh toán</th>
                </tr>
            </thead>
            <tbody>
                {deliveries.map((d) => (
                    <tr key={d.deliveryId}>
                        <td>{d.description}</td>
                        <td>{d.orderId.customerId.firstName} {d.orderId.customerId.lastName}</td>
                        <td>{d.orderId.customerId.phone}</td>
                        <td>{d.orderId.customerId.email}</td>
                        <td>{d.receiverName}</td>
                        <td>{d.receiverPhone}</td>
                        <td>{d.receiverEmail}</td>
                        <td>{d.sendTime}</td>
                        <td>{d.receiveTime}</td>
                        <td>{d.paymentMethod}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    );
}

export default OrdersManagement;
