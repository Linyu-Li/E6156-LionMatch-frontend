import React from "react";
import {Link} from "react-router-dom"

export const Card = ({ listOfTime }) => {
    return (
        <>
            {listOfTime.map(time => {
                return (

                    <ul key={time.Id}>

                        <li><Link to={`${time.Id}`}>{time.Year} - {time.Month} - {time.Day} {time.StartTime} - {time.EndTime}</Link></li>
                    </ul>
                );
            })}
        </>
    );
};