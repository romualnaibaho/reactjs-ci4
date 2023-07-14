import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import App from './App'
import Dashboard from "./views/pages/backoffice/dashboard/Dashboard"
import Login from './views/pages/backoffice/login/Login'

const Middleware = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" render={ () => <App /> }/>
                <Route exact path="/backoffice/login" render={ () => <Login /> }/>
                <Route exact path="/backoffice/dashboard" render={ () => <Dashboard /> }/>
            </Switch>
        </Router>
    )
}

export default Middleware;