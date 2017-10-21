import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {getPatient} from '../api/patients';


export class patientDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: {}
    }
  }

  componentDidMount() {
    const patientId = this.props.match.params.patientId
    getPatient(patientId)
      .then((patient) => {
        this.setState({patient})
      })
  }

  render() {
    return (
      <div>
        <h2> Details of {this.state.patient.firstName} {this.state.patient.lastName} </h2>
        <dl>
          <dt>First Name:</dt>
          <dd>{this.state.patient.firstName}</dd>

          <dt>Last Name:</dt>
          <dd>{this.state.patient.lastName}</dd>

          <dt>Gender:</dt>
          <dd>{this.state.patient.gender}</dd>

          <dt>Date of Birth:</dt>
          <dd>{this.state.patient.dateOfBirth}</dd>
        </dl>
        <Link to="/"><button className="btn btn-light">Back to the main page</button></Link>
      </div>
    )
  }
}
