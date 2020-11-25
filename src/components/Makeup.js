import React, { useState, useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

const Makeup = () => {
    const [brand, setBrand] = useState('');
    const [productType, setProductType] = useState('');
    const { getMakeupList, makeupList, addToCart } = useContext(AppContext);

    const handleChange = useCallback((event) => {
        if (event.target.name === 'brand') {
            setBrand(event.target.value);
        } else {
            setProductType(event.target.value)
        }
    }, [setBrand, setProductType]);

    const displayMakupList =
        makeupList.map((data, i) => {
            return (
                <Card style={{ marginBottom: '10px' }} key={i}>
                    <Card.Body>
                        <Card.Text><b>{data.name}</b> <Button style={{ float: 'right' }} variant="info" onClick={(event) => addToCart(event, data)}>Add to Cart</Button></Card.Text>
                        <Card.Img src={data.image_link} style={{ width: '20%', alignItems: 'center' }} />
                        <Card.Text><b>Rating: </b>{data.rating >= 1 ? data.rating : "1"}/5 </Card.Text>
                        <Card.Text style={{ 'color': '#ef4d97' }}>${data.price} </Card.Text>
                        <Card.Text><b>Description: </b> <br /> {data.description} </Card.Text>
                        {data.features ? <Card.Text><b>Features: </b><br />{data.features}</Card.Text> : ""}
                    </Card.Body>
                </Card>
            )
        });
    return (
        <>
            <Form>
                <Row>
                    <Col md={5} xs="auto">
                        <Form.Control name="brand" value={brand} onChange={handleChange} placeholder="Enter a brand. eg: revlon, maybelline" />
                    </Col>
                    <Col md={5} xs="auto">
                        <Form.Control name="productType" value={productType} onChange={handleChange} placeholder="Enter a product. eg: eyeliner, mascara" />
                    </Col>
                    <Col md={2} xs="auto">
                        <Button type="submit" className="mb-2" onClick={(event) => getMakeupList(event, brand, productType)}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
            {displayMakupList}
        </>
    )
}

export default Makeup;

