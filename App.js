/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import { Divider  } from 'react-native-elements'
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
  createMaterialTopTabNavigator
} from "react-navigation"; // Version can be specified in package.json
import { SignIn } from "./src/components/SignIn";
import { Viajes } from "./src/components/Viajes/Viajes";
import { Administracion } from "./src/components/Administracion/Administracion";


const MainStack = createMaterialTopTabNavigator(
  {
    Administracion: {
      screen: Administracion
    },
    Viajes: {
      screen: Viajes
    }
  },
  {
    initialRouteName: 'Viajes',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    SignIn: {
      screen: SignIn
    },
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
