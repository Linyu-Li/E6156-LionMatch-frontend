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
                {/*<div>*/}
                {/*    <label> Id </label>*/}
                {/*    <input className='form-class' name="Id" type='text' required value={input.Id} onChange={handleChange}></input>*/}
                {/*</div>*/}
                <div>
                    <label>Year</label>
                    <input className='form-class' name="Year" type='text' required value={input.Year} onChange={handleChange}/>
                </div>
                <div>
                    <label>Month</label>
                    <input className='form-class' name="Month" type='text' required value={input.Month} onChange={handleChange}/>
                </div>
                <div>
                    <label>Day</label>
                    <input className='form-class' name="Day" type='text' required value={input.Day} onChange={handleChange}/>
                </div>
                {/*<div>*/}
                {/*    <label>Start Time</label>*/}
                {/*    <input className='form-class' name="StartTime" type='text' required value={input.StartTime} onChange={handleChange}></input>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <label>EndTime</label>*/}
                {/*    <input className='form-class' name="EndTime" type='text' required value={input.EndTime} onChange={handleChange}></input>*/}
                {/*</div>*/}
                <div>
                    <label>Start Time</label>
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
                <div>
                    <label>End Time</label>
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
                <input type='submit'/>
            </form>
        </>
    )
}