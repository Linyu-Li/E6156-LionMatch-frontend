import React from "react"


export const Form = ({input, onFormChange, onFormSubmit}) => {

    const handleChange = (event)=>{
        // handle what the form does when you type in it
        //onFormChange(event.target.value)
        onFormChange(event)
    }

    const handleSubmit = (event)=>{
        // handle what the form does when it is submitted
        event.preventDefault()
        onFormSubmit()
    }

    return(
        // <>
        //     <form onSubmit={handleSubmit}>
        //         <div><input className='form-class' type='text' required value={input} onChange={handleChange}></input></div>
   //              <input type='submit'></input>
        //     </form>
        // </>
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Id </label>
                    <input className='form-class' name="Id" type='text' required value={input.Id} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Year</label>
                    <input className='form-class' name="Year" type='text' required value={input.Year} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Month</label>
                    <input className='form-class' name="Month" type='text' required value={input.Month} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Day</label>
                    <input className='form-class' name="Day" type='text' required value={input.Day} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Start Time</label>
                    <input className='form-class' name="StartTime" type='text' required value={input.StartTime} onChange={handleChange}></input>
                </div>
                <div>
                    <label>EndTime</label>
                    <input className='form-class' name="EndTime" type='text' required value={input.EndTime} onChange={handleChange}></input>
                </div>
                <input type='submit'></input>
            </form>
        </>
    )
}