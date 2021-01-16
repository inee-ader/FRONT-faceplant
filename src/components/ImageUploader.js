import React from 'react';
import ImageUploader from 'react-images-upload';
 
class PlantImage extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { picture: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(url) {
        this.props.setImageState(url)
    }
 
    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Upload'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                singleImage={true}
            />
        );
    }
}

export default PlantImage