import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Delete } from "../containers/deletePage";
import { Form } from "../containers/form";
//import { useHistory } from "react-router-dom";

export const Detail = (props) => {
    //const history = useHistory();
    const id  = props.match.params.id;
    const uid  = props.match.params.uid;
    const [time, setTime] = useState([]);
    const [updateTime, setUpdateTime] = useState({
        Id:"",
        Year:"",
        Month:"",
        Day:"",
        StartTime:"",
        EndTime:""
    });

    console.log(id)
    console.log(uid)

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/timeSlot/${id}`)

            .then((response) => response.json())
            .then((data) => setTime(data));
    }, [id]);

    const handleFormChange = (e) => {
        setUpdateTime({
            ...updateTime,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = () => {
        fetch(`http://127.0.0.1:5000/api/availability/users/${uid}/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                // Id: updateTime.Id,
                Year: updateTime.Year,
                Month: updateTime.Month,
                Day: updateTime.Day,
                StartTime: updateTime.StartTime,
                EndTime: updateTime.EndTime,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
//            .then((response) => response.json())
            .then((message) => {
                props.history.push("/api/userAvail/"+props.match.params.uid);
            })

    };

    return (
        <div>
            <Form
                input={updateTime}
                onFormChange={handleFormChange}
                onFormSubmit={handleFormSubmit}
            />
            <br/>
            {time.map((data) => (
                <div key="id">Detail: {data.Year} -  {data.Month} -  {data.Day}  {data.StartTime} -  {data.EndTime}</div>
            ))}
            <br />
            <Delete id={id} uid={props.match.params.uid} props = {props}/><p>Fill the above to update</p>
            &nbsp;&nbsp;
            <Link to = {'/api/userAvail/'+props.match.params.uid }>Go Back to List</Link>
        </div>
    );
};