import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';

const SERVER_URL = "http://localhost:4000/flights.json"

class FlightsForm extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
    }

    this._handleInputOrigin = this._handleInputOrigin.bind(this);
    this._handleInputDestination = this._handleInputDestination.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleInputOrigin(e) {
    this.setState({ origin: e.target.value });
  }

  _handleInputDestination(e) {
    this.setState({ destination: e.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit( this.state.origin, this.state.destination );
    this.setState({ origin: '', destination: '' });
  }

  // fetchFlights function
    // takes 2 arguments - origin query, destination query
    //

  render() {
    return (
      <div>
        <h2>Search For A Flight:</h2>
        <form onSubmit={ this._handleSubmit }>
          <input type="text" placeholder="from" required onInput={ this._handleInputOrigin } />
          <input type="text" placeholder="to" required onInput={ this._handleInputDestination } />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

class FlightsResults extends Component {
  render() {
    return (
      <div>
        { this.props.flights.map( (flight) => <p key={ flight.id }>{ flight.date }, { flight.number }, { flight.origin } to { flight.destination }</p> )}
      </div>
    );
  }
}

class Flights extends Component {
  constructor() {
    super();
    this.state = {
      flights: [],
    }
    this.fetchFlights = this.fetchFlights.bind(this);
  }

  fetchFlights(origin, destination) {
    axios.get(SERVER_URL).then( (results) => {
      let flightsMatch = [];

      for (var i = 0; i < results.data.length; i++) {
        let currentFlight = results.data[i]
        if (currentFlight.origin === origin && currentFlight.destination === destination) {
          this.setState({ flights: [...this.state.flights, currentFlight] });
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
        <FlightsForm onSubmit={ this.fetchFlights }/>
        <FlightsResults flights={ this.state.flights }/>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }
}

export default Flights;
