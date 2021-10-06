import React, { Component } from 'react';
import './App.css';


function ZipCode(props) {
  return (
    <div>
      {
        JSON.stringify(props.data)
      }
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div>
      City Name:
      <input type="text" onChange = {props.changeHandler}/>
    </div>
  );
}


class App extends Component {
  state = {
    cityName : '',
    zipCodes : []
  }
  
  cityChanged = (event) => {
    //console.log(event.target.value);
    this.setState({zipCode : event.target.value})
    //setSate is an async call.
    const currZip = event.target.value;
    //if(this.validZip(currZip)){
      fetch(`http://ctp-zip-api.herokuapp.com/city/${event.target.value}`)
      .then((res) => res.json())
      .then((data) => this.setState({zipCodes : data})); //this.state.zipCodes.indexOf(data) === -1 &&
    //}
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Name Search</h2>
        </div>
        <CitySearchField zipCode = {this.state.cityName} changeHandler = {this.cityChanged}/>
        <div>
          Current Zip is {this.state.cityName}
        </div>

        <div>
          {this.state.zipCodes.map((city) => <ZipCode data={city}/>)}
        </div>
      </div>
    );
  }
}

export default App;

