import React from "react";
import {Link} from "react-router-dom"

export const Card = ({ listOfTime, uid }) => {
    return (
        <>
            {listOfTime.map(time => {
                return (

                    <ul key={time.Id}>

                        <li><Link to={uid+'/'+time.Id}>{time.Year} - {time.Month} - {time.Day} {time.StartTime} - {time.EndTime}</Link></li>
                    </ul>
                );
            })}
        </>
    );
};