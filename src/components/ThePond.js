import React, { Component } from 'react';

import '../style/ThePond.css'

class ThePond extends Component {

    componentDidMount () {
        this.props.header()
        this.props.footer()
        this.props.renderHeader()
    }
    dashboardClick = () => {
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <div className="the-pond-wrapper">
                <div className="the-pond-div">
                </div>
                    <div className="pond-dash-btn-div">
                        <button onClick={()=>this.dashboardClick()} className="pond-dash-btn">Dashboard</button>
                    </div>
            </div>
        );
    }
}

export default ThePond;
