import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Container, Button, Text } from 'native-base';
// import { Font } from 'expo';
styles = require('./assets/stylesheet/Styles')

import Bikes from './components/Bikes'
import Maintenance from './components/Maintenance'
import Start from './components/Start'
import AddBike from './components/AddBike'

let fetchThis = 'https://roads.googleapis.com/v1/snapToRoads?path='

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      bikes: [],
      locations: [],
      holder: [],
      fetchThis: 'https://roads.googleapis.com/v1/snapToRoads?path='
    };
    this.getLocation = this.getLocation.bind(this);
  }

  showPosition = (position) => {
    this.setState({
      holder: this.state.holder + [position.coords.latitude, position.coords.longitude]
    });
    // console.log(this.state.holder);
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      // console.log("success!");
    } else {
      console.log('broken')
    }
  };

  async componentDidMount() {
    const locationResponse = await fetch(`${fetchThis}`)
    // console.log('internal fetch', fetchThis);
    const locationJSON = await locationResponse.json()
    // console.log("locationJSON", locationJSON);
    // this.setState({locations: locationJSON})
    // console.log(this.state.holder);

    //     // Font.loadAsync({
    //     //    'Font Awesome': require('./assets/fonts/fontawesome.ttf'),
    //     //    'Muli Light': require('./assets/fonts/Muli-Light.ttf'),
    //     //    'Muli Regular': require('./assets/fonts/Muli-Regular.ttf'),
    //     //  });
    //
    const bikeRes = await fetch('https://my-bike.herokuapp.com/bikes')
    const bikeJson = await bikeRes.json()

  this.setState({
    bikes: [
      ...bikeJson
    ],
    isLoading: false,
    locations: locationJSON
  })
}

// patch=(param)=>{
//     // fetch('https://my-bike.herokuapp.com/bikes', {
//     //   headers: {
//     //     'Accept': 'application/json',
//     //     'Content-Type': 'application/json'
//     //   },
//     //   method: 'POST',
//     //   body: JSON.stringify( {name: name, message: message})
//     // }).then(()=>{
//     //   fetch('https://my-bike.herokuapp.com/bikes')
//     //   .then((response) => response.json())
//     //   .then((responseJson) => {
//     //     this.setState({messages: responseJson, messageCount: responseJson.length, showCompose: !this.state.showCompose})
//     //   })
//     //   .catch((error) => {
//     //     console.error(error);
//     //   })
//     // })
//   console.log(param)
// }
// patch={ this.patch }


  render() {
    setTimeout(this.getLocation, 6000)
    return (

      this.state.isLoading ?
      <View><Text>Loading...</Text></View> :
      <View style={styles.container}>
        <Bikes
          bikes={ this.state.bikes }
        />
        <Text>{ this.state.holder }</Text>
      </View>

    );
  }
}
