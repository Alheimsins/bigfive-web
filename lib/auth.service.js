import { BehaviorSubject } from 'rxjs'
import { getItem, setItem, removeItem } from './localStorageStore'
// import { Router } from 'react-router-dom'

const currentUserSubject = new BehaviorSubject(JSON.parse(getItem('currentUser')))

// const handleResponse = response => {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text)
//     if (!response.ok) {
//       if ([401, 403].indexOf(response.status) !== -1) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         logout()
//         Router.push('/')
//       }
//       const error = (data && data.message) || response.statusText
//       return Promise.reject(error)
//     }
//     return data
//   })
// }

function login (user) {
  setItem('currentUser', JSON.stringify(user))
  currentUserSubject.next(user)
  return user
}

function logout () {
  // remove user from local storage to log user out
  removeItem('currentUser')
  currentUserSubject.next(null)
}

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
}
