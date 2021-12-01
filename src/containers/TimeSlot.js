import React, { useState, useEffect } from "react";
import { Card } from "../containers/cards";
import { Form } from "../containers/form";

export const TimePage = (props) => {
    const uid  = props.match.params.uid;
    const [time, setTime] = useState([]);
    const [addTime, setAddTime] = useState({
        Id:"",
        Year:"",
        Month:"",
        Day:"",
        StartTime:"",
        EndTime:""
    });
    console.log(uid)

    useEffect(() => {
        // Fetch the list of times API
        fetch(`http://127.0.0.1:5000/api/availability/users/${uid}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setTime(data));
    }, [uid]);

    const handleFormChange = (e) => {
        setAddTime({
            ...addTime,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = () => {
        // Creates time suing the API
        fetch(`http://127.0.0.1:5000/api/availability/users/${uid}`, {
            method: "POST",
            body: JSON.stringify({
                // Id: addTime.Id,
                Year: addTime.Year,
                Month: addTime.Month,
                Day: addTime.Day,
                StartTime: addTime.StartTime,
                EndTime: addTime.EndTime,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            //.then((response) => response.json())
            .then((message) => {
                console.log(message);
                setAddTime({
                    Id:"",
                    Year:"",
                    Month:"",
                    Day:"",
                    StartTime:"",
                    EndTime:""
                });
                getUpdate();
            });
    };

    const getUpdate = () => {
        // Automatically update the list as you submit the form
        fetch(`http://127.0.0.1:5000/api/availability/users/${uid}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setTime(data));
    };

    return (
        <>
            <Form
                input={addTime}
                onFormChange={handleFormChange}
                onFormSubmit={handleFormSubmit}
            />
            <Card listOfTime={time} uid ={props.match.params.uid}/>
        </>
    );
};