import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import Home from './Home'; 
import Dashboard from './Dashboard';
import axios from 'axios';
import EditUser from './EditUser'
import AddPlant from './AddPlant'
import EditPlant from './EditPlant'

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
  }

  checkLoginStatus = () => {
    axios.get(`${LOCAL}/logged_in`, { withCredentials: true })
    .then(response => {
      if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN", 
          user: response.data.user
        })
        this.getUserPlants(response.data.user.id)
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
  
  getUserPlants = (id) => {
    
    axios.get(`${LOCAL}/users/${id}`)
    .then(response => {
      if(response.data.user_plants){
        let plants = response.data.user_plants
        this.setState({
          user_plants: plants
        })
      }
      else{
        null
      }
      // console.log("user plants: ", this.state.user_plants)
    })
    .catch(error => {
      console.log("get plants error: ", error)
    })
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
                  getUserPlants={this.getUserPlants}
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
                <Route 
                  exact
                  path={"/edit_plant"}
                  render={props => (
                    <EditPlant {...props}
                      user={this.state.user}
                      />
                  )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
