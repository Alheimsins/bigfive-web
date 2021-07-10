import React, { useState } from 'react'
import { Router } from '../routes'
import { Field, Button, InputText } from '../components/alheimsins'
import getConfig from 'next/config'
import axios from 'axios'
import { authenticationService } from '../lib/auth.service'

const { publicRuntimeConfig } = getConfig()
const http = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 18000
})

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateAccount = e => {
    e.preventDefault()
    console.log(email, password)
    const userData = { user: { email, password } }
    http.post('/api/users', userData)
      .then(res => {
        console.log(res)
        authenticationService.login(res.data.user)
        Router.pushRoute('/test/en')
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
      })
  }

  // TODO: Create vs login
  // TODO: Add error handling

  return (
    <div>
      <form onSubmit={e => { handleCreateAccount(e) }} style={{ marginTop: '40px' }}>
        <Field name='Email'>
          <InputText name='email' value={email} onChange={e => { setEmail(e.target.value) }} placeholder='Enter your email' autoComplete='off' autoFocus />
        </Field>
        <Field name='Password' style={{ marginBottom: 0 }}>
          <InputText name='password' value={password} onChange={e => { setPassword(e.target.value) }} placeholder='password' autoComplete='off' type='password' />
        </Field>

        <Button value='Create Account' type='submit' />

      </form>
    </div>
  )
}

export default SignUp

// TODO convert to function, get rid of this.props stuff
// export default class SignUp extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       user: {
//         email: "",
//         password: ""
//       }
//     }
//     this.handleAdd = this.handleAdd.bind(this)
//     this.handleChange = this.handleChange.bind(this)

//     // const location = useLocation();
//     const sessionId = location.search.replace('?session_id=', '');

//     useEffect(() => {
//       async function fetchSession() {
//         setSession(
//           await fetch('/checkout-session?sessionId=' + sessionId).then((res) =>
//             res.json()
//           )
//         );
//       }
//       fetchSession();
//     }, [sessionId]);
//   }

//   handleChange ({ target }) {
//     const value = target.value
//     this.setState({ [target.name]: value})
//   }

//   handleCreateAccount (e) {
//     return null
//   }

//   render () {
//     return (
//       <div>
//         <form onSubmit={this.handleCreateAccount} style={{ marginTop: '40px' }}>
//           <Field name='Name'>
//             <InputText name='name' value={name} onChange={this.handleChange} placeholder='Name for comparison' autoComplete='off' autoFocus />
//           </Field>
//           <Field name='ID' style={{ marginBottom: 0 }}>
//             <InputText name='id' value={id} onChange={this.handleChange} placeholder='URL or id for comparison' autoComplete='off' />
//           </Field>
//           {error && <p style={{ fontSize: '10px', color: '#ff0033' }}>{error}</p>}
//           <Button value='Add' type='submit' disabled={!validMongoId(formattedId) || !id || !name} />
//         </form>
//       </div>
//     )
//   }
// }
