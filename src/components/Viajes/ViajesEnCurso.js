
import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Modal,  TouchableHighlight,  Alert, TextInput, ScrollView } from 'react-native'
import { Card, ListItem, Button, Overlay } from 'react-native-elements'
import { Form, Item, Input, Label } from 'native-base';
import { getViajesEnCurso,cerrarViaje } from "./ViajesService";
import Icon from 'react-native-vector-icons/FontAwesome';


export function ViajesEnCursoTab(props) {
  const [viajeCurso, setViajeCurso] = useState( [] );
  const [isVisible, setIsVisible] = useState( false );
  const [selectedViaje, setSelectedViaje] = useState( [] );

  
  
   useEffect( ()=>{
    const fetchData = async () => {
        const viajesCursoFromApi = getViajesEnCurso();
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
            subtitle={`${item.cliente}, ${item.ciudad}, ${item.estado}`}
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
    
    const [ estado_actual, setEstadoActual ] = useState(viajeCurso.estado_actual);
/*     let image;
    try {
        image = require('../../assets/viajeCurso.jpg');
    } catch (error) {
        
    } */
    const handleClose = (trailer_id, conductor_id) => {
        cerrarViaje(trailer_id, conductor_id)
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
                title={`${viajeCurso.estado_actual} `}
                containerStyle={{width: 300}}
                >
                
                <Form style={{ marginBottom: 40 }} >
                    <Item floatingLabel last>
                        <Label style={{color:'red'}}>Estado actual</Label>
                        <Input value={estado_actual} onChangeText={(text) => setEstadoActual(text)}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Tipo Carga</Label>
                        <Input disabled value={viajeCurso.tipo_carga}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Cliente</Label>
                        <Input disabled value={viajeCurso.cliente}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Estado</Label>
                        <Input disabled value={viajeCurso.estado}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Municipio</Label>
                        <Input disabled value={viajeCurso.ciudad}/>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label >Calles</Label>
                        <Input disabled value={viajeCurso.direccion}/>
                    </Item>
                </Form>
                    <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#d78c41'}}
                    title='TERMINAR' onPress={() => {props.setModalVisible(!props.isVisible); handleClose(viajeCurso.trailer_id, viajeCurso.conductor_id)}}/>
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
