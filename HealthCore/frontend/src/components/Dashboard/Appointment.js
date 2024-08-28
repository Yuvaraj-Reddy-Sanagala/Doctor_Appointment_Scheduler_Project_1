import React from 'react';
import '../../App.css';
import { Button } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useHistory } from 'react-router-dom';




// Rendering the Dashboard component 
const Appointment = () => {
  


  const history = useHistory();

  const openForm= async(e, {name}) =>{
    e.preventDefault();
    if (name === 'Patient'){
      history?.push("/scheduler/appointment/patient");
    }
    else if (name === 'Doctor'){
      history?.push("/scheduler/appointment/doctor");
    }
  }


    return (

        <div className="schedule">
      
        <header className='App' >
            <p><b>Appointment</b></p>
        </header>
          <div className="sbuttons">
            <p>Click on "Patient Button" if you are a patient or "Doctor Button" if you are a doctor</p>
            <Button className="b" name='Patient' onClick={openForm}>Patient</Button>
            <Button className="b"name='Doctor' onClick={openForm}>Doctor</Button>
          </div>
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
    
    export default Appointment;