import React, { useEffect, useState} from 'react';
import '../../App.css';
import axios from 'axios';
import { Button  } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';





// Rendering the Dashboard component 
const ContactUs = () => {
  
    const [addComment,setAddComment]=useState('');
    const [commentsList,setCommentsList]=useState([]);
    const [submitbtn,setSubmitBtn]=useState(true);

    useEffect(()=>{
      axios.get('http://localhost:5000/getcomments').then((res)=>{
        setCommentsList(res.data.map((ele,i)=>(ele.comment)))
      }).catch((error) => console.log(error));
    },[])

    const handleSubmit = async(e) => {
      e.preventDefault();
      const  response= await axios.post('http://localhost:5000/addcomments',{comments:addComment});
      axios.get('http://localhost:5000/getcomments').then((res)=>{
        setCommentsList(res.data.map((ele,i)=>(ele.comment)))
      }).catch((error) => console.log(error));
      console.log(response.data);
    }
    const handleChange = (e) =>{
      console.log(e)
      setAddComment(e.target.value)
      setSubmitBtn(false);
    }



  return (
    <div className="contact">
  
    <header className='App' style={{marginTop:'70px'}}>
        <p><b>Contact Us</b></p>
    </header>

    <div className='confirmation-box'>
      <div className='info1'>
        <div className='feedback'>
          <div className='val'>
            <label>Email - 1 </label>
            <a className='con'  href = "mailto:ysanagala@gmail.com?subject = Issue = Message">
            ysanagala@gmail.com
            </a>
          </div>
          <div className='val'>
            <label>Email - 2 </label>
            <a className='con'  href = "mailto:ysanagala@gmail.com?subject = Issue = Message">
            ysanagala@gmai.com
            </a>
          </div>
        </div>
        <div className='feedback'>
          <div className='val'>
            <label>Tollfree -1 </label>
            <a className='con' href='Tel:+1-(445)-680-9846'>
            +1-(445)-680-9846
            </a>
          </div>
          <div className='val'>
            <label>Tollfree -2 </label>
            <a className='con'  href='Tel:+1-(445)-680-9848'>
            +1-(445)-680-9848
            </a>
          </div>
          <div className='val'>
            <label>Tollfree -3 </label>
            <a className='con' href='Tel:+1-(445)-680-9849'>
            +1-(445)-680-9849
            </a>
          </div>
        </div>
      </div>
    </div>

    
    <div className='info2'>
      <div>
        <h3>Comments</h3>
        <textarea 
        name="comment"
        className='textarea'
        onChange={handleChange} 
        />
        <Button onClick={handleSubmit} className="comment-button" disabled={submitbtn}>Submit</Button>
        <div className='comment-container'>
          {
            commentsList.map((val)=><div className='previous-comment'>
              <div>{val}</div>
            </div>)
          }
        </div>
      </div>
      
    </div>
      
    {/* Input form for GitHub url and toast message */}

      <div className='box'>

      </div>

      <div className='App'>
      
      </div>

      {/* Rendering the two Ag-Grids */}
      <div className='left-rigt-ag-grid'>
            
      </div>

      {/* Rendering the Tabs */}
     
      
    </div>
  );
}

export default ContactUs;
