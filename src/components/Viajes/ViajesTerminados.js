
import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Modal,  TouchableHighlight,  Alert, TextInput, ScrollView } from 'react-native'
import { Card, ListItem, Button, Overlay } from 'react-native-elements'
import { Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getViajesTerminados } from "./ViajesService";



export function ViajesTerminadosTab(props) {
  const [viajeCurso, setViajeCurso] = useState( [] );
  const [isVisible, setIsVisible] = useState( false );
  const [selectedViaje, setSelectedViaje] = useState( [] );

  
  
    useEffect( ()=>{
    const fetchData = async () => {
        const viajesCursoFromApi = getViajesTerminados();
        viajesCursoFromApi.then((viajeCurso) => setViajeCurso(viajeCurso))  
    }

    fetchData();
  }, []);  

  const setModalVisible = (visible, viajeCurso) => {
    
    setSelectedViaje([viajeCurso]);
    setIsVisible(visible);
  }

  keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => (
        <>
            <ListItem
            containerStyle={{backgroundColor: '#93d6e5', marginBottom:10}}
            key={item.trailer_id}
            title={item.nombreCompleto}
            subtitle={item.fecha_entrada}
            leftIcon={{ name: 'beenhere' }}
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
                    title="Agregar viajeCurso"
                    /> */}
                    
                </View>
                <View style={{display:'flex', alignItems:'center'}}>
                    <FlatList
                        style={{width:300}}
                        keyExtractor={keyExtractor}
                        data={viajeCurso}
                        renderItem={_renderItem}
                    />
                </View>
                <ModalManager selectedViaje={selectedViaje} isVisible={isVisible} setModalVisible={setModalVisible}/>
            </>;
}


function MyModal(props) {
    const viajeCurso = props.selectedViaje[0];
    
    /*     let image;
    try {
        image = require('../../assets/viajeCurso.jpg');
    } catch (error) {
        
    } */
    const handleUpdate = () => {
        updateFlete({...viajeCurso, estado_actual})
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
                title={`${viajeCurso.cliente} `}
                containerStyle={{width: 300}}
                >
                
                <Form style={{ marginBottom: 40 }} >
                    <Item floatingLabel disabled>
                        <Label >Nombre de conductor:</Label>
                        <Input disabled value={viajeCurso.nombreCompleto}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Cliente:</Label>
                        <Input disabled value={viajeCurso.cliente}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Trailer:</Label>
                        <Input disabled value={viajeCurso.placas}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Fecha de salida</Label>
                        <Input disabled value={viajeCurso.fecha_salida}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Fecha de entrada</Label>
                        <Input disabled value={viajeCurso.fecha_entrada}/>
                    </Item>
                </Form>
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
      return <MyModal key={modalId} selectedViaje={props.selectedViaje} isVisible={props.isVisible} setModalVisible={props.setModalVisible}/>;
    }
