import React, {useState, useEffect} from 'react';
import '../../App.css';
import { Button } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';




// Rendering the Dashboard component 
const Doctor = () => {


    const data={
      Doc_ID:"",
      date:""
    }


    const [errors,setErrors]=useState({});
    const [issubmit,setIsSubmit]=useState(false);
    const [inputs,setInputs]=useState(data);
    const [info,setInfo]=useState([]);
    const [msg,setMsg]=useState(false);

    const fetchresponse=async(val)=>{
      console.log(val)
      const response= await axios.post('http://localhost:5000/getpatients', {
        ID: val
      })
      setInfo(response.data)
      setMsg(true)
    }

    

    useEffect(() => {
      const val= Object.values(inputs)
      if (Object.keys(errors).length === 0 && issubmit) {
        fetchresponse(val);
      }
    },[errors,inputs,issubmit]);

    const handleChange = async(e) => {
      console.log(e);
      const name=e.target.name;
      const value=e.target.value;
        setInputs({...inputs,[name]:value});
        console.log(inputs)
    }

    const handleSubmit=(e)=> {
      e.preventDefault();
      setErrors(validate(inputs));
    }

    const validate= (values) => {
      const errors= {};
      const regex={
        doc:/^[1-9]\d*(00)$/
      }
      if(true)
      {
        
        if(!values.Doc_ID){
          errors.Doc_ID='Enter Doctor ID'
        } else if(!regex.doc.test(values.Doc_ID)){
          errors.Doc_ID='Enter valid Doc_ID'
        }

        if(!values.date){
          errors.date='Pick a Date'
        }
      }
        
      setIsSubmit(true)
      console.log(errors);

      return errors
    }



    return (

        <div className="user">
      
        <header className='App' >
            <p><b>Doctor</b></p>
        </header>
        <div className='confirmation-box'>
          <div className='confirmation'>
            <div className='group'>
              <div className='field'>
                    <label>Doctor ID</label>
                    <input
                    name="Doc_ID"
                    value={inputs.Doc_ID}
                    type="number"
                    placeholder='Enter Doctor ID'
                    onChange={handleChange}
                    />
                    <p className='error'>{errors.Doc_ID}</p>
              </div>
              <div className='field'>
                  <label>Date</label>
                  <input
                    name='date'
                    type='date'
                    className='date'
                    onChange={handleChange}
                  />
                  <p className='error'>{errors.date}</p>
                </div>
            </div>
              <Button className='details_button1' type="submit" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
        {
            info.length > 0 &&
          
          <div  className='verification'>
            <table className='table1'>
              <thead className='thead1'>
                  <th className='th-value'>Appointment ID</th>
                  <th className='th-value'>Full Name</th>
                  <th className='th-value'>Gender</th>
                  <th className='th-value'>Age</th>
                  <th className='th-value'>Consultation</th>
                  <th className='th-value'>Appointment Time</th>
              </thead>
              <tbody className='tbody1'>
                  {
                        info.map((val,i)=> 
                          <tr>
                            <td className='td-value'><b>{val.App_ID}</b></td>
                            <td className='td-value'>{val.Full_Name}</td>
                            <td className='td-value'>{val.Gender}</td>
                            <td className='td-value'>{val.Age}</td>
                            <td className='td-value'>{val.Consulting}</td>
                            <td className='td-value'>{val.App_Time}</td>
                          </tr>
                        )
                   }
              </tbody>
            </table>
          </div>

       } 
       {
        info.length === 0 && msg &&
        <div className='verification'>
          <p className='p-value'>No appointments on this date</p>
        </div>
       }  
          
        {/* Input form for GitHub url and toast message */}
          <div className='App'>
            
            
          </div>
    
          {/* Rendering the two Ag-Grids */}
          <div className='left-rigt-ag-grid'>
                
          </div>
    
          {/* Rendering the Tabs */}
         
          
        </div>
        
      );
    }
    
    export default Doctor;
