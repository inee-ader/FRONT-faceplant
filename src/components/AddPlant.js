import axios from 'axios';
import React, { Component } from 'react';
import PlantImage from './ImageUploader'

class AddPlant extends Component {

    state={
        user_id: this.props.user.id,
        common_name: '', 
        plant_name: '', 
        image_url: '', 
        personality: '', 
        insight: '', 
        story_notes: '', 
        // are these numbers going to be a string?
        monograph_id: '', 
        difficulty: '', 
        sunlight: '', 
        moisture: ''

    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { user_id, common_name, plant_name, image_url, personality, insight, story_notes, monograph_id, difficulty, sunlight, moisture } = this.state

        axios.post('http://localhost:3000/user_plants', {
            user_plant: {
                user_id: user_id, 
                user_fav: false, 
                // monograph_id: monograph_id, 
                common_name: common_name, 
                plant_name: plant_name,
                image_url: image_url, 
                personality: personality, 
                insight: insight, 
                story_notes: story_notes,
                difficulty: difficulty, 
                sunlight: sunlight, 
                moisture: moisture
            }
        }, 
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'created'){
                //not sure what to do here
                this.props.handleAddPlant(response.data)
            }
        }).catch(error => {
            console.log("add plant error", error)
        })
    }

    setImageState = (data) => {
        let url = data[0].name
        this.setState({
            image_url: url
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
                <h1>Add a plant!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="image_url"> Picture </label>
                    <PlantImage setImageState={this.setImageState} />
                    <label htmlFor="common_name"> Common Name </label>
                    <input 
                        name="common_name"
                        placeholder="Fiddle Leaf Fig"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="plant_name"> Has it got a nick name? </label>
                    <input 
                        name="plant_name" 
                        placeholder="Figgy" 
                        onChange={this.handleChange}  
                    />
                    <label htmlFor="personality"> Personality </label>
                    <textarea 
                        name="personality" 
                        placeholder="Judges me from the corner." 
                        onChange={this.handleChange}  
                    />
                    <label htmlFor="insight"> My top tip: </label>
                    <textarea 
                        name="insight" 
                        placeholder="Water from the bottom!" 
                        onChange={this.handleChange}  
                    />
                    <label htmlFor="story_notes"> Story/Notes </label>
                    <textarea 
                        name="story_notes" 
                        placeholder="Started from one cutting from my mother!" 
                        onChange={this.handleChange}  
                    />
                    <label htmlFor="difficulty"> Difficulty</label>
                     <select name="difficulty" onChange={this.handleChange}> 
                        <option name="1"> 1 - easy</option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 - hard</option>
                    </select>
                    <label htmlFor="sunlight"> Sunlight</label>
                     <select name="sunlight" onChange={this.handleChange}> 
                        <option name="1"> 1 - shade</option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 - full sun</option>
                    </select>
                    <label htmlFor="moisture"> Moisture</label>
                     <select name="moisture" onChange={this.handleChange}> 
                        <option name="1"> 1 - dry</option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 - moist</option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 - WET</option>
                    </select>
                    <button type="submit"> Add Plant </button>
                </form>
            </div>
        );
    }
}

export default AddPlant;
