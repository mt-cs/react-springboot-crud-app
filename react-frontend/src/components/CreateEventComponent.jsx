import React, { Component } from 'react'
import EventService from '../services/EventService';

class CreateEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            location: '',
            date: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.saveOrUpdateEvent = this.saveOrUpdateEvent.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EventService.getEventById(this.state.id).then( (res) =>{
                let event = res.data;
                this.setState({name: event.name,
                    location: event.location,
                    date : event.date
                });
            });
        }        
    }
    saveOrUpdateEvent = (e) => {
        e.preventDefault();
        let event = {name: this.state.name, location: this.state.location, date: this.state.date};
        console.log('event => ' + JSON.stringify(event));

        // step 5
        if(this.state.id === '_add'){
            EventService.createEvent(event).then(res =>{
                this.props.history.push('/events');
            });
        }else{
            EventService.updateEvent(event, this.state.id).then( res => {
                this.props.history.push('/events');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeLocationHandler= (event) => {
        this.setState({location: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }

    cancel(){
        this.props.history.push('/events');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Event</h3>
        }else{
            return <h3 className="text-center">Update Event</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
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
                                                value={this.state.date} onChange={this.changeDateHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEvent}>Save</button>
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

export default CreateEventComponent