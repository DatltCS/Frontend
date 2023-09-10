
import{ useContext, useEffect, useState } from "react";
import React from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import { MyUserContext } from "../../../App";
import Apis, { authApi, endpoints } from "../../../config/Apis";
import MySpinner from "../MySpinner";
const BusTripsDetails = () => {
    const [user, ] = useContext(MyUserContext);
    const {tripId} = useParams();
    const [bus, setBus] = useState(null);
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState();

    useEffect(() => {
        const loadBusTrips = async () => {
            let {data} = await Apis.get(endpoints['details'](tripId));
            setBus(data); 
        }

        const loadComments = async () => {
            let {data} = await Apis.get(endpoints['comments'](tripId));
            setComments(data);
        }

        loadBusTrips();
        loadComments();
    }, []);

    const addComment = () => {
        const process = async () => {
            let {data} = await authApi().post(endpoints['add-comment'], {
                "comment": content, 
                "tripId": bus.tripId
            });

            setComments([...comments, data]);
        }

        process();
    }
    
    if (bus === null || comments === null) 
        return <MySpinner /> ;

    let url = `/sign-in?next=/bustrips/${tripId}`;
    return <>
        <h1 className="text-center text-info mt-2">CHI TIẾT CHUYẾN XE({tripId})</h1>
        <Row>
            <Col md={5} xs={6}>
                <Image src={bus.licensePlateId.image} rounded fluid />
            </Col>
            <Col md={5} xs={6}>
                <h2 className="text-danger">Chuyến {bus.tripName}</h2>
                <p>{bus.licensePlateId.busName}</p>
                <h3>{bus.price} VNĐ</h3>
            </Col>
        </Row>
        <hr />
        

        {user===null?<p>Vui lòng <Link to={url} style={{color:'blue'}}>đăng nhập</Link> để bình luận! </p>:<>
        <Form.Control as="textarea" aria-label="With textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung bình luận" />
        <Button onClick={addComment} className="mt-2" variant="info">Bình luận</Button>
        </>}
        <hr />
        <ListGroup>
            {comments.map(c => <ListGroup.Item id={c.reviewId}>
                {c.userId.username}- {c.comment} - <Moment locale="vi" fromNow>{c.createdDate}</Moment>
                    </ListGroup.Item>)
            }
        </ListGroup>
    </>
}

export default BusTripsDetails;