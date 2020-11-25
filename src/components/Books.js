import React, { useState, useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { CardColumns, Row, Col, Form, Card } from 'react-bootstrap';

const Books = () => {
    const [searchInput, setSearchInput] = useState('');
    const { getBooks, books } = useContext(AppContext);

    const handleChange = useCallback((event) => {
        setSearchInput(event.target.value);
    }, [setSearchInput]);

    const displayBooks =
        books.map((data, i) => {
            return (
                <Card key={i}>
                    <Card.Body>
                        <Card.Img src={data.best_book.small_image_url._text} style={{ width: '20%', alignItems: 'center', marginBottom: '2%' }} />
                        <Card.Text><b>ID: </b>{data.best_book.id._text}</Card.Text>
                        <Card.Text><b>Title: </b>{data.best_book.title._text}</Card.Text>
                        <Card.Text><b>Author: </b>{data.best_book.author.name._text}</Card.Text>
                    </Card.Body>
                </Card>
            )
        });

    return (
        <>
            <Form onSubmit={(event) => getBooks(event, searchInput)}>
                <Row>
                    <Col md={10} xs="auto">
                        <Form.Control onChange={handleChange} placeholder=" Search for a book by author or title" />
                    </Col>
                </Row>
            </Form>
            {/* <form onSubmit={(event) => getBooks(event, searchInput)}>
                <input className="searchInput" type="text" onChange={handleChange} placeholder=" Search for a book by author or title" />
            </form> */}

            <CardColumns style={{ marginTop: '1%' }}>
                {displayBooks}
            </CardColumns>
        </>
    )
}

export default Books;

