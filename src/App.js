import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import { AllPatients } from './components/AllPatients';
import { patientDetails } from './components/patientDetails';
import { NotFound } from './components/NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          Welcome to Healthfrog
        </h1>
        <Switch>
          <Route path="/" exact component={AllPatients} />
          <Route path="/patient/:patientId" component={patientDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
