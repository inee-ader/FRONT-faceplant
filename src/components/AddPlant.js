import React, { Component } from 'react';
import PlantImage from './ImageUploader'

class AddPlant extends Component {

    state={
        commonName: '', 
        nickName: '', 
        image_url: '', 
        personality: '', 
        insight: '', 
        storyNotes: '', 
        // are these numbers going to be strings?
        difficulty: '', 
        sunlight: '', 
        moisture: ''

    }

    setImageState = (url) => {
        this.setState({
            image_url: url
        })
    }

    render() {
        return (
            <div>
                <h1>Add a plant!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="image_url">Common Name</label>
                    <PlantImage setImageState={this.setImageState} />
                    <label htmlFor="commonName">Common Name</label>
                    <input 
                        name="commonName"
                        placeholder="Fiddle Leaf Fig"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="nickName">Has it got a nick name?</label>
                    <input 
                        name="nickName" 
                        placeholder="Figgy" 
                        onChange={this.handleChange}  
                    />
                    {/* <label htmlFor="password">Password</label>
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
                    /> */}
                    <button type="submit">Add Plant</button>
                </form>
            </div>
        );
    }
}

export default AddPlant;
