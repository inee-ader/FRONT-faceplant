import React from 'react';
import ImageUploader from 'react-images-upload';
 
class PlantImage extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { picture: [] };
         this.onDrop = this.onDrop.bind(this);
    }
    componentDidMount () {
        if(this.props.url){
            this.setState({
                picture: this.props.url
            })
        }else{
            null
        }
    }
    
    onDrop(data) {
        this.props.setImageState(data)
    }
 
    render() {
        return (
            <ImageUploader
                className="image-uploader"
                withIcon={true}
                buttonText='Upload'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
                label='Max file size: 5mb as .jpg or .png'
            />
        );
    }
}

export default PlantImage