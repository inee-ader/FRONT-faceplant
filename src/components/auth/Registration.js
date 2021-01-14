import React, { Component } from 'react';
import axios from 'axios'

class Registration extends Component {
    state = {
        name: '',
        email: '', 
        password: '', 
        password_confirmation: '', 
        username: '',
        headline: '',
        registrationErrors: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {name, email, password, password_confirmation, username, headline} = this.state

        axios.post('http://localhost:3001/registrations', {
            user: {
                name: name,
                email: email, 
                password: password, 
                password_confirmation: password_confirmation, 
                username: username, 
                headline: headline
            }
        }, 
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'created'){
                this.props.handleSuccessfulAuth(response.data)
            }
        }).catch(error => {
            console.log("registration error", error)
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
                <h1>REGISTRATION</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        name="name"
                        placeholder="Sally Sue"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="me@email.com" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="confirm password" 
                        value={this.state.password_confirmation} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        name="username"
                        placeholder="PlantLover69"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Registration;
