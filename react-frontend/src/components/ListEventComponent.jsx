import React, { Component } from 'react'
import EventService from '../services/EventService'

class ListEventComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                events: []
        }
        this.addEvent = this.addEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    deleteEvent(id){
        EventService.deleteEvent(id).then( res => {
            this.setState({events: this.state.events.filter(event => event.id !== id)});
        });
    }
    viewEvent(id){
        this.props.history.push(`/view-event/${id}`);
    }
    editEvent(id){
        this.props.history.push(`/add-event/${id}`);
    }

    componentDidMount(){
        EventService.getEvents().then((res) => {
            this.setState({ events: res.data});
        });
    }

    addEvent(){
        this.props.history.push('/add-event/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Events List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEvent}> Add Event</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Event Name</th>
                                    <th> Event Location</th>
                                    <th> Event Date</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.events.map(
                                        event => 
                                        <tr key = {event.id}>
                                             <td> {event.name} </td>   
                                             <td> {event.location}</td>
                                             <td> {event.date}</td>
                                             <td>
                                                 <button onClick={ () => this.editEvent(event.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEvent(event.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEvent(event.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEventComponent