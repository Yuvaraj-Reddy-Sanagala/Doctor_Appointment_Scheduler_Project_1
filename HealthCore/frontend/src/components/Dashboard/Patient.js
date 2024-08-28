import React, { useState, useEffect,useCallback} from 'react';
import '../../App.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Select  from 'react-select';
import { Button  } from 'semantic-ui-react'


// Rendering the Dashboard component 
const Patient = () => {

  const data={
    fname: "",
    lname: "",
    gender:"",
    age:"",
    phnum:"",
    email:"",
    state:"",
    city:"",
    street:"",
    zip:"",
    consulting:"",
    date:"",
  }



  const menu = [  
    { value: '09:00:00', label: '9:00 AM' },  
    { value: '09:30:00', label: '9:30 AM' },  
    { value: '10:00:00', label: '10:00 AM'},  
    { value: '10:30:00', label: '10:30 AM'},  
    { value: '11:00:00', label: '11:00 AM'},  
    { value: '11:30:00', label: '11:30 AM'},  
    { value: '12:00:00', label: '12:00 PM'},  
    { value: '12:30:00', label: '12:30 PM'},  
    { value: '13:00:00', label: '1:00 PM' },  
    { value: '13:30:00', label: '1:30 PM' },  
    { value: '14:00:00', label: '2:00 PM' },  
    { value: '14:30:00', label: '2:30 PM' },  
    { value: '15:00:00', label: '3:00 PM' },  
    { value: '15:30:00', label: '3:30 PM' },  
    { value: '16:00:00', label: '4:00 PM' },  
    { value: '16:30:00', label: '4:30 PM' },  
    { value: '17:00:00', label: '5:00 PM' }];



  
  
  const [details,setDetails]=useState(data);

  const [Options1,setOptions1]=useState('');
  const [selectedSpe,setselectedSpe]= useState('');
  const [specvalue,setspecvalue]=useState('');

  const [Options2,setOptions2]=useState('');
  const [selectedHos,setselectedHos]= useState('');
  const [hosvalue,sethosvalue]=useState('');

  const [Options3,setOptions3]=useState('');
  const [selectedDoc,setselectedDoc]= useState('');
  const [docvalue,setdocvalue]=useState('');


  const [Options4,setOptions4]=useState('');
  const [selectedtime,setselectedTime]=useState('');

  const [errors,setErrors]=useState({});
  const [issubmit,setIsSubmit]=useState(false)


  const [minDate,setMInDate]=useState(toDayDate());

  const [dadis,setDadis]=useState(true);
  const [tidis,setTidis]=useState(true);
  const [check,setCheck]=useState(true);

  const [btnstatus,setBtnStatus]=useState(true)
  const [specInp,setSpecInp]=useState(true)
  const [hosInp,setHosInp]=useState(true)
  const [docInp,setDocInp]=useState(true)
  const [timInp,setTimInp]=useState(true)


  const [info,setInfo]=useState([]);



  function toDayDate() {
    debugger
    const d=new Date();
    const year=d.getFullYear();
    const month=d.getMonth()+1;
    const date=d.getDate()+1;
    let today
    if(month<10 && date<10){
      today=year+'-'+0+month+'-'+0+date
    }
    else if((month<10 && date>9)){
      today=year+'-'+0+month+'-'+date
    }
    else{
      today=year+'-'+month+'-'+date
    }
    return today;
  }


    const fetchresponse= useCallback(async(val)=>{
      console.log(val)
      const response= await axios.post('http://localhost:5000/personal', {
        details: val
      })
      window.alert('Submitted details')
      setInfo(response.data)
      setCheck(false)
      console.log(tidis)
    },[tidis])


    useEffect(() => {
      console.log(Object.values(details))
      const val= Object.values(details)
      val.push(selectedtime,selectedSpe,selectedHos,selectedDoc)
      if (Object.keys(errors).length === 0 && issubmit) {
        fetchresponse(val);
      }
    },[errors,selectedtime,selectedSpe,selectedHos,selectedDoc,issubmit,details,fetchresponse]);


    const handleChange = async(e) => {
      console.log(e);
      const name=e.target.name;
      const value=e.target.value;
        setDetails({...details,[name]:value});
        console.log(details)
    }

    const handleChangeCon = async(e) => {
      console.log(e);
      const name=e.target.name;
      const value=e.target.value;
      console.log(name);
      setDetails({...details,[name]:value});
      const response=await axios.post("http://localhost:5000/getSpecialists",{Cons:value})
      setspecvalue(response.data.spe)
      setOptions1(response.data.spe.map((ele,i)=>({value:ele.Spe_ID, label:ele.Spe_Type})))
      setSpecInp(false)

    }



    const handleChangeSpe = async(event) => {
      const spe = event.value;
        setselectedSpe(spe)
        const response=await axios.post("http://localhost:5000/getHospitals",{Cons:details.consulting,Spe:spe})
        console.log(specvalue)
        sethosvalue(response.data.hos);
        setOptions2(response.data.hos.map((ele,i)=>({value:ele.Hosp_ID, label:ele.Hosp_Name})))
        setHosInp(false)
    }

    const handleChangeHos = async(event) => {
      let hos = event.value;
        setselectedHos(hos);
        const response=await axios.post("http://localhost:5000/getDoctors",{Cons:details.consulting,Spe:selectedSpe,Hos:hos})
        console.log(hosvalue)
        setdocvalue(response.data.doc);
        setOptions3(response.data.doc.map((ele,i)=>({value:ele.Doc_ID, label:ele.Doc_Name})))
        setDocInp(false)
    }

    const handleChangeDoc = (event) => {
      let doc = event.value;
        console.log(docvalue)
        setselectedDoc(doc);
        setDadis(false)
    }

    const handleChangeDate = async(e) => {
      console.log(e);
      console.log(setMInDate);
      const name=e.target.name;
      const value=e.target.value;
      console.log(value);
      setDetails({...details,[name]:value});
      setTidis(false)
      const response=await axios.post("http://localhost:5000/getavailabletime",{App_date:value,Doc:selectedDoc})
      console.log(response.data)
      const apptime=response.data.map((ele,i)=>ele.time);
      console.log(apptime)

      function checkTime(val){
        for(let i=0; i<apptime.length; i++){
          if(val === apptime[i]){
            return false;
          }
        }
        return true;
      }

      setOptions4(menu.filter(ele=>checkTime(ele.value)))
      setTimInp(false)

    }

    const handleChangeTim = (event) => {
      let tim=event.value;
      setselectedTime(tim);
      setBtnStatus(false)
    }


    const handleSubmit=(e)=> {
      e.preventDefault();
      setErrors(validate(details,selectedtime,selectedSpe,selectedHos,selectedDoc));
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

        if(!values.age){
          errors.age='Enter Age'
        }else if(!regex.age.test(values.age)){
          errors.age='Enter number between[0-100]'
        }

        if(!values.gender){
          errors.gender='Select a gender'
        }

        if(!values.phnum){
          errors.phnum='Enter phone number'
        } else if(values.phnum.length !== 10){
          errors.phnum='Enter a Valid Number'
        }

        if(!values.email){
          errors.email='Enter Email ID'
        } else if(!regex.email.test(values.email)){
          errors.email='Enter a Valid email'
        }

        if(!values.state){
          errors.state='Enter State'
        } else if(!regex.name.test(values.state)){
          errors.state='Enter only Alphabets'
        } else if(values.state.length < 4){
          errors.state='Enter greater than 4 charcters'
        }

        if(!values.city){
          errors.city='Enter City'
        } else if(!regex.name.test(values.city)){
          errors.city='Enter only Alphabets'
        } else if(values.city.length < 4){
          errors.city='Enter greater than 4 charcters'
        }

        if(!values.street){
          errors.street='Enter Address'
        }

        if(!values.zip){
          errors.zip='Enter a Zip'
        } else if(values.zip.length !== 5){
          errors.zip='Enter a Valid Zip'
        } 

        if(!values.consulting){
          errors.consulting='Select a Mode'
        }

        if(!selectedSpe){
          errors.selectedSpe='Select a Specialist'
        }

        if(!selectedHos){
          errors.selectedHos='Select a Hospital'
        }

        if(!selectedDoc){
          errors.selectedDoc='Select a Doctor'
        }

        if(!values.date){
          errors.date='Select a Date'
        }
        if(!selectedtime){
          errors.time='Select a time slot'
        }

      }
        
      setIsSubmit(true)
      console.log(errors);

      return errors
    }


    return (

        <div className='user'>
      
        <header className='App' >
            <p><b>Patient</b></p>
        </header>
        { check &&
          <div className='form'>
            <form className="form-box">
              <h2>Personal Details</h2>
              <div className="group">
                <div className="field">
                  <label>First Name</label><br/>
                  <input
                  name='fname'
                  type='text'
                  value={details.fname}
                  placeholder='Enter First Name'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.fname}</p>
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input
                  name='lname'
                  type='text'
                  value={details.lname}
                  placeholder='Enter last Name'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.lname}</p>
                </div>
                <div className="field">
                  <label>Age</label>
                  <input
                  name='age'
                  type='number'
                  value={details.age}
                  placeholder='Age'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.age}</p>
                </div>
                <div className='field'>
                  <label>Gender</label>
                  <div className='group' onChange={handleChange}>
                    <input
                    name='gender'
                    type='radio'
                    value="Male"
                    checked={details.gender === 'Male'}
                    style={{margin:'5px'}}
                    className='gender'
                    />
                    <label>Male</label>
                    <input
                    name='gender'
                    type='radio'
                    value="Female"
                    checked={details.gender === 'Female'}
                    style={{margin:'5px'}}
                    />
                    <label>Female</label>
                    <input
                    name='gender'
                    type='radio'
                    value="Other"
                    checked={details.gender === 'Other'}
                    style={{margin:'5px'}}
                    />
                    <label>Other</label>
                  </div>
                  <p className='error'>{errors.gender}</p>
                </div>
              </div>
              <div className="group">
                <div className="field">
                  <label>Phone Number</label>
                  <input
                  name='phnum'
                  type='number'
                  value={details.phnum}
                  placeholder='Enter Phone Number'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.phnum}</p>
                </div>
                <div className='field'>
                  <label>Email</label>
                  <input
                  name='email'
                  type='email'
                  value={details.email}
                  placeholder='Enter Email ID'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.email}</p>
                </div>
              </div>
              <div className="group">
                <div className='field'>
                  <label>State</label>
                  <input
                  name='state'
                  type='text'
                  value={details.state}
                  placeholder='Enter State'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.state}</p>
                </div>
                <div className='field'>
                  <label>City</label>
                  <input
                  name='city'
                  type='text'
                  value={details.city}
                  placeholder='Enter City'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.city}</p>
                </div>
                <div className='field'>
                  <label>Address</label>
                  <input
                  name='street'
                  type='text'
                  value={details.street}
                  placeholder='Enter Street, Apt no'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.street}</p>
                </div>
                <div className='field'>
                  <label>Zip-Code</label>
                  <input
                  name='zip'
                  type='number'
                  value={details.zip}
                  placeholder='Zip-Code'
                  onChange={handleChange}
                  />
                  <p className='error'>{errors.zip}</p>
                </div>
              </div>
              <div className='group' onChange={handleChangeCon}>
                <label style={{margin:'0px 15px 0px 0px'}}>Mode of Consulting</label>
                <input
                name='consulting'
                type='radio'
                value="Online"
                style={{margin:'5px'}}
                />
                <label>Online</label>
                <input
                name='consulting'
                type='radio'
                value='Offline'
                style={{margin:'5px'}}
                />
                <label>Offline</label>
              </div>
              <p className='error'>{errors.consulting}</p>
              <div className='group'>
                <div className='field'>
                  <label>Specilatlist</label>
                    <Select
                      fluid
                      options={Options1}
                      name='specialist'
                      placeholder='Select Specialist'
                      className='dropdown'
                      onChange={handleChangeSpe}
                      isDisabled={specInp}
                    />
                    <p className='error'>{errors.selectedSpe}</p>
                </div>
                <div className='field'>
                  <label>Hospital</label>
                    <Select
                    fluid
                    options={Options2}
                    name='hospital'
                    placeholder='Select Hospital'
                    className='dropdown'
                    onChange={handleChangeHos}
                    isDisabled={hosInp}
                    />
                    <p className='error'>{errors.selectedHos}</p>
                </div>
                <div className='field'>
                  <label>Doctor</label>
                    <Select
                    fluid
                    options={Options3}
                    name='doctor'
                    placeholder='Select Doctor'
                    className='dropdown'
                    onChange={handleChangeDoc}
                    isDisabled={docInp}
                    />
                    <p className='error'>{errors.selectedDoc}</p>
                </div>
              </div>  
              <div className='group'>
                <div className='field'>
                  <label>Date</label>
                  <input
                    name='date'
                    type='date'
                    className='date'
                    onChange={handleChangeDate}
                    min={minDate}
                    disabled={dadis}
                  />
                  <p className='error'>{errors.date}</p>
                </div>
                <div className='field'>
                  <label>Time</label>
                    <Select
                        fluid
                        options={Options4}
                        name='Time'
                        placeholder='Time'
                        onChange={handleChangeTim}
                        isDisabled={timInp}
                        className='time'
                      />
                  <p className='error'>{errors.time}</p>
                </div>
              </div>
              <Button className="details_button1" type='submit' onClick={handleSubmit} disabled={btnstatus}>Submit</Button>
            </form>

        </div>
        }
        {
            info.map((val,i)=>
            <div className='form'>
                <div className='form-box'>
                  <h2>Submited details</h2>
                  <div className='submitted_details'>
                    <tr>
                      <td className='td1'><b> Appointment ID:</b></td><td className='td1'><b>{val.App_ID}</b></td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Full Name:</b></td><td className='td1'>{val.Full_Name}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Gender:</b></td><td className='td1'>{val.Gender}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Age:</b></td><td className='td1'>{val.Age}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Phone Number:</b></td><td className='td1'>{val.Phone_Num}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Email:</b></td><td className='td1'>{val.Email}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Address:</b></td><td className='td1'>{val.Address}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Consultation:</b></td><td className='td1'>{val.Consulting}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Appointment Date:</b></td><td className='td1'>{val.App_Date}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Appointment Time:</b></td><td className='td1'>{val.App_Time}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Hospital:</b></td><td className='td1'>{val.Hosp_Name}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Specialist:</b></td><td className='td1'>{val.Spe_Type}</td>
                    </tr>
                    <tr>
                      <td className='td1'><b>Doctor:</b></td><td className='td1'>{val.Doc_Name}</td>
                    </tr>
                  </div>
                </div>
            </div>
            )
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
    
    export default Patient;
