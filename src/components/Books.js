import React, { useState, useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const Books = () => {
    const [searchInput, setSearchInput] = useState('');
    const { getBooks, books } = useContext(AppContext);

    const handleChange = useCallback((event) => {
        setSearchInput(event.target.value);
    }, [setSearchInput]);

    const displayBooks =
        books.map((data, i) => {
            return (
                <div className="resp" key={i}>
                    <span className="cartIcon" title="Add to Cart"><FontAwesomeIcon icon={faShoppingBasket} className="fade fa-2x" /></span>
                    <figure>
                        <img alt={data.best_book.image_url._text} src={data.best_book.small_image_url._text} />
                    </figure>
                    <p><b>ID:</b> {data.best_book.id._text} </p>
                    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}><b>Title: </b>{data.best_book.title._text}</p>
                    <p><b>Author: </b>{data.best_book.author.name._text}</p>
                </div >
            )
        });

    return (
        <>
            <form onSubmit={(event) => getBooks(event, searchInput)}>
                <input className="searchInput" type="text" onChange={handleChange} placeholder=" Search for a book by author or title" />
            </form>
            <div className="bookRes">
                {displayBooks}
            </div>
        </>
    )
}

export default Books;

