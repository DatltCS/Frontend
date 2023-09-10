import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';

function Cards() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <div style={{ margin: '10px 20px', display: 'flex', flexDirection: 'row' }}>
                    <Card style={{ width: '18rem', margin: '0 10px' }}>
                        <Card.Img variant="top" src="/kg-tphcm.jpg" />
                        <Card.Body>
                            <Card.Title>Kiên Giang - TPHCM</Card.Title>
                            <Card.Text>
                                Từ 210.000đ
                            </Card.Text>
                            <Button variant="primary">Xem chi tiết</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', margin: '0 10px' }}>
                        <Card.Img variant="top" src="/ct-tphcm.jpg" />
                        <Card.Body>
                            <Card.Title>Cần Thơ - TPHCM</Card.Title>
                            <Card.Text>
                                Từ 180.000đ
                            </Card.Text>
                            <Button variant="primary">Xem chi tiết</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', margin: '0 10px' }}>
                        <Card.Img variant="top" src="/camau-tphcm.jpg" />
                        <Card.Body>
                            <Card.Title>Cà Mau - TPHCM</Card.Title>
                            <Card.Text>
                                Từ 250.000đ
                            </Card.Text>
                            <Button variant="primary">Xem chi tiết</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </>
    );
}

export default Cards;