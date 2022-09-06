import React, { Component } from 'react'
import EventService from '../services/EventService'

class ViewEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            event: {}
        }
    }

    componentDidMount(){
        EventService.getEventById(this.state.id).then( res => {
            this.setState({event: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Event Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Event Name: </label>
                            <div> { this.state.event.name }</div>
                        </div>
                        <div className = "row">
                            <label> Event Location: </label>
                            <div> { this.state.event.location }</div>
                        </div>
                        <div className = "row">
                            <label> Event Date: </label>
                            <div> { this.state.event.date }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEventComponent