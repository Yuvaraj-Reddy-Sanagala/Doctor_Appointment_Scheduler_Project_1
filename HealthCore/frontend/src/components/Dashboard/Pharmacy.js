import React, { useState , useEffect} from 'react';
import '../../App.css';
import axios from 'axios';
import { Button  } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Select  from 'react-select';



// Rendering the Dashboard component 
const Pharmacy = ({params}) => {
  const [selectedCit, setselectedCit] = useState('');
  const [options, setOptions] = useState('');
  const [phar,setPhar]=useState([]);

  useEffect(() => {
     axios.get("http://localhost:5000/getCity").then((res) => {
      setOptions(res.data.map((ele,i)=>({value:ele.Cit_ID,label:ele.Cit_Name})));
     }).catch((error) => console.log(error));
  }, []);


  const fetchresponse=async(val)=>{

    const response= await axios.post('http://localhost:5000/selectedCit', {
        selectedCit: val
      })
      console.log(response.data)
      setPhar(response.data)
  }



  const handleChange = (event) => {
    let phars= event.value;
    if (phars){
      setselectedCit(phars);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCit){
      fetchresponse(selectedCit)
    }
  }




  return (
    <div className="user">
    
  
    <header className='App'>
        <p><b>Pharmacy</b></p>
       
    </header>
    <div className='confirmation-box'>
      <div className='confirmation'>
        <div className='field'>
          <Select
            fluid
            options={options}
            name='menu'
            placeholder='Select location for Pharmacy'
            className='dropdown'
            onChange={handleChange}
          />
        </div>
        <Button className='details_button1' type="submit" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
    {
      phar.map((val)=><div className='phars' ><a href={val.Pha_Link} target="_blank" rel="noreferrer noopener">{val.Pha_Name}</a>
      </div>)
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

export default Pharmacy;