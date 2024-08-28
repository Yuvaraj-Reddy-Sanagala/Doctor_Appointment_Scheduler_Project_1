import React, { } from 'react';
import '../../App.css';
import { Button  } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useHistory } from 'react-router-dom';




// Rendering the Dashboard component 
const Scheduler = () => {

  const history = useHistory();

  const openPage = async(e, {name}) =>{
    e.preventDefault();
    if (name === 'Appointment'){
      history?.push("/scheduler/appointment");
    }
    else if (name === 'Cancellation'){
      history?.push("/scheduler/cancellation");
    }
    else if (name === "Confirmation"){
      history?.push("/scheduler/confirmation")
    }
  }


    return (

        <div className="schedule">
      
        <header className='App' >
            <p><b>Scheduler</b></p>
        </header>
          <div className="sbuttons">
            <Button className="b" name='Appointment' onClick={openPage}>Appointment</Button>
            <Button className="b" name='Cancellation' onClick={openPage}>Cancellation</Button>
            <Button className="b" name='Confirmation' onClick={openPage}>Confirmation</Button>
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
    
    export default Scheduler;