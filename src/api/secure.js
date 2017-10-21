/*global Keycloak*/

var keycloak = Keycloak({
    url: 'https://auth.healthforge.io/auth',
    realm: 'interview',
    clientId: 'interview',
    flow: 'hybrid'
})

const loginKeycloak = ()=>{
  return new Promise((resolve, reject) => {
    if (keycloak.token) {
      return resolve(keycloak.token)
    }
    keycloak.init({ onLoad: 'login-required' })
      .success(() => {
        resolve(keycloak.token)
      })
      .error(function () {
        reject('Authentication went really bad')
        //window.location.reload();
      });
  })
}

const getKeycloackToken = ()=>{
  return loginKeycloak()
    .then(()=>{
      return new Promise((resolve, reject) => {
        keycloak.updateToken(30).success(function() {
          resolve(keycloak.token)
        }).error(function() {
          reject('Authentication went bad')
        })
      })
    })
}


const fetchSecure = (url)=>{
  return getKeycloackToken()
    .then(token=>{
      return fetch(url,{
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    })
}

export {
  fetchSecure
}
