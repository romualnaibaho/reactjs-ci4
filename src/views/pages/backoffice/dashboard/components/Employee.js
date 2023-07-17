import { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style/style.css';

const Employee = () => {

  useEffect(() => {
    getEmployeeData()
  }, [])

  const inputRef = useRef()

  const [employeeList, setEmployeelist] = useState('');
  const [employeeDetail, setEmployeeDetail] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isModalImage, setIsModalImage] = useState(false);
  const [isImageExists, setIsImageExists] = useState(false);

  const [isModalStatusOpened, setModalStatus] = useState(false);
  const [isModalDeletion, setModalDeletion] = useState(false);
  const [employeeId, setEmployeeId] = useState();

  const defaultPassword = 12345678;

  const [salutation, setSalutation] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = () => {
    const formData = new FormData();

    formData.append('image', selectedFiles)

    fetch(`${process.env.REACT_APP_BE}/api/upload-image/${employeeId}`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        getEmployeeData()
        setIsModalImage(false)
      })
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files[0];
    setSelectedFiles(files);
  };

  const clearEmployeeDetail = () => {
    setSalutation('')
    setFullName('')
    setGender('')
    setEmail('')
    setPosition('')
    setEmploymentType('')
    setJobLevel('')
    setIsActive(false)
  }

  const handleClose = () => {
    setIsModalOpened(false)
    setModalStatus(false)
    clearEmployeeDetail()
  }

  const openCreateModal = () => {
    setEmployeeDetail('')
    setIsModalOpened(true)
    setIsEdit(false)
  }

  const handleImage = (id, isProfileExists) => {
    setIsImageExists(isProfileExists)
    setIsModalImage(true)
    setEmployeeId(id)
  }

  const handleDeleteUser = (openModal, id) => {
    setModalDeletion(openModal)
    setEmployeeId(id)
  }

  const handleUserStatus = (openModal, id) => {
    setModalStatus(openModal)
    setEmployeeId(id)
  }

  const handleChangeUserStatus = (e) => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_BE}/api/change-employee-status/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setModalStatus(false)
      getEmployeeData()
    })
  }

  const handleDeleteAccount = (e) => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_BE}/api/delete-employee/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setModalDeletion(false)
      getEmployeeData()
    })
  }

  const handleUserEdit = (id) => {
    setIsEdit(true)
    setEmployeeId(id)
    getEmployeeDetail(id)
    setIsModalOpened(true)
  }

  const getEmployeeData = () => {
    fetch(`${process.env.REACT_APP_BE}/api/employee-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        setEmployeelist(res.data)
      })
  }

  const handleCreateOrEditUser = (e) => {
    e.preventDefault()

    if (isEdit) {
      handleEditUser()
    }
    else {
      handleCreateUser()
    }
  }

  const getEmployeeDetail = (id) => {
    fetch(`${process.env.REACT_APP_BE}/api/employee-detail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      const employee = res.data
      setSalutation(employee.salutation)
      setFullName(employee.fullname)
      setGender(employee.gender)
      setEmail(employee.email)
      setJobLevel(employee.jobLevel)
      setPosition(employee.position)
      setEmploymentType(employee.employmentType)
      setIsActive(employee.status === 'Y' ? true : false)
    })
  }

  const handleEditUser = () => {
    const payload = {
      salutation,
      fullName,
      gender,
      position: parseInt(position),
      employmentType: parseInt(employmentType),
      jobLevel: parseInt(jobLevel),
      isActive: isActive ? 'Y' : 'N'
    }

    fetch(`${process.env.REACT_APP_BE}/api/edit-employee/${employeeId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setIsModalOpened(false)
      getEmployeeData()
      clearEmployeeDetail()
    })
  }

  const handleCreateUser = () => {
    const payload = {
      salutation,
      fullName,
      gender,
      email,
      password: defaultPassword,
      position: parseInt(position),
      employmentType: parseInt(employmentType),
      jobLevel: parseInt(jobLevel),
      isActive: isActive ? 'Y' : 'N'
    }

    fetch(`${process.env.REACT_APP_BE}/api/create-employee`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setIsModalOpened(false)
      getEmployeeData()
    })
  }

  return (
    <div className="employee-section">
      {/* Modal Image */}
      <Modal
        show={isModalImage}
        onHide={() => setIsModalImage(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { isImageExists ?
            (<div className='img-preview text-center'>
              <img className='img-fluid' src={isImageExists} alt=""/>
              <p className='cursor-pointer mt-3' onClick={() => setIsImageExists('')} src="">Change user profile pictrue</p>
            </div>) :
            (<div
              className='image-container text-center'
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <em className="fas fa-user image-icon mb-4"></em>
              <div style={{fontSize: '10px'}}>Drag and drop here <br/>or<br/>choose a file</div>
  
              <input
                type="file"
                accept=".jpg, .jpeg"
                onChange={(e) => setSelectedFiles(e.target.files[0])}
                hidden
                ref={inputRef}
              />
              <button
                onClick={() => inputRef.current.click()}
                className='btn btn-secondary mt-4'
              >Choose a file</button>
  
              {selectedFiles && <div className='mt-2' style={{fontSize: '12px'}}>{selectedFiles.name}</div>}
            </div>
            )
          }
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleFileSelect} variant="primary">Save Profile Picture</Button>
          <Button variant="secondary" onClick={() => setIsModalImage(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Account Deletion */}
      <Modal
        show={isModalDeletion}
        onHide={() => setModalDeletion(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete this account?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => handleDeleteAccount(e)} variant="primary">Yes</Button>
          <Button variant="secondary" onClick={() => setModalDeletion(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Change Status */}
      <Modal
        show={isModalStatusOpened}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to change this user status?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => handleChangeUserStatus(e)} variant="primary">Yes</Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Add Employee */}
      <Modal
        show={isModalOpened}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEdit ? 'Edit Employee Data' : 'Create Employee Data'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row justify-content-center">
              <div className="form-group col-md-2">
                <label>Salutation {employeeDetail.salutation}</label>
                <select
                  onChange={(e) => setSalutation(e.target.value)}
                  className="custom-select mr-sm-2"
                  value={salutation ? salutation : ''}
                >
                  <option>Choose...</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </select>
              </div>
              <div className="form-group col-md-8">
                <label>Full Name</label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  type="text" className="form-control"
                  value={fullName ? fullName : ''}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Gender</label>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="custom-select mr-sm-2"
                  value={gender ? gender : ''}
                >
                  <option>Choose...</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" className="form-control"
                  disabled={isEdit}
                  value={email ? email : ''}
                />
              </div>
              {!isEdit ? (
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input disabled type="text" className="form-control" value={defaultPassword}/>
                </div>
              ) : <div className='col-md-6'/>}
              <div className="form-group col-md-4">
                <label>Job Level</label>
                <select
                  onChange={(e) => setJobLevel(e.target.value)}
                  className="custom-select mr-sm-2"
                  value={jobLevel ? jobLevel : ''}
                >
                  <option>Choose...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Position</label>
                <select
                  onChange={(e) => setPosition(e.target.value)}
                  className="custom-select mr-sm-2"
                  value={position ? position : ''}
                >
                  <option>Choose...</option>
                  <option value="1">Direktur</option>
                  <option value="2">Manager</option>
                  <option value="3">Staff</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Employment Type</label>
                <select
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="custom-select mr-sm-2"
                  value={employmentType ? employmentType : ''}
                >
                  <option>Choose...</option>
                  <option value="1">Pegawai Tetap</option>
                  <option value="2">Pegawai Kontrak</option>
                  <option value="3">Magang</option>
                </select>
              </div>

              <div className="form-group col-md-12">
                <div className="form-check">
                  <input
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="form-check-input" type="checkbox" id="gridCheck"
                    checked={isActive ? isActive : false}
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Set to active
                  </label>
                </div>
              </div>
              <div className='col-md-6'>
                <button onClick={(e) => handleCreateOrEditUser(e)} type="submit" className="btn btn-primary" style={{width: '100%'}}>
                  {isEdit ? 'EDIT DATA' : 'ADD DATA'}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h2>EMPLOYEE</h2>

      <div className='mt-4'>
        <button onClick={() => openCreateModal(!isModalOpened)} className='btn btn-success'>+ ADD EMPLOYEE</button>
      </div>

      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Position</th>
            <th scope="col">Job Level</th>
            <th scope="col">Employment Type</th>
            <th scope="col">Picture</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            employeeList.length === 0 ? (
              <tr>
                <td className='text-center' colSpan="8">
                  <p>No Entry Data</p>
                </td>
              </tr>
            ) : (
              employeeList.map((emp, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{emp.fullname}</td>
                    <td>{emp.email}</td>
                    <td>{emp.position}</td>
                    <td>{emp.jobLevel}</td>
                    <td>{emp.employmentType}</td>
                    <td className='text-center'>
                      <em onClick={() => handleImage(emp.id, emp.profile)} className="cursor-pointer fas fa-image"></em>
                    </td>
                    <td>{emp.status === 'Y' ? 'Active' : 'Inactive'}</td>
                    <td>
                      <em onClick={() => handleUserEdit(emp.id)} className="cursor-pointer fas fa-edit mx-1" aria-hidden="true" style={{color: 'green'}}></em>
                      <em onClick={() => handleUserStatus(true, emp.id)} className="cursor-pointer fa fa-cog mx-1" aria-hidden="true" style={{color: 'orange'}}></em>
                      <em onClick={() => handleDeleteUser(true, emp.id)} className="cursor-pointer fa fa-times mx-1" aria-hidden="true" style={{color: 'red'}}></em>
                    </td>
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

export default Employee;