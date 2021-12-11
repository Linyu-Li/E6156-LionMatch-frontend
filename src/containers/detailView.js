import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Delete} from "./deletePage";
import TimeForm from "./form";
import {SCHEDULER_URL} from "../constants";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";


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
    const [disableEdit, setDisableEdit] = useState(true);

    // console.log(id)
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
        <Grid>
            <Row>
                <Col xs={12} md={10} lg={6}>
                    {!disableEdit && (
                        <>
                            <TimeForm
                                input={updateTime}
                                onFormChange={handleFormChange}
                                onFormSubmit={handleFormSubmit}
                            />
                            <p>Fill the above to update</p>
                            <br/>
                        </>
                    )}
                    {time.map((data) => (
                        <div key="id">Current Detail: {data.Month}/{data.Day}/{data.Year} {data.StartTime} - {data.EndTime}</div>
                    ))}
                    <br/>
                    {!disableEdit && (
                        <div style={{'margin': 10}}>
                            <Delete id={id} uid={props.match.params.uid} props={props}/>
                            <br/>
                        </div>
                    )}
                    <Link to={'/userAvail/' + props.match.params.uid}>Go Back to List</Link>
                </Col>
            </Row>
        </Grid>
    );
};