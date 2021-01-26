import axios from 'axios';
import React, { Component } from 'react';
import { __RouterContext } from 'react-router';
import PlantContainer from './PlantContainer'

const HEROKU = 'https://peaceful-varahamihira-8367f0.netlify.app'
const LOCAL = 'http://localhost:3000'

class UserShow extends Component {

    state = {
        userShowing: {}
    }

    componentDidMount(){
        this.checkUserState()
    }
    checkUserState = () => {
        let userId = this.props.location.pathname.split('/')[2]
        if(this.props.user){
            console.log("user props: ", this.props.user)
            this.setState({
                userShowing: this.props.user 
            })
        }else if(!this.state.userShowing){
            // fetch with axios
            axios.get(LOCAL + `/users/${userId}`)
            .then(response => {
                console.log("fetched user to show: ", response)
            })
        }
    }

    dashboardClick = () => {
        this.props.history.push("/dashboard")
    }
    handleFeedClick = () => {
        this.props.history.push("/feed")
    }

    render() {

        if(this.props.user === null){
            return null 
        }else{

            const { username, icon, user_plants} = this.state.userShowing
        
            return (
                <div>
                    <div>
                        <h2><img className="user-dashboard-icon" src={icon} />
                        {username}</h2>
                    </div>
                    <div className="dashboard-btn-div-bottom">
                        <button className="adore-btn" onClick={() => this.dashboardClick()}>Dashboard</button>
                        <button className="adore-btn" onClick={() => this.handleFeedClick()}>Greenhouse</button>
                    </div>
                    <div>
                        <h3>PLANT COLLECTION</h3>
                        <PlantContainer plants={this.state.userShowing.user_plants}/>

                    </div>
                </div>
                );
            }
        }
}


export default UserShow;
