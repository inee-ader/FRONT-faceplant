import React, { Component } from 'react';
import axios from 'axios'


const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com/'
const LOCAL = 'http://localhost:3000'

class EditUser extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: props.user.name,
            username: props.user.username,
            headline: props.user.headline,
            registrationErrors: ''
        }
    }

    componentDidMount(){
        this.props.checkLoginStatus()
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const {name, username, headline} = this.state
        const {id} = this.props.user

        axios.patch(`${LOCAL}/users/${id}`, {
            user: {
                name: name,
                username: username, 
                headline: headline
            }
        }, 
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'updated'){
                this.props.userState(response.data.user)
                this.props.history.push("/dashboard")
            }
        }).catch(error => {
            console.log("registration error", error)
        })
    }
    
    deleteUser =() => {
        const {id} = this.props.user
        axios.delete(`${LOCAL}/users/${id}`)
        .then(response => {
            if(response.data.status === 'destroyed'){
                this.props.handleLogout()
                this.props.history.push("/")
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.user.username} Status: {this.props.loggedInStatus}</h1>
                <h1>EDIT USER</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input 
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    {/* <label htmlFor="headline">Headline</label>
                    <input 
                        name="headline"
                        value={this.state.headline}
                        onChange={this.handleChange}
                    /> */}
                    <button type="submit">Save Changes</button>
                </form>
                <button onClick={this.deleteUser}>Delete User</button>
            </div>
        );
    }
}

export default EditUser;
