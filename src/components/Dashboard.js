import React, { useState, useCallback } from 'react';
import dashBoardlist from '../list/list';
import DashboardSearchArea from './DashboardSearchArea';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const Dashoboard = () => {
    const [enableSearchArea, setEnableSearchArea] = useState(false);
    const [indicator, setIndicator] = useState('');
    const routeSearch = useCallback((event) => {
        event.preventDefault();
        setEnableSearchArea(true);
        setIndicator(event.target.id);
    }, [setEnableSearchArea, setIndicator]);
    const elements = dashBoardlist.map((i) => {
        return (
            <React.Fragment key={i.index}>
                <Card border="info" style={{ width: '10rem', backgroundColor: i.bgColor, boxShadow: '5px 5px #888888' }}>
                    <Card.Body>
                        <i.icon className="ml-4" size={40} style={{ color: i.color, marginBottom: '5%' }} />
                        <Button variant="primary" id={i.indicator} onClick={(event) => routeSearch(event)} title={i.text}>{i.text}</Button>
                    </Card.Body>
                </Card>
                <br />
            </React.Fragment>
        )
    })
    return (
        <div style={{ marginTop: '1%' }}>
            <Container style={{ marginLeft: '1%' }}>
                <Row>
                    <Col md={{ span: 2 }}>
                        {elements}
                    </Col>
                    <Col md={{ span: 9, offset: 1 }}>
                        {enableSearchArea && <DashboardSearchArea indicator={indicator} />}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashoboard;