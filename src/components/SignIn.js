import React from "react";
import { Text, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from "../../App";
export class SignIn extends React.Component {
  render() {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ ...styles.welcome, marginBottom: 60 }}>Bienvenido a Fletes Montemayor</Text>
      <Input placeholder='Usuario' leftIcon={<Icon name='user' size={24} color='black' />} />
      <Input placeholder='Contrasena' leftIcon={<Icon name='lock' size={24} col or='black' />} containerStyle={{ marginBottom: 60 }} />
      <Button onPress={() => this.props.navigation.navigate("Administracion")} icon={<Icon name="sign-in" size={15} color="white" />} title="  Entrar" buttonStyle={{ minWidth: 150, marginBottom: 30 }} />
      <Button onPress={() => this.props.navigation.navigate("Administracion")} title="Olvide contrasena" buttonStyle={{ minWidth: 150 }} />
    </View>);
  }
}
