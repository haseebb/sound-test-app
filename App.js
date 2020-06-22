

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';


import BackgroundTimer from 'react-native-background-timer';
import SoundPlayer from 'react-native-sound'
import Tts from 'react-native-tts';







export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer:0,
      isSound:"true",
      interval:10,
    };
    
    }

    componentDidMount()
    {

      BackgroundTimer.start();

      BackgroundTimer.runBackgroundTimer(() => { 
        //code that will be called every 8 seconds 
      
        this.setState({timer:this.state.timer+1})
      

        if((this.state.timer % this.state.interval) == 0)
        {
          if(this.state.isSound == "false")
          {
          this.setState({isSound:"true"})

          SoundPlayer.setCategory('Ambient')
          var whoosh = new SoundPlayer(require('./interval_countdown.mp3'), (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // loaded successfully
          // Play the sound with an onEnd callback
          whoosh.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
      }

      else if( this.state.isSound == "true")
      {
        this.setState({isSound:"false"})
        Tts.setDucking(true);
        Tts.speak('Hello, world!');

      }
      }
      
        }, 
        1000);
    }

    TextChangeHandler=(value)=>{

      let interval  = parseInt(value);

      if(interval == 0)
      {
        interval = 10
      }
      this.setState({ interval: interval });
      }
  


  render(){
    return(

      <View style={styles.container}>

      <StatusBar barStyle="light-content" />

      <TextInput style={styles.textInput}
      onChangeText={this.TextChangeHandler}
      placeholder='Enter interval'>
      </TextInput>
      
      <Text style={styles.text}>Timer</Text>
      <Text style={styles.timer}>{this.state.timer}</Text>

      </View>
    )}
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  textInput:{
    height:50, 
    width:200,
    marginLeft:20,
    marginRight:20, 
    marginTop:30,
    marginBottom:30,
    backgroundColor:'#ffffff',
    padding:10,
  },
  text:{
    color:'#ffffff',
    fontSize:20
  },
  timer:{
    marginTop:10,
    color:'#ffffff',
    fontSize:50,
    fontWeight:'bold'
  }
  
});

