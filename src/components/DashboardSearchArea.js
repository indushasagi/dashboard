import React from 'react';
import Books from './Books';
import Makeup from './Makeup';

const DashboardSearchArea = ({ indicator }) => {
    return (
        <>
            {indicator === 'Books' && <Books />}
            {indicator === 'Makeup' && <Makeup />}
        </>
    )
}

export default DashboardSearchArea;