import React, {  } from 'react';
import '../../App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



// Rendering the Dashboard component 
const Dashboard = () => {
  
  return (
    <div id='home-image'>
  
    <header className='App' >
        <p><b>Home</b></p>
    </header>
      <div className='Intro'>
        <h1>Introduction</h1>
        <p><b>This platform is simple and easy to navigate. All you need to do is follow the prompts and it will take you to the next section once you have completed the present screen. Patients can book an appointment and select pharmacy based on their preference. In contrast to other websites, this web-application gives Patients access to a variety of hospitals, allowing them to schedule an appointment whenever and wherever they prefer.</b> </p>
      </div>
      <div className='content-container'>
        <h1>Information</h1>
        <div className='content'>
          <table className='table'>
            <thead className='thead'>
              <tr>
                <th colSpan='2' className='th'>Health Tips</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              <tr className='tr'><td className='col1'><b>Tip-1 </b></td><td className='col2'>An apple a day keeps doctor away</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-2 </b></td><td className='col2'>Limit Unhealthy Foods and Eat Healthy Meals</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-3 </b></td><td className='col2'>Drink Water and Stay Hydrated, and Limit Sugared Beverages</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-4 </b></td><td className='col2'>Get Enough Good Sleep</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-5 </b></td><td className='col2'>Eat nuts and seeds</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-6 </b></td><td className='col2'>Eat fatty fish</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-7 </b></td><td className='col2'>Take vitamin D if you’re deficient</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-8 </b></td><td className='col2'>Don’t smoke or use drugs, and only drink in moderation</td></tr>
              <tr className='tr'><td className='col1'><b>Tip-9 </b></td><td className='col2'>Avoid artificial trans fats</td></tr>
            </tbody>
          </table>
          <table className='table'>
            <thead className='thead'>
              <tr>
                <th colSpan='2' className='th'>News Letters</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              <tr className='tr'><td className='col1'><b>News-1</b></td><td className='col2'>Reforming US Healthcare system</td></tr>
              <tr className='tr'><td className='col1'><b>News-2</b></td><td className='col2'>Vaccine News and Resources</td></tr>
              <tr className='tr'><td className='col1'><b>News-3</b></td><td className='col2'>Study suggests new strategies to reduce age related weight gain</td></tr>
              <tr className='tr'><td className='col1'><b>News-4</b></td><td className='col2'>New Anti-cancer agents activated by ultrasound does not have strong side effects</td></tr>
              <tr className='tr'><td className='col1'><b>News-5</b></td><td className='col2'> </td></tr>
              <tr className='tr'><td className='col1'><b>News-6</b></td><td className='col2'> </td></tr>
              <tr className='tr'><td className='col1'><b>News-7</b></td><td className='col2'> </td></tr>
              <tr className='tr'><td className='col1'><b>News-8</b></td><td className='col2'> </td></tr>
              <tr className='tr'><td className='col1'><b>News-9</b></td><td className='col2'> </td></tr>
            </tbody>
          </table>
        </div>
        
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

export default Dashboard;
