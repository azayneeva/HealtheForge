import { fetchSecure } from './secure.js'

const API = 'https://api.interview.healthforge.io:443/api/secure'

const getPatients = (pageNumber=0, query='', sortBy='')=>{
  return fetchSecure(`${API}/patient?page=${pageNumber}&size=10&lastName=${query}&sort=${sortBy}`)
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
    .catch((err)=>{
      console.log(err)
    })
}

const getPatient = (patientId)=>{
  return fetchSecure(`${API}/patient/${patientId}`)
    .then((res) => res.json())
    .then((patient) => {
      return {
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth.slice(0, 10),
        patiendId: patient.identifiers[0].value
      }
    })
    .catch((err)=>{
      console.log(err)
    })
}

export {
  getPatients,
  getPatient
}
