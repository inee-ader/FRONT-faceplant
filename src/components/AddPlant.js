import React, { Component } from 'react';

class AddPlant extends Component {

    state={
        commonName: '', 
        plantName: '', 
        
    }

    render() {
        return (
            <div>
                <h1>Add a plant!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="plant-image">Common Name</label>
                    <input 
                        name="plant-image"
                        placeholder="figgy.jpg"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="common-name">Common Name</label>
                    <input 
                        name="common-name"
                        placeholder="Fiddle Leaf Fig"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="plant-name">Has it got a name?</label>
                    <input 
                        name="plant-name" 
                        placeholder="Figgy" 
                        onChange={this.handleChange}  
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        // value={this.state.password} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <label htmlFor="password_confirmation"></label>
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="confirm password" 
                        // value={this.state.password_confirmation} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <button type="submit">Add Plant</button>
                </form>
            </div>
        );
    }
}

export default AddPlant;
