import axios from 'axios';
import React, { Component } from 'react';
import PlantImage from './ImageUploader'
import '../style/AddPlant.css'

const HEROKU = 'https://peaceful-varahamihira-8367f0.netlify.app'
const LOCAL = 'http://localhost:3000'

class AddPlant extends Component {

    constructor(props){
        super(props)
        this.state={
            user_id: null,
            user_icon: '',
            user_name: '',
            common_name: '', 
            plant_name: '', 
            personality: '', 
            insight: '', 
            story_notes: '', 
            difficulty: 1, 
            sunlight: 1, 
            moisture: 1, 
            image: null
        }
    }

    componentDidMount(){
        this.props.renderHeader()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {id, icon, username} = this.props.user

        const {common_name, plant_name, image, personality, insight, story_notes, monograph_id, difficulty, sunlight, moisture } = this.state

        let formData = new FormData()
        formData.append("user_id", id)
        formData.append("user_icon", icon)
        formData.append("user_name", username)
        formData.append("common_name", common_name)
        formData.append("plant_name", plant_name)
        formData.append("personality", personality)
        formData.append("insight", insight)
        formData.append("story_notes", story_notes)
        formData.append("difficulty", difficulty)
        formData.append("sunlight", sunlight)
        formData.append("moisture", moisture)
        formData.append("image", image)

        console.log(formData)
        
        fetch(`${LOCAL}/user_plants`, {
           method: 'POST',
           credentials: "include", 
           body: formData
        }).then(response => response.json())
        .then(data => {
            if(data.status === 'created'){
                // debugger
                console.log(data.user_plant)
                this.props.handleAddPlant(data.user_plant)
                this.props.history.push('/dashboard')
            }
        }).catch(error => {
            console.log("add plant error: ", error)
        })
    }
  
    setImageState = (data) => {
        console.log(data)
        this.setState({
            image: data[0]
        })
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
                    <label className="label" htmlFor="image_url">Attach a photo</label>
                    <PlantImage setImageState={this.setImageState} />
                    <br></br>
                    <label className="label" htmlFor="common_name">Common Name</label>
                    <input 
                        className="input"
                        name="common_name"
                        placeholder="Fiddle Leaf Fig"
                        onChange={this.handleChange}
                        required
                    />
                    <label className="label" htmlFor="plant_name">Has it got a name?</label>
                    <input 
                        className="input"
                        name="plant_name" 
                        placeholder="Figgy" 
                        onChange={this.handleChange}  
                    />
                    <br></br>
                    <textarea 
                        className="textarea"
                        name="personality" 
                        placeholder="Does it have a personality?" 
                        onChange={this.handleChange}  
                    />
                    <textarea 
                        className="textarea"
                        name="insight" 
                        placeholder="What's your best advice?" 
                        onChange={this.handleChange}  
                    />
                    <textarea 
                        className="textarea"
                        name="story_notes" 
                        placeholder="Is there a story behind it? Or any notes to add?" 
                        onChange={this.handleChange}  
                    />
                    <br></br>
                    <label className="label" htmlFor="difficulty"> Difficulty* </label>
                     <select className="select" name="difficulty" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <label className="label" htmlFor="sunlight"> Sunlight* </label>
                     <select className="select" name="sunlight" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <label className="label" htmlFor="moisture"> Moisture* </label>
                     <select className="select" name="moisture" onChange={this.handleChange}> 
                        <option name="1"> 1 </option>
                        <option name="2"> 2 </option>
                        <option name="3"> 3 </option>
                        <option name="4"> 4 </option>
                        <option name="5"> 5 </option>
                    </select>
                    <br></br>
                    <br></br>
                    <button className="add-plant-btn" type="submit"> Add Plant </button>
                    <p className="foot-note"> *Difficulty - 1 is easy, 5 is hard || *Sunlight - 1 is shady, 5 is full sun || *Moisture - 1 is dry, 5 is very wet </p>
                </form>
                <br></br>
                <button className="add-plant-dashboard-btn" onClick={() => this.dashboardClick()}> Dashboard </button>
            </div>
        );
    }
}

export default AddPlant;
