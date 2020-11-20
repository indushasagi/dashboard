import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dashBoardlist from '../list/list';
import DashboardSearchArea from './DashboardSearchArea';

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
                <div className="nested-box" id={i.indicator} onClick={(event) => routeSearch(event)} title={i.text}>
                    <span className="fontIcon" style={{ color: i.color }}><FontAwesomeIcon icon={i.icon} className="fade fa-3x" /></span>
                    <span className="text">{i.text}</span>
                </div>
            </React.Fragment>
        )
    })
    return (
        <div>
            <p className="welcome">Hello, welcome !!!!!!</p>
            <div className="flex-container">
                <div className="flex-child">
                    {elements}
                </div>
                <div className="flex-child">
                    {enableSearchArea && <DashboardSearchArea indicator={indicator} />}
                </div>
            </div>
        </div>
    )
}

export default Dashoboard;