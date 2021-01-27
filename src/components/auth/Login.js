import React, { Component } from 'react';
import axios from 'axios'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
const LOCAL = 'http://localhost:3000'

class Login extends Component {

    state = {
        email: '', 
        password: '', 
        loginErrors: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { email, password } = this.state

        axios.post(`${LOCAL}/sessions`, {
            user: {
                email: email, 
                password: password
            }
        }, 
        { withCredentials: true }
        ).then(response => {
            if(response.data.logged_in){
                this.props.handleSuccessfulAuth(response.data)
            }
        }).catch(error => {
            console.log("login error", error)
        })
    }

    render() {
        return (
            <div className="login-div">
                <h1 className="h-login" >...or LOGIN</h1>
                <form className="reg-form" onSubmit={this.handleSubmit}>
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
                    <br></br>
                    <button className="login-btn" type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
