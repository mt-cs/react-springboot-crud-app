import React, { Component } from 'react'
import EventService from '../services/EventService';

class UpdateEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            location: '',
            date: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
    }

    componentDidMount(){
        EventService.getEventById(this.state.id).then( (res) =>{
            let event = res.data;
            this.setState({name: event.name,
                location: event.location,
                date : event.date
            });
        });
    }

    updateEvent = (e) => {
        e.preventDefault();
        let event = {name: this.state.name, location: this.state.location, date: this.state.date};
        console.log('event => ' + JSON.stringify(event));
        console.log('id => ' + JSON.stringify(this.state.id));
        EventService.updateEvent(event, this.state.id).then( res => {
            this.props.history.push('/events');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeLocationHandler= (event) => {
        this.setState({location: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({date: event.target.value});
    }

    cancel(){
        this.props.history.push('/events');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Event</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Location: </label>
                                            <input placeholder="Location" name="location" className="form-control" 
                                                value={this.state.location} onChange={this.changeLocationHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date: </label>
                                            <input placeholder="Date" name="date" className="form-control" 
                                                value={this.state.date} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEvent}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEventComponent