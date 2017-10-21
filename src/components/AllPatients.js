import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getPatients} from '../api/patients';

export class AllPatients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patients: [],
      totalPages: 0,
      pageNumber: 0,
      query: '',
      sortBy: ''
    }
  }

  componentDidMount() {
    const page = this.state.pageNumber
    getPatients(page).then(res => {
      this.setState(res)
    })
  }

  updateResults() {
    getPatients(this.state.pageNumber, this.state.query, this.state.sortBy).then(res => {
      this.setState(res)
    })
  }

  search(e) {
    const query = e.target.value
    this.setState({
      query: query,
      pageNumber: 0
    }, this.updateResults)
  }

  changePage(page, e) {
    e.preventDefault()

    this.setState({
      pageNumber: page
    }, this.updateResults)
  }

  sort(e) {
    const sortBy = e.target.value
    this.setState({
      sortBy: sortBy
    }, this.updateResults)

  }

  render() {
    const pageNumber = this.state.pageNumber
    return (
      <div>
        <h2>
          Patients Data
        </h2>

        <input onChange={this.search.bind(this)} type="text" placeholder="Search..."/>

        <select onChange={this.sort.bind(this)}>
          <option defaultValue value="">Order by</option>
          <option value="firstName ASC">
            firstName ASC
          </option>
          <option value="firstName DESC">
            firstName DESC
          </option>
          <option value="lastName ASC">
            lastName ASC
          </option>
          <option value="lastName DESC">
            lastName DESC
          </option>
          <option value="dateOfBirth ASC">
            dateOfBirth ASC
          </option>
          <option value="dateOfBirth DESC">
            dateOfBirth DESC
          </option>

        </select>

        <table>

          <thead>
            <tr>
              <th>
                Last Name
              </th>
              <th>
                First Name
              </th>
              <th>
                Date of Birth
              </th>
            </tr>
          </thead>

          <tbody>
            {this.state.patients.map(patient => (
              <tr key={patient.lastName}>
                <td>
                  <Link to={`/patient/${patient.patiendId}`}>{patient.lastName}</Link>
                </td>
                <td>
                  <Link to={`/patient/${patient.patiendId}`}>{patient.firstName}</Link>
                </td>
                <td>
                  <Link to={`/patient/${patient.patiendId}`}>{patient.dateOfBirth}</Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        <p>
          {pageNumber > 0 && <a href="#" onClick={this.changePage.bind(this, this.state.pageNumber - 1)}>&lt;&lt;Previous</a>}
          {pageNumber + 1}
          of {this.state.totalPages}
          {pageNumber < this.state.totalPages - 1 && <a href="#" onClick={this.changePage.bind(this, this.state.pageNumber + 1)}>
            next&gt;&gt;
          </a>}
        </p>
      </div>
    )
  }
}
