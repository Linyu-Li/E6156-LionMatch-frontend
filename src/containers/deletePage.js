import React from "react"
//import {useHistory} from 'react-router-dom'

export const Delete = ({id,uid, props}) =>{
//    const history = useHistory()
    const deleteTime = () =>{
        fetch(`http://127.0.0.1:5000/api/availability/users/${uid}/${id}`,{
            method: 'DELETE',
            body:JSON.stringify({
                uid:uid,
                id:id
            })
        })
            // .then(response => response.json())
             .then(data => {
                 props.history.push("/api/userAvail/"+props.match.params.uid)
             })

    }

    return(
        <>
            <button onClick={deleteTime}>Delete</button>
        </>
    )
}