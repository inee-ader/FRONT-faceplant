import axios from 'axios';
import React, { Component } from 'react';
import PlantImage from './ImageUploader'
import '../style/AddPlant.css'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
const LOCAL = 'http://localhost:3000'

class EditPlant extends Component {

    constructor(props){
        super(props)
        const {common_name, plant_name, image, personality, insight, story_notes, difficulty, sunlight, moisture, user_id, user_icon, user_name} = this.props.plant
        this.state={
            user_id: user_id,
            user_name: user_name,
            user_icon: user_icon,
            common_name: common_name, 
            plant_name: plant_name,  
            image: image, 
            personality: personality, 
            insight: insight, 
            story_notes: story_notes, 
            difficulty: difficulty, 
            sunlight: sunlight, 
            moisture: moisture
        }
    }

    componentDidMount(){
        this.setImageState()
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { common_name, plant_name, personality, insight, story_notes, difficulty, sunlight, moisture, image } = this.state

        let formData = new FormData()
    
        formData.append("common_name", common_name)
        formData.append("plant_name", plant_name)
        formData.append("personality", personality)
        formData.append("insight", insight)
        formData.append("story_notes", story_notes)
        formData.append("difficulty", difficulty)
        formData.append("sunlight", sunlight)
        formData.append("moisture", moisture)
        
        formData.append("image", image)

        fetch(`${LOCAL}/user_plants/${this.props.plant.id}`, {
            method: 'PATCH', 
            credentials: "include", 
            body: formData
        }).then(response => response.json())
        .then(data => {
            if(data.status === 'updated'){
                this.props.handleUpdatePlants(data.user_plant)
                this.props.history.push('/dashboard')
            }
        }).catch(error => {
            console.log("edit plant error: ", error)
        })
    }

    setImageState = (data) => {
       if(data){
           this.setState({
              image: data[0]
          })
       }else{
           this.setState({
               image: this.props.plant.image
           })
       }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    dashboardClick = () => {
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <div className="add-plant-form-div">
                <form className="add-plant-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="image_url"> Picture </label>
                    <PlantImage url={this.state.image} setImageState={this.setImageState} />
                    <br></br>
                    <label htmlFor="common_name"> Common Name </label>
                    <input 
                        value={this.state.common_name}
                        name="common_name"
                        placeholder="Fiddle Leaf Fig"
                        onChange={this.handleChange}
                        required
                    />
                    <label htmlFor="plant_name"> Has it got a nick name? </label>
                    <input 
                        value={this.state.plant_name}
                        name="plant_name" 
                        placeholder="Figgy" 
                        onChange={this.handleChange}  
                    />
                    <br></br>
                    {/* <label htmlFor="personality"> Personality </label> */}
                    <textarea 
                        value={this.state.personality}
                        name="personality" 
                        placeholder="Judges me from the corner." 
                        onChange={this.handleChange}  
                    />
                    {/* <label htmlFor="insight"> My best advice: </label> */}
                    <textarea 
                        value={this.state.insight}
                        name="insight" 
                        placeholder="Frequent misting." 
                        onChange={this.handleChange}  
                    />
                    {/* <label htmlFor="story_notes"> Story/Notes </label> */}
                    <textarea 
                        value={this.state.story_notes}
                        name="story_notes" 
                        placeholder="Where did it come from?" 
                        onChange={this.handleChange}  
                    />
                    <br></br>
                    <label htmlFor="difficulty">Difficulty</label>
                     <select value={this.state.difficulty} name="difficulty" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <label htmlFor="sunlight">Sunlight</label>
                     <select value={this.state.difficulty} name="sunlight" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <label htmlFor="moisture">Moisture</label>
                     <select value={this.state.difficulty} name="moisture" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <br></br>
                    <br></br>
                    <button className="add-plant-dashboard-btn" type="submit"> SaveChanges </button>
                    <p className="foot-note"> *Difficulty - 1 is easy, 5 is hard || *Sunlight - 1 is shady, 5 is full sun || *Moisture - 1 is dry, 5 is very wet </p>
                </form>
                <br></br>
                <button className="add-plant-dashboard-btn" onClick={() => this.dashboardClick()}> Dashboard </button>
            </div>
        );
    }
}

export default EditPlant;
