import React, { useState, useEffect } from "react";
import { Card } from "../containers/cards";
import { Form } from "../containers/form";
import {Link} from "react-router-dom";
import { Image, List } from 'semantic-ui-react'

export const AvailPage = (props) => {
    const uid  = props.match.params.uid;
    const limit  = props.match.params.limit;
    const offset  = props.match.params.offset;
    const next = parseInt(offset)+5;
    const prev = parseInt(offset)-5;
    const [time, setTime] = useState([]);
    const [addTime, setAddTime] = useState({
        Id:"",
        Year:"",
        Month:"",
        Day:"",
        StartTime:"",
        EndTime:""
    });
    console.log(limit)


    useEffect(() => {
        // Fetch the list of times
        fetch(`http://127.0.0.1:5000/api/matchAvail?uid=${uid}&limit=${limit}&offset=${offset}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setTime(data));
    }, [offset]);

    const handleFormChange = (e) => {
        setAddTime({
            ...addTime,
            [e.target.name]: e.target.value,
        });
    };


    const dayMap = {1:"January", 2:"February", 3:"March",4:"April",5:"May", 6:"June", 7:"July", 8:"August",
        9:"September", 10:"October", 11:"November", 12:"December"}

    return (
        <>
            {/*<Card listOfTime={time} uid ={props.match.params.uid}/>*/}
            <h2>Available TIme Slots for Your Match</h2>
            {time.map(time => {
                return (

                    <ul key={time.Id}>
                        <li><Link to={uid+'/'+time.Id}>{time.Year} {dayMap[time.Month]} {time.Day}, {time.StartTime} - {time.EndTime}</Link></li>
                    </ul>

                );
            })}
            <div>{offset>0? <Link to = {'/api/matchAvail/'+props.match.params.uid +'/'+ props.match.params.limit +'/'+ prev}>Prev</Link>: null }</div>
            <div><Link to = {'/api/matchAvail/'+props.match.params.uid + '/'+ props.match.params.limit +'/'+ next }>Next</Link></div>

        </>

    );
};