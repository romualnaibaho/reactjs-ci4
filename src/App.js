import './App.css';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory()

  const goToLoginPage = () => {
    history.push('/backoffice/login')
  }

  return (
    <div className="App home-page d-flex">
      <div className='m-auto'>
        <h1>Halo, nice to meet you :)</h1>

        <p>Please click the link below to jump to the login page.</p>
        <div onClick={() => goToLoginPage()} className="login">LOGIN</div>

        <div className='note mt-4'>
          Please note that you can login with this credential:
          <br/>
          email : admin@lpi.co.id
          <br/>
          password : admin123
        </div>
      </div>
    </div>
  );
}

export default App;
