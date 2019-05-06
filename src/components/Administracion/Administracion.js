import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import { ButtonGroup  } from 'react-native-elements'
import { FletesTab } from "./FletesTab";
import { ConductoresTab } from "./ConductoresTab";

export class Administracion extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Administracion",
    };
  };
  state = {
    selectedIndex: 0,
  };

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  }

  render() {
    const buttons = ['Fletes', 'Conductores']
    const { selectedIndex } = this.state
    return (
            <React.Fragment>
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
const selectedIndex2 = props.selectedIndex;
  if (selectedIndex2 === 0) {
    return <FletesTab />;
  }
  return <ConductoresTab />;
}


