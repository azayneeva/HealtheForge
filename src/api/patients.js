const API = 'https://api.interview.healthforge.io:443/api'

const getPatients = (pageNumber=0, query='', sortBy='')=>{
  return fetch(`${API}/patient?page=${pageNumber}&size=10&lastName=${query}&sort=${sortBy}`)
    .then((res) => res.json())
    .then((res) => {
      const mappedPatients = res.content.map(patient => ({
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth.slice(0, 10),
        patiendId: patient.identifiers[0].value
      }))
      return {
        patients: mappedPatients,
        totalPages: res.totalPages
      }
    })
}

const getPatient = (patientId)=>{
  return fetch(`https://api.interview.healthforge.io:443/api/patient/${patientId}`)
    .then((res) => res.json())
    .then((patient) => {
      return {
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth.slice(0, 10),
        patiendId: patient.identifiers[0].value
      }
    })
}

module.exports = {
  getPatients,
  getPatient
}
