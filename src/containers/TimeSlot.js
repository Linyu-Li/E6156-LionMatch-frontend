import React, {useState, useEffect} from "react";
import {Card} from "./cards";
import {Form} from "./form";
import {SCHEDULER_URL} from "../constants";

export const TimePage = (props) => {
    const uid = props.match.params.uid;
    const [time, setTime] = useState([]);
    const [addTime, setAddTime] = useState({
        Id: "",
        Year: "",
        Month: "",
        Day: "",
        StartTime: "",
        EndTime: ""
    });
    const [disableEdit, setDisableEdit] = useState(true);
    // console.log(uid)

    useEffect(() => {
        // Read currently logged in user
        let curUsrId = null;
        const user_str = localStorage.getItem('user');
        if (user_str) {
            try {
                const user = JSON.parse(user_str);
                curUsrId = user.userID;
            } catch (e) {}
        }
        setDisableEdit(curUsrId === null || curUsrId.toString() !== uid);
        // Fetch the list of times API
        fetch(SCHEDULER_URL + `/availability/users/${uid}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setTime(data));
    }, [uid]);

    const handleFormChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setAddTime({
            ...addTime,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = () => {
        if (!addTime.StartTime || !addTime.EndTime) {
            window.alert('Please select a start hour and an end hour!')
            return;
        }
        if (addTime.StartTime > addTime.EndTime) {
            window.alert('The end hour cannot be earlier than the start hour!')
            return;
        }
        // Creates time suing the API
        fetch(SCHEDULER_URL + `/availability/users/${uid}`, {
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
            .then((response) => {
                setAddTime({
                    Id: "",
                    Year: "",
                    Month: "",
                    Day: "",
                    StartTime: "",
                    EndTime: ""
                });
                // getUpdate();
                window.location.reload();
            })
        // .catch((err) => (console.log(err)));
    };

    // const getUpdate = () => {
    //     // Automatically update the list as you submit the form
    //     fetch(SCHEDULER_URL + `/api/availability/users/${uid}`)
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //         })
    //         .then((data) => setTime(data));
    // };

    return (
        <>
            {!disableEdit && (
                <Form
                    input={addTime}
                    onFormChange={handleFormChange}
                    onFormSubmit={handleFormSubmit}
                />
            )}
            <Card listOfTime={time} uid={props.match.params.uid}/>
        </>
    );
};