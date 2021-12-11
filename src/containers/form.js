import React from "react"

const TimeForm = ({input, onFormChange, onFormSubmit}) => {

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
        <>
            <form onSubmit={handleSubmit}>
                <div style={{'padding': 10}}>
                    <label>Year</label>
                    <br/>
                    <input className='form-class' name="Year" type='text' required value={input.Year} onChange={handleChange}/>
                </div>
                <div style={{'padding': 10}}>
                    <label>Month</label>
                    <br/>
                    <input className='form-class' name="Month" type='text' required value={input.Month} onChange={handleChange}/>
                </div>
                <div style={{'padding': 10}}>
                    <label>Day</label>
                    <br/>
                    <input className='form-class' name="Day" type='text' required value={input.Day} onChange={handleChange}/>
                </div>
                <div style={{'padding': 10}}>
                    <label>Start Time</label>
                    <br/>
                    <select name="StartTime" value={input.StartTime} onChange={handleChange}>
                        <option value=""/>
                        <option value="00:00">00:00</option>
                        <option value="01:00">01:00</option>
                        <option value="02:00">02:00</option>
                        <option value="03:00">03:00</option>
                        <option value="04:00">04:00</option>
                        <option value="05:00">05:00</option>
                        <option value="06:00">06:00</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                        <option value="23:00">23:00</option>
                    </select>
                </div>
                <div style={{'padding': 10}}>
                    <label>End Time</label>
                    <br/>
                    <select name="EndTime" value={input.EndTime} onChange={handleChange}>
                        <option value=""/>
                        <option value="00:00">00:00</option>
                        <option value="01:00">01:00</option>
                        <option value="02:00">02:00</option>
                        <option value="03:00">03:00</option>
                        <option value="04:00">04:00</option>
                        <option value="05:00">05:00</option>
                        <option value="06:00">06:00</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                        <option value="23:00">23:00</option>
                    </select>
                </div>
                <input type='submit' style={{'margin': 10}}/>
            </form>
        </>
    )
}

export default TimeForm;