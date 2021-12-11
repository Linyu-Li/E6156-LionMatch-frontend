import React from "react";
import {Link} from "react-router-dom"

export const Card = ({ listOfTime, uid }) => {
    // console.log(listOfTime);
    return (
        <>
            {listOfTime.map(time => {
                return (

                    <ul key={time.Id}>

                        <li><Link to={uid+'/'+time.Id}>{time.Month + '/' + time.Day + '/' + time.Year + `  ${time.StartTime} - ${time.EndTime}`}</Link></li>
                    </ul>
                );
            })}
        </>
    );
};