import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { ButtonGroup  } from 'react-native-elements'
import { ViajesEnCursoTab } from "./ViajesEnCurso";
import { ViajesTerminadosTab } from "./ViajesTerminados";

export class Viajes extends Component {
  static navigationOptions = {
    title: "Viajes"
  };

  state = {
    selectedIndex: 0,
  };

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  }

  render() {
    const buttons = ['Viajes en curso', 'Viajes completados']
    const { selectedIndex } = this.state

    return (<React.Fragment>
      <ScrollView> 
              <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 30, marginBottom:10}}
              />
              <TabManager  selectedIndex={selectedIndex}/>
              </ScrollView> 
            </React.Fragment>
    );
  }
}

function TabManager(props) {
  const selectedIndex = props.selectedIndex;
    if (selectedIndex === 0) {
      return (<ViajesEnCursoTab />);
    }
    return <ViajesTerminadosTab />;
  }
