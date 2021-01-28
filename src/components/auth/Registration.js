import React, { Component } from 'react';
import axios from 'axios'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
const LOCAL = 'http://localhost:3000'

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

        axios.post(`${LOCAL}/registrations`, {
            user: {
                name: name,
                email: email, 
                password: password, 
                password_confirmation: password_confirmation, 
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
            <div className="registration-div">
                <div className="reg-div">
                    <h1 className="h-reg">REGISTER</h1>
                    <form className="reg-form" onSubmit={this.handleSubmit}>
                        <label className="label" htmlFor="name">Name</label>
                        <br></br>
                        <input 
                            className="input"
                            name="name"
                            placeholder="Sally Sue"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                        <br></br>
                        <label className="label" htmlFor="email">Email</label>
                        <br></br>
                        <input 
                            className="input"
                            type="email" 
                            name="email" 
                            placeholder="me@email.com" 
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <br></br>
                        <label className="label" htmlFor="password">Password</label>
                        <br></br>
                        <input 
                            className="input"
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <label className="label" htmlFor="password_confirmation"></label>
                        <input 
                            className="input"
                            type="password" 
                            name="password_confirmation" 
                            placeholder="confirm password" 
                            value={this.state.password_confirmation} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <button className="register-btn" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration;
