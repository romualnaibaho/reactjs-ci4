import { useEffect, useState } from 'react';
import './style/style.css';

const User = () => {

  useEffect(() => {
    getUserData()
  }, [])

  const [userList, setUserlist] = useState('');

  const getUserData = () => {
    fetch(`${process.env.REACT_APP_BE}/api/user-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        setUserlist(res.data)
      })
  }

  return (
    <div className="employee-section">
      <h2>USER</h2>

      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            userList.length === 0 ? (
              <tr>
                <td className='text-center' colSpan="8">
                  <p>No Entry Data</p>
                </td>
              </tr>
            ) : (
              userList.map((ump, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index++}</th>
                    <td>{ump.fullname}</td>
                    <td>{ump.email}</td>
                    <td>{ump.gender}</td>
                    <td>{ump.status === 'Y' ? 'Active' : 'Inactive'}</td>
                  </tr>
                )
              })
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default User;