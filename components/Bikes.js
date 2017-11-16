import React from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native'
import Header from './Header'
import Start from './Start'
import Maintenance from './Maintenance'

const Bikes = (props) => {
console.log(props.bikes)
  return (

    <View style={ styles.background }>

      <Header />
      <Start />
      <Maintenance bikes={ props.bikes }/>


    </View>

  )

}

export default Bikes
