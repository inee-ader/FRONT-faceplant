import React, { Component } from 'react';
import axios from 'axios'
import "../style/EditUser.css"

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
const LOCAL = 'http://localhost:3000'

class EditUser extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            password: '', 
            password_confirmation: '',
            registrationErrors: ''
        }
    }

    componentDidMount(){
        this.props.checkLoginStatus()
        this.props.renderHeader()
        this.setState({
            name: this.props.user.name, 
            username: this.props.user.username
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const {name, username, password, password_confirmation} = this.state
        const {id} = this.props.user

        axios.patch(`${LOCAL}/users/${id}`, {
            user: {
                name: name,
                username: username, 
                password: password, 
                password_confirmation: password_confirmation
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
            // make state app for error
            // have it post at the bottom of page in red. 
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
            <div className="edit-user-div">
                <div className="edit-user-form">
                    <form className="user-form" onSubmit={this.handleSubmit}>
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
                        <br></br>
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <label htmlFor="password_confirmation">Confirm</label>
                        <input
                            name="password_confirmation"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <button className="save-changes-btn" type="submit">Save Changes</button>
                    </form>
                </div>
                <button className="delete-user-btn" onClick={this.deleteUser}>Delete User</button>
            </div>
        );
    }
}

export default EditUser;
