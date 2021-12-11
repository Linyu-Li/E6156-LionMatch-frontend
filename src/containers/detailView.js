import React, {useState, useEffect} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {Delete} from "../containers/deletePage";
import {Form} from "../containers/form";
//import { useHistory } from "react-router-dom";
import {SCHEDULER_URL} from "../constants";


export const Detail = (props) => {
    //const history = useHistory();
    const id = props.match.params.id;
    const uid = props.match.params.uid;
    const [time, setTime] = useState([]);
    const [updateTime, setUpdateTime] = useState({
        Id: "",
        Year: "",
        Month: "",
        Day: "",
        StartTime: "",
        EndTime: ""
    });

    // console.log(id)
    // console.log(uid)

    useEffect(() => {
        fetch(SCHEDULER_URL + `/timeSlot/${id}`)

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
        if (!updateTime.StartTime || !updateTime.EndTime) {
            window.alert('Please select a start hour and an end hour!')
            return;
        }
        if (updateTime.StartTime > updateTime.EndTime) {
            window.alert('The end hour cannot be earlier than the start hour!')
            return;
        }
        fetch(SCHEDULER_URL + `/availability/users/${uid}/${id}`, {
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
                props.history.push("/userAvail/" + props.match.params.uid);
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
                <div key="id">Current Detail: {data.Month}/{data.Day}/{data.Year} {data.StartTime} - {data.EndTime}</div>
            ))}
            <br/>
            <Delete id={id} uid={props.match.params.uid} props={props}/><p>Fill the above to update</p>
            &nbsp;&nbsp;
            <Link to={'/userAvail/' + props.match.params.uid}>Go Back to List</Link>
        </div>
    );
};