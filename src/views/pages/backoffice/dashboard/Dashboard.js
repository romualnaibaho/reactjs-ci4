import './style/style.css';
import Employee from './components/Employee'
import User from './components/User'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  useEffect(() => {
    const loginData = localStorage.getItem('loginData')

    if (!loginData) {
      history.push('/backoffice/login')
    }
  },[])

  const history = useHistory()

  const employee = 1;
  const user = 2;

  const [activePage, setActivePage] = useState(employee);

  const logout = (e) => {
    e.preventDefault()

    localStorage.removeItem('loginData');
    history.push('/backoffice/login')
  }

  return(
    <div className='dashboard'>
      <div className='row'>
        <div className='sidebar-menu col-md-2'>
          <h2 className='text-center'>Dashboard</h2>

          <hr/>

          <div onClick={() => setActivePage(employee)} className={`menu ${activePage === employee ? 'active' : ''}`}>Employee</div>
          <div onClick={() => setActivePage(user)} className={`menu ${activePage === user ? 'active' : ''}`}>User</div>
        </div>
        <div className='col-md-10 p-0'>
          <div className='top-bar d-flex'>
            <div className='my-auto ml-auto d-flex'>
              <span className='my-auto mr-3'>ADMIN</span>
              <div className='user-icon d-flex'>
                <em className='m-auto fas fa-user'/>
              </div>

              <em onClick={(e) => logout(e)} className="logout fas fa-sign-out-alt my-auto mr-3"></em>
            </div>
          </div>
          {
            activePage === employee ? (
              <Employee/>
            ) : (<User/>)
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard;