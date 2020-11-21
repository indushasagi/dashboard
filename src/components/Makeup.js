import React, { useState, useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';

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
                <div className="flex-container" key={i}>
                    <div>
                        <figure>
                            <img alt={data.image_link} src={data.image_link} />
                        </figure>
                    </div>
                    <div className="description">
                        <p><b>{data.name}</b></p>
                        <div><b>Rating:</b> {data.rating >= 1 ? data.rating : "1"}/5
                            <div className="addCart">
                                <p><input type="button" className="btn makeup-cart" value="Add to Cart" onClick={(event) => addToCart(event, data)} /></p>
                            </div>
                        </div>
                        <p style={{ 'color': '#ef4d97' }}><b>${data.price}</b></p>
                        <p><b>Description: </b> <br /> {data.description}</p>
                        {data.features ? <p><b>Features: </b><br />{data.features}</p> : ""}
                    </div>
                </div >
            )
        });
    return (
        <>
            <div className="makeup">
                <form>
                    <input name="brand" value={brand} className="searchInput" type="text" onChange={handleChange} placeholder="Enter a brand. eg: revlon, maybelline" />
                    <input name="productType" value={productType} className="searchInput" type="text" onChange={handleChange} placeholder="Enter a product. eg: eyeliner, mascara" />
                    <input type="button" className="btn-makup" value="Search" onClick={(event) => getMakeupList(event, brand, productType)} />
                </form>
                {displayMakupList}
            </div>
        </>
    )
}

export default Makeup;

