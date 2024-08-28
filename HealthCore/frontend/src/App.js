import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import NAvBar from './components/NavBar.js';
import ErrorBoundary from './components/ErrorBoundary.js';
import Scheduler from "./components/Dashboard/Scheduler.js";
import Pharmacy from './components/Dashboard/Pharmacy.js';
import ContactUs from './components/Dashboard/Contact.js';
import Appointment from './components/Dashboard/Appointment.js';
import Cancellation from './components/Dashboard/Cancellation.js';
import Patient from './components/Dashboard/Patient.js';
import Confirmation from './components/Dashboard/Confirmation.js';
import Doctor from './components/Dashboard/Doctor.js';

function App() {

  return (
    <div >
      
        <BrowserRouter >
          <NAvBar />
          <Switch>
            <Route exact path="/">
              <div className="App-header">
                <div className='about'>
                  <h1>Doc-Scheduler</h1>
                  <p>The DocScheduler, a web application that helps patients to schedule appointments. You can either book appointments online or offline. You will have access to select a hospital and doctor of your choice.</p>
                </div>
              </div>
            </Route>
            <Route exact path="/dashboard" >
              <ErrorBoundary>
                  <Dashboard />
              </ErrorBoundary>
            </Route>
            <Route exact path="/scheduler" >
              <ErrorBoundary>
                  <Scheduler />
              </ErrorBoundary>
            </Route>
            <Route exact path="/scheduler/appointment" >
              <ErrorBoundary>
                  <Appointment />
              </ErrorBoundary>
            </Route>
            <Route exact path="/scheduler/cancellation" >
              <ErrorBoundary>
                  <Cancellation />
              </ErrorBoundary>
            </Route>
            <Route exact path="/scheduler/confirmation" >
              <ErrorBoundary>
                  <Confirmation />
              </ErrorBoundary>
            </Route>
            <Route exact path="/scheduler/appointment/patient" >
              <ErrorBoundary>
                  <Patient />
              </ErrorBoundary>
            </Route>
            <Route exact path="/scheduler/appointment/doctor" >
              <ErrorBoundary>
                  <Doctor />
              </ErrorBoundary>
            </Route>
            <Route exact path="/pharmacy" >
              <ErrorBoundary>
                  <Pharmacy/>
              </ErrorBoundary>
            </Route>
            <Route exact path="/contact us" >
              <ErrorBoundary>
                  <ContactUs />
              </ErrorBoundary>
            </Route>

          </Switch>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
