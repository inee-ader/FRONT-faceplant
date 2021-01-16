import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import Home from './Home'; 
import Dashboard from './Dashboard';
import axios from 'axios';
import EditUser from './EditUser'
import AddPlant from './AddPlant'

const HEROKU = 'https://peaceful-varahamihira-8367f0.netlify.app/'
const LOCAL = 'http://localhost:3000'

export default class App extends Component {

  state = { 
    loggedInStatus: "NOT_LOGGED_IN", 
    user: {}, 
    user_plants: {}
  }

  componentDidMount(){
    this.checkLoginStatus()
    this.getUserPlants()
  }

  checkLoginStatus = () => {
    axios.get(`${LOCAL}/logged_in`, { withCredentials: true })
    .then(response => {
      if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN", 
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN", 
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("check login error", error)
    })
  }
  
  getUserPlants = () => {
    // how do I get this user's plants? 
    axios.get(`${LOCAL}/user_plants`)
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN", 
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN", 
      user: {}
    })
  }

  userState = (user) => {
    this.setState({
      user: user
    })
  }

  handleAddPlant = (plantObj) => {
    this.setState(prevState => {
      user_plants: [...prevState.user_plants, plantObj]
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route 
              exact 
              path={"/"} 
              render={props => (
                <Home {...props} 
                  user={this.state.user}
                  handleLogin={this.handleLogin} 
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus} />
              )} />
            <Route 
              exact 
              path={"/dashboard"} 
              render={props => (
                <Dashboard {...props} 
                  user={this.state.user}
                  userPlants={this.state.user_plants}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus} /> 
              )} />
            <Route
              exact 
              path={"/edit_user"}
              render={props=> (
                <EditUser {...props}
                  userState={this.userState}
                  checkLoginStatus={this.checkLoginStatus}
                  user={this.state.user} 
                  handleLogout={this.handleLogout} 
                  loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route 
                exact
                path={"/add_plant"}
                render={props=> (
                  <AddPlant {...props}
                    handleAddPlant={this.handleAddPlant}
                    user={this.state.user} />
                )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
