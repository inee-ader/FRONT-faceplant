import axios from 'axios';
import React, { Component } from 'react';
import { __RouterContext } from 'react-router';
import PlantContainer from './PlantContainer'

const HEROKU = 'https://peaceful-varahamihira-8367f0.netlify.app'
const LOCAL = 'http://localhost:3000'

class UserShow extends Component {

    state = {
        userShowing: this.props.user
    }


    render() {
        const { username, headline, icon, user_plants} = this.props.user
        return (
            <div>
                <div>
                    <h2><img className="user-dashboard-icon" src={icon} />
                    {username}</h2>
                </div>
                <h2>{headline}</h2>
                <div className="dashboard-btn-div-bottom">
                    <button className="adore-btn" onClick={() => this.props.dashboardClick()}>Dashboard</button>
                    <button className="dashboard-btn" onClick={() => this.handleFeedClick()}>Greenhouse</button>
                </div>
                <div>
                    <h3>PLANT COLLECTION</h3>
                    <PlantContainer plants={user_plants}/>
                    
                </div>
            </div>
        );
    }
}

export default UserShow;
