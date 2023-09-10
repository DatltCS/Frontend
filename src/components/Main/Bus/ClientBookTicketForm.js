import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import React from 'react';

function ClientBookTicketForm() {
    return (
        <Form>
            <h1>Nhập thông tin khách hàng</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Địa chỉ email</Form.Label>
                <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="number" placeholder="Số điện thoại" />
            </Form.Group>
            <Form.Select aria-label="Default select example">
                <option>Chọn số ghế</option>
                <option value="1">A01</option>
                <option value="2">A02</option>
                <option value="3">A03</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ marginTop: '10px' }}>
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Tổng tiền</Form.Label>
                <Form.Control type="number" placeholder="Tổng tiền" />
            </Form.Group>

            <Button variant="primary">Đặt vé</Button>{' '}
        </Form>
    );
}

export default ClientBookTicketForm;