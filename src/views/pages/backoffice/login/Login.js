import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style/style.css';

const Login = () => {
  useEffect(() => {
    const loginData = localStorage.getItem('loginData')

    if (loginData) {
      history.push('/backoffice/dashboard')
    }
  },[])

  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault()

    const payload = {
      email,
      password
    }

    fetch(`${process.env.REACT_APP_BE}/api/login-admin`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      localStorage.setItem('loginData', JSON.stringify(res.data))
      history.push('/backoffice/dashboard')
    })
  }

  return(
    <div>
      <div className="login-page container d-flex">
        <div className="m-auto">
          <div className="login-box">
            <p className="title text-center">Login</p>

            <hr/>

            <div className='card-body'>
              <form>
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <em className='fas fa-user'/>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <em className='fas fa-key'/>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className='text-center'>
                  <button
                    onClick={(e) => handleLogin(e)}
                    className="btn btn-primary"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;