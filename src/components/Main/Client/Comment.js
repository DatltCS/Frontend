import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{ backgroundColor: 'yellow' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

function Example() {
    return (
        <div style={{ width: '900px', margin: '0 auto' }}>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <CustomToggle eventKey="0">Đánh giá nhà xe</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Form.Control as="textarea" rows={3} />
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>

    );
}

export default Example;
