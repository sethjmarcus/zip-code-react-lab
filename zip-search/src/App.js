import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div>
      {
        //JSON.stringify(props.data)
      }
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      Zip Code:
      <input type="text" onChange = {props.changeHandler}/>
    </div>
  );
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


class App extends Component {
  state = {
    zipCode : '',
    cities : []
  }
  
  zipChanged = (event) => {
    //console.log(event.target.value);
    this.setState({zipCode : event.target.value})
    //setSate is an async call.
    if(this.validZip(event.target.value)){
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
      .then((res) => res.json())
      .then((data) => this.state.cities.indexOf(data) === -1 ?  this.state.cities.push(data) : console.log("Already present"));
    }
    var unique = this.state.cities.filter(onlyUnique);
    console.log(unique)
  }
  

  /**
   * converts string to int. 
   * @param {*} zip, the zip code
   * @returns true if the zipcode is a positive number, and is of length 5
   */

  validZip = (zip) =>{
    const numZip = parseInt(zip);
    if(!Number.isInteger(numZip) || numZip < 0)
      return false;
    return zip.length === 5;
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode = {this.state.zipCode} changeHandler = {this.zipChanged}/>
        <div>
          Current Zip is {this.state.zipCode}
        </div>

        <div>
          {this.state.cities.map((city) => <City data={city}/>)}
        </div>
      </div>
    );
  }
}

export default App;
