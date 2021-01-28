import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import Home from './Home'; 
import Dashboard from './Dashboard';
import axios from 'axios';
import EditPlant from './EditPlant'
import EditUser from './EditUser'
import AddPlant from './AddPlant'
import { withRouter } from "react-router";
import Greenhouse from './Greenhouse'
import PlantShow from './PlantShow'
import ThePond from './ThePond'

import snail from '../snail.png'
import "../App.css"

const HEROKU = 'https://peaceful-varahamihira-8367f0.netlify.app'
const LOCAL = 'http://localhost:3000'

class App extends Component {

  state = { 
    loggedInStatus: "NOT_LOGGED_IN", 
    user: {}, 
    user_plants: [], 
    all_plants: [], 
    page: '', 
    plantShow: null, 
    errors: '', 
    pond: false
  }

  componentDidMount(){
    this.checkLoginStatus()
    this.getAllPlants()
    this.renderHeader()
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
 
  getAllPlants = () => {
    axios.get(`${LOCAL}/user_plants`)
    .then(response => {
      this.setState({
        all_plants: response.data
      })
    })
  }
  
  getUserPlants = () => {
    axios.get(`${LOCAL}/users/${this.state.user.id}`)
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
    })
    .catch(error => {
      console.log("get all plants error: ", error)
    })
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN", 
      user: data.user
    }, () => {this.getUserPlants()})
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN", 
      user: {}, 
      user_plants: []
    })
  }

  userState = (user) => {
    this.setState({
      user: user
    })
  }

  handleAddPlant = (plantObj) => {
    this.setState(prevState => ({
      user_plants: [...prevState.user_plants, plantObj],
      all_plants: [...prevState.all_plants, plantObj]
    }))
  }

  handleUpdatePlants = (data) => {
    console.log("handleUpdatePlants: ", data)
    console.log("user_plants: ", this.state.user_plants)
    this.setState(prevState => ({
      user_plants: prevState.user_plants.map(plant => plant.id ===data.id ? data : plant)
    }))
  }

  handleDeletePlant = (id) => {
    axios.delete(`${LOCAL}/user_plants/${id}`)
    .then(response => {
      // console.log("Deleted: ", response)
      this.setState(prevState => ({
        user_plants: prevState.user_plants.filter(plants => plants !== response)
      }),this.getUserPlants())
    })
  }

  handleLikePlant = (id) => {
    // console.log("plant id: ", id)
    axios.post(`${LOCAL}/likes`, {
      like: {
        user_id: this.state.user.id, 
        user_plant_id: id
      }
    }, { withCredentials: true }
    ).then(response => {
      // console.log(response)
      let newUserLike = this.state.all_plants.map(user_plant => user_plant.id === id 
        ? 
        {...user_plant, likes: [...user_plant.likes, response.data.like]}
        : 
        user_plant)
      this.setState({
        all_plants: newUserLike
      })
    })
  }

  handleUnlikePlant = (likeObj) => {
    axios.delete(`${LOCAL}/likes/${likeObj.id}`)
    .then(response => {
      let userUnlikeArr = this.state.all_plants.map(user_plant => user_plant.id === likeObj.user_plant_id 
        ? 
        {...user_plant, likes: user_plant.likes.filter(like => like.id !== likeObj.id)}
        : 
        user_plant)
      this.setState({
        all_plants: userUnlikeArr
      })
    })
  }

  setShownPlant = (plant) => {
    this.setState({
      plantShow: plant
    }, localStorage.setItem("plantShow", JSON.stringify(plant)))
  }

  getShownPlant = () => {
    if(this.state.plantShow){
      return this.state.plantShow 
    }else{
      let shown = JSON.parse(localStorage.getItem("plantShow"))
      this.setState({plantShow: shown})
      return shown
    }
  }

  usernameP = () => {
    if(window.location.pathname === '/the_pond'){
      return null
    }else{
      return "h-username-p"
    }
  }

  classHeader = () => {
    if(window.location.pathname === '/the_pond'){
      return "pond-mode-header"
    }else{
      return "regular-header"
    }
  }

  classFooter = () => {
    if(window.location.pathname === '/the_pond'){
      return "pond-mode-footer"
    }else{
      return "regular-footer"
    }
  }

  renderHeader = () => {
    if(window.location.pathname === '/'){
      this.setState({page: 'HOME'})
    }else if(window.location.pathname === '/dashboard'){
      this.setState({page: 'DASHBOARD'})
    }else if(window.location.pathname === '/greenhouse'){
      this.setState({page: 'THE GREENHOUSE'})
    }else if(window.location.pathname === '/add_plant'){
      this.setState({page: 'ADD A PLANT'})
    }else if(window.location.pathname === '/edit_user'){
      this.setState({page: 'EDIT USER'})
    }else if(window.location.pathname.includes('/show_plant')){
      let showing = JSON.parse(localStorage.getItem("plantShow"))
      this.setState({page: showing.common_name})
    }else if(window.location.pathname.includes('/show_user')){
      let user = JSON.parse(localStorage).getItem("userShow")
      this.setState({page: user.username})
    }else if(window.location.pathname === '/the_pond'){
      this.setState({page: 'THE POND'})
    }else{
      this.setState({page: 'FACEPLANT'})
    }
  }

  backToTopButton = () => {
    if(window.location.pathname === '/greenhouse'){
      return (
        <button className="footer-btn" onClick={()=>{window.scrollTo({top:0, left:0, behavior:'smooth'})}}>Back to top</button>
      )
    }
  }

  render() {
    
    return (
      <div className='app'>
        <header className={this.classHeader()} >
          <p className={this.usernameP()} >{this.state.user.username}</p>
          <h1 className="heading-text">{this.state.page}</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route 
              exact 
              path={"/"} 
              render={props => (
                <Home {...props} 
                  renderHeader={this.renderHeader}
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
                  getUserPlants={this.getUserPlants}
                  getShownPlant={this.getShownPlant}
                  setShownPlant={this.setShownPlant}
                  renderHeader={this.renderHeader}
                  user={this.state.user}
                  userPlants={this.state.user_plants}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus} 
                  handleDeletePlant={this.handleDeletePlant}
                 /> 
              )} />
            <Route
              exact 
              path={"/edit_user"}
              render={props=> (
                <EditUser {...props}
                  renderHeader={this.renderHeader}
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
                    renderHeader={this.renderHeader}
                    handleAddPlant={this.handleAddPlant}
                    user={this.state.user} />
                )} />
              <Route 
                path={"/show_plant/:id"}
                render={props => (
                  <PlantShow {...props}
                    handleDeletePlant={this.handleDeletePlant}
                    user={this.state.user}
                    setUserShow={this.setUserShow}
                    plant={this.getShownPlant()}
                    renderHeader={this.renderHeader}
                    getShownPlant={this.getShownPlant}

                  />
                )} />
              <Route 
                exact
                path={"/greenhouse"}
                render={props => (
                  <Greenhouse {...props}
                    setUserShow={this.setUserShow}
                    setShownPlant={this.setShownPlant}
                    renderHeader={this.renderHeader}
                    user={this.state.user}
                    handleLikePlant={this.handleLikePlant}
                    handleUnlikePlant={this.handleUnlikePlant}
                    getAllPlants={this.getAllPlants}
                    allPlants={this.state.all_plants}
                    />
                )} />
              <Route 
                path={"/edit_plant"}
                render={props => (
                  <EditPlant {...props}
                    user={this.state.userShow}
                    renderHeader={this.renderHeader}
                    plant={this.state.plantShow}
                    handleUpdatePlants={this.handleUpdatePlants}
                  />
                )} />
              <Route 
                path={"/the_pond"}
                render={props => (
                  <ThePond {...props}
                    header={this.classHeader}
                    footer={this.classFooter}
                    user={this.state.user}
                  />
                )} />
          </Switch>
        </BrowserRouter>
        <footer className={this.classFooter()}>
          <img className="footer-snail" src={snail}/>
          {this.backToTopButton()}
        </footer>
      </div>
    );
  }
}

export default withRouter(App)
