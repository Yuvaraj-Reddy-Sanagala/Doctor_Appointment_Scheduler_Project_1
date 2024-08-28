import React, {useState,useEffect} from 'react';
import '../../App.css';
import { Button } from 'semantic-ui-react'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';





// Rendering the Dashboard component 
const Confirmation = () => {

    const data={
      fname:"",
      lname:"",
      phnum:""
    }

    const [errors,setErrors]=useState({});
    const [issubmit,setIsSubmit]=useState(false);

    const [inputs,setInputs]=useState(data);
    const [msg,setMsg]=useState(false);

    const [info,setInfo]=useState([]);


    const fetchresponse=async(val)=>{
      console.log(val)
      const response= await axios.post('http://localhost:5000/getAppointments', {
        details: val
      })
      setInfo(response.data);
      setMsg(true)
      console.log(response.data);
    }


    useEffect(() => {
      const val= Object.values(inputs)
      if (Object.keys(errors).length === 0 && issubmit) {
        fetchresponse(val);
      }
    },[errors,inputs,issubmit]);

    const handleChange = (e) =>{
      setInputs({...inputs,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      setErrors(validate(inputs));
    }


    const validate= (values) => {
      const errors= {};
      const regex={
        name:/^[a-zA-Z\s]*$/,
        age:/^[1-9]?[0-9]{1}$|^100$/,
        email:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      }
      if(true)
      {
        if(!values.fname){
          errors.fname='Enter First Name'
        } else if(!regex.name.test(values.fname)){
          errors.fname='Enter only Alphabets'
        }

        if(!values.lname){
          errors.lname='Enter last Name'
        } else if(!regex.name.test(values.lname)){
          errors.lname='Enter only Alphabets'
        }

        if(!values.phnum){
          errors.phnum='Enter phone number'
        } else if(values.phnum.length !== 10){
          errors.phnum='Enter a Valid Number'
        }

      }
        
      setIsSubmit(true)
      console.log(errors);

      return errors
    }

    return (

        <div className="user">      
        <header className='App' >
            <p><b>Confirmation</b></p>
        </header>
        <div className='confirmation-box'>
          <div className='confirmation'>
              <h3>Enter below details to verify the schedules</h3>
              <div className='group'>
                  <div className='field'>
                      <label>First Name</label>
                      <input
                      name="fname"
                      value={inputs.fname}
                      type="text"
                      placeholder='Enter First Name'
                      onChange={handleChange}
                      />
                      <p className='error'>{errors.fname}</p>
                  </div>
                  <div className='field'>
                      <label>last Name</label>
                      <input
                      name="lname"
                      value={inputs.lname}
                      type="text"
                      placeholder='Enter Last Name'
                      onChange={handleChange}
                      />
                      <p className='error'>{errors.lname}</p>
                  </div>
                  <div className='field'>
                      <label>Phone Number</label>
                      <input
                      name="phnum"
                      value={inputs.phnum}
                      type="tel"
                      placeholder='Enter Phone number'
                      onChange={handleChange}
                      />
                      <p className='error'>{errors.phnum}</p>
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
                  <th className='th-value'>App Date</th>
                  <th className='th-value'>App Time</th>
                  <th className='th-value'>Hospital</th>
                  <th className='th-value'>Specialist</th>
                  <th className='th-value'>Doctor </th>
              </thead>
              <tbody className='tbody1'>
                  {
                        info.map((val,i)=> 
                          <tr>
                            <td className='td-value'><b>{val.App_ID}</b></td>
                            <td className='td-value'>{val.Full_Name}</td>
                            <td className='td-value'>{val.Gender}</td>
                            <td className='td-value'>{val.Age}</td>
                            <td className='td-value'>{val.Consultation}</td>
                            <td className='td-value'>{val.App_Date}</td>
                            <td className='td-value'>{val.App_Time}</td>
                            <td className='td-value'>{val.Hosp_Name}</td>
                            <td className='td-value'>{val.Spe_Type}</td>
                            <td className='td-value'>{val.Doc_Name}</td>
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
          <p className='p-value'>Please Enter Valid details</p>
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
    
    export default Confirmation;