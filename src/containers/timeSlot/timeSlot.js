import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import {connect} from "react-redux";

class timeSlot extends Component{

    state = {
        isLoaded: false,
        data:[{}]
    };

    handleDelete = (id) => {
        if(id!=null) {
            fetch("/timeSlot/" + id, {method: 'DELETE'});
        }
    }

    render(){

        fetch("/timeSlot").then(
            res => res.json()
        ).then(
            data => {
                this.setState({isLoaded:true});
                this.setState({data:data});
                console.log(data)
            }
        )

    // useEffect(()=>{
    //     fetch("/timeSlot").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             this.setData({isLoaded:true});
    //             this.setData({data:data});
    //             console.log(data)
    //         }
    //     )
    // },[])

    let timeslotMessage = null;
    timeslotMessage = (<ul>
        {this.state.data.map(time => (
            <li key={time.Id}>
                {time.Year} - {time.Month} - {time.Day} {time.StartTime} - {time.EndTime}
            </li>
        ))}
    </ul>);

    // timeslotMessage=(<div>
    //     <h1 className="text">hello</h1>
    //     </div>
    // );

        // <Button primary bsStyle="danger" bsSize="large" onClick={this.handleDelete()}>Delete</Button>
    return  (<div className="background">
        {timeslotMessage}
        <Button primary bsStyle="danger" bsSize="large" onClick={this.handleDelete("5")}>Delete</Button>
         </div>);

    }

}

const mapStateToProps = state => {
    return {
        isLoaded: false
    }
}

export default connect(mapStateToProps)(timeSlot);

// function TimeSlot(){
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [data, setData] = useState([{}])
//
//     useEffect(()=>{
//         fetch("/timeSlot").then(
//             res => res.json()
//         ).then(
//             data => {
//                 setIsLoaded(true);
//                 setData(data)
//                 console.log(data)
//             }
//         )
//     },[])
//     if (!isLoaded) {
//         return <div>Loading...</div>;
//     } else {
//         return (
//             <ul>
//                 {data.map(time => (
//                     <li key={time.Id}>
//                         {time.Year} - {time.Month} - {time.Day}  {time.StartTime} - {time.EndTime}
//                     </li>
//                 ))}
//             </ul>
//         );
//     }
//
//
// }
//
// export default TimeSlot