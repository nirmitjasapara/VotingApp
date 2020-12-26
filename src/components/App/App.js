import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import AddPage from '../../routes/AddPage/AddPage';
import MainPage from '../../routes/MainPage/MainPage';
import HelpPage from '../../routes/HelpPage/HelpPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import CustomContext from '../../contexts/CustomContext';
import './App.css'

class App extends Component {
    static contextType = CustomContext
    renderMainRoutes() {
        return (
            <Switch>
                <Route
                    exact
                    path={'/'}
                    component={HelpPage}
                />
                <Route
                    exact
                    path={'/poll/:pollId'}
                    component={MainPage}
                />
                <PublicOnlyRoute
                    path={'/login'}
                    component={LoginPage}
                />
                <PublicOnlyRoute
                    path={'/register'}
                    component={RegistrationPage}
                />
                <PrivateRoute
                    path={'/add'}
                    component={AddPage}
                />
            </Switch>
        );
    }
    renderSideBarRoutes() {
        return (
            <Switch>
                {['/', '/poll/:pollId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={SideBar}
                    />
                ))}
            </Switch>
        );
    }
    render() {
        const { error } = this.context
        return (
            <div className="App">
                <Route component={Header} />
                {error ? <p className='red'>There was an error, try again</p> : 
                    <div className='frame'>
                        {this.renderSideBarRoutes()}
                        {this.renderMainRoutes()}
                    </div>
                }
            </div>
        );
    }
}

export default App;
