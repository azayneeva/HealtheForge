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
        <div className="row justify-content-md-center" style={{
          marginBottom: '20px'
        }}>
          <div className="col-8 col-md-7 col-lg-6">
            <div className="input-group">
              <input onChange={this.search.bind(this)} type="text" className="form-control" placeholder="Search for..."/>
            </div>
          </div>

          <div className="col-4 col-md-3 col-lg-2">
            <select className= "custom-select form-control" onChange={this.sort.bind(this)}>
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
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">
                    Last Name
                  </th>
                  <th scope="col">
                    First Name
                  </th>
                  <th scope="col">
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
          </div>
        </div>

        <div className="row justify-content-md-center">
          <span className="col-3">
            {pageNumber > 0 && <a className="btn btn-light" href="#" onClick={this.changePage.bind(this, this.state.pageNumber - 1)}>Previous</a>}
          </span>
          <h5 className="col-6 col-md-3 col-lg-2">
              {pageNumber + 1}  of {this.state.totalPages}
          </h5>
          <span className="col-3">
            {pageNumber < this.state.totalPages - 1 && <a className="btn btn-light" href="#" onClick={this.changePage.bind(this, this.state.pageNumber + 1)}> Next</a>}
          </span>
        </div>
      </div>
    )
  }
}
