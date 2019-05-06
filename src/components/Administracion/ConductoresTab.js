import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Modal,  TouchableHighlight,  Alert, TextInput, ScrollView } from 'react-native'
import { Card, ListItem, Button, Overlay } from 'react-native-elements'
import { Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getConductores, updateConductor } from "./ConductorService";


export function ConductoresTab(props) {
  const [conductores, setConductores] = useState( [] );
  const [isVisible, setIsVisible] = useState( false );
  const [selectedConductor, setSelectedConductor] = useState( [{
    id: 1,
   nombre: 'brynn',
   apellidos: 'Valdez Chavez',
   dia_nacimiento: '1970-11-05',
   genero: 'M'
}] );

  
  
  useEffect( ()=>{
    const fetchData = async () => {
        const usersFromApi = getConductores();
        usersFromApi.then((users) => setConductores(users))  
    }

    fetchData();
  }, [])

  const setModalVisible = (visible, conductor) => {
    
    setSelectedConductor([conductor]);
    setIsVisible(visible);
  }

  keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => (
        <>
            <ListItem
            containerStyle={{backgroundColor: '#93d6e5', marginBottom:10}}
            key={item.conductor_id}
            title={item.nombre}
            subtitle={item.apellidos}
            leftIcon={{ name: 'account-circle' }}
            rightIcon={{ name: 'arrow-forward' }}
            onPress={() => {
                setModalVisible(true, item);
            }}
            />
        </>
  )

  return  <>
                <View style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {/* <Button
                    icon={
                        <Icon
                        name="plus"
                        size={15}
                        color="white"
                        
                        style={{marginLeft:5, paddingTop:2}}
                        />
                    }
                    iconRight
                    containerStyle={{marginBottom:10, width: 175}}
                    
                    buttonStyle={{backgroundColor:'#a3dce9'}}
                    title="Agregar conductor"
                    /> */}
                    
                </View>
                <View style={{display:'flex', alignItems:'center'}}>
                    <FlatList
                        style={{width:300}}
                        keyExtractor={keyExtractor}
                        data={conductores}
                        renderItem={_renderItem}
                    />
                </View>
                <ModalManager selectedConductor={selectedConductor} isVisible={isVisible} setModalVisible={setModalVisible}/>
            </>;
}


function MyModal(props) {
    const conductor = props.selectedConductor[0];
    
    const [ nombre, setNombre ] = useState(conductor.nombre);
    const [ apellidos, setApellidos ] = useState(conductor.apellidos);
    let image;
    try {
        image = require('../../assets/flete.jpg');
    } catch (error) {
        
    }
    const handleUpdate = () => {
        updateConductor({...conductor, nombre, apellidos})
    }
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={props.isVisible}
          onRequestClose={() => {
            /* Alert.alert('Modal has been closed.'); */
            props.setModalVisible(!props.isVisible);
          }}>
          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(163,220,233,0.5)'}}>
                <ScrollView>
                <Card
                title={`${nombre} ${apellidos}`}
                >
                <Image source={{uri: 'http://pngimages.net/sites/default/files/user-png-image-79267.png'}}
                style={{width: 240, height: 200, marginBottom:15, justifyContent: 'center',
                alignItems: 'center',}} />
                
                <Form style={{ marginBottom: 40 }} >
                    <Item floatingLabel>
                        <Label>Nombre</Label>
                        <Input value={nombre} onChangeText={(text) => setNombre(text)}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Apellidos</Label>
                        <Input value={apellidos} onChangeText={(text) => setApellidos(text)}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Nacimiento</Label>
                        <Input disabled value={conductor.dia_nacimiento}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Sexo</Label>
                        <Input disabled value={conductor.sexo}/>
                    </Item>
                </Form>
                <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#a3dce9', marginBottom:15}}
                    title='ACTUALIZAR' onPress={handleUpdate}/>
                    <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#eb5e25'}}
                    title='ELIMINAR' />
                </Card>
                </ScrollView>
          </View>
        </Modal>
    );
}

function ModalManager(props) {
    const selectedIndex2 = props.isVisible;
    const [modalId, setModalId] = useState(1);

      if (selectedIndex2 === false) {
        return <></>;
      }
      return <MyModal key={modalId} selectedConductor={props.selectedConductor} isVisible={props.isVisible} setModalVisible={props.setModalVisible}/>;
    }

const users = [
    {
        id: 1,
       nombre: 'Alan',
       apellidos: 'Valdez Chavez',
       dia_nacimiento: '1997-01-10',
       genero: 'M'
    },
    {
        id: 2,
        nombre: 'Jose',
        apellidos: 'Sanchez',
        dia_nacimiento: '1970-12-05',
        genero: 'M'
     },

];
