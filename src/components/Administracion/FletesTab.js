
import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Modal,  TouchableHighlight,  Alert, TextInput, ScrollView } from 'react-native'
import { Card, ListItem, Button, Overlay } from 'react-native-elements'
import { Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFletes, updateFlete } from "./FleteService";


export function FletesTab(props) {
  const [fletes, setFletes] = useState( [] );
  const [isVisible, setIsVisible] = useState( false );
  const [selectedFlete, setSelectedFlete] = useState( [] );

  
  
  useEffect( ()=>{
    const fetchData = async () => {
        const fletesFromApi = getFletes();
        fletesFromApi.then((fletes) => setFletes(fletes))  
    }

    fetchData();
  }, [])

  const setModalVisible = (visible, flete) => {
    
    setSelectedFlete([flete]);
    setIsVisible(visible);
  }

  keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => (
        <>
            <ListItem
            containerStyle={{backgroundColor: '#93d6e5', marginBottom:10}}
            key={item.trailer_id}
            title={item.placas}
            subtitle={item.capacidad_toneladas}
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
                    title="Agregar flete"
                    /> */}
                    
                </View>
                <View style={{display:'flex', alignItems:'center'}}>
                    <FlatList
                        style={{width:300}}
                        keyExtractor={keyExtractor}
                        data={fletes}
                        renderItem={_renderItem}
                    />
                </View>
                <ModalManager selectedFlete={selectedFlete} isVisible={isVisible} setModalVisible={setModalVisible}/>
            </>;
}


function MyModal(props) {
    const flete = props.selectedFlete[0];
    
    const [ placas, setPlacas ] = useState(flete.placas);
    const [ capacidad_toneladas, setCapacidad_toneladas ] = useState(flete.capacidad_toneladas);
/*     let image;
    try {
        image = require('../../assets/flete.jpg');
    } catch (error) {
        
    } */
    const handleUpdate = () => {
        updateFlete({...flete, placas, capacidad_toneladas})
    }

    const handleCapacityChange = (text) => {
      if(!isNaN(text)) setCapacidad_toneladas(+text)
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
                title={`${placas} `}
                >
                <Image source={{uri: 'https://www.shareicon.net/data/128x128/2016/04/24/754595_truck_512x512.png'}}
                style={{width: 240, height: 200, marginBottom:15, justifyContent: 'center',
                alignItems: 'center',}} />
                
                <Form style={{ marginBottom: 40 }} >
                    <Item floatingLabel>
                        <Label>Placas</Label>
                        <Input value={placas} onChangeText={(text) => setPlacas(text)}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Capacidad</Label>
                        <Input value={`${capacidad_toneladas}`} onChangeText={(text) => handleCapacityChange(text)}/>
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
      return <MyModal key={modalId} selectedFlete={props.selectedFlete} isVisible={props.isVisible} setModalVisible={props.setModalVisible}/>;
    }
