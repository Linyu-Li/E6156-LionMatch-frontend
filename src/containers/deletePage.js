import React from "react"
//import {useHistory} from 'react-router-dom'

export const Delete = ({id, props}) =>{
//    const history = useHistory()
    const deleteTime = () =>{
        fetch(`http://127.0.0.1:5000/timeSlot/${id}`,{
            method: 'DELETE',
            body:JSON.stringify({
                id:id
            })
        })
            // .then(response => response.json())
             .then(data => {
                 props.history.push('/')
             })

    }

    return(
        <>
            <button onClick={deleteTime}>Delete</button>
        </>
    )
}