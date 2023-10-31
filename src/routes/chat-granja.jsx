import React, {useState , useRef} from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Card, CardHeader, CardBody} from '@chakra-ui/react'

import { Layout } from '../layout/Layout'
import { GET_FARMS,  GET_WEATHER, ADD_PLANT} from '../api/players';
import { MessageChatUser } from '../components/MensajeChatUser';
import { CardPublicidadUser } from '../components/CardPublicidad';
import {Alerta} from '../components/Alerta'
import { Input } from 'react-chat-elements'
import { Button } from 'react-chat-elements'
import {AD_SUBSCRIPTION, PLANT_SUBSCRIPTION } from '../api/subscriptions'



function App() {

  //INFO GRANJA DEL USUARIO
  const { loading: loadingE, error: errorE, data: dataE } = useQuery(GET_FARMS, {
    variables: {
      userId: 1, // Reemplaza 1 con el valor del ID del usuario
    },
  });

  if (errorE) {
    console.error("Error", errorE);
  }


  //INFO CLIMA DEL USUARIO

  const { loading: loadingC, error: errorC, data: dataC } = useQuery(GET_WEATHER, {
    variables: {
      city: "Arica", // Reemplaza 1 con el valor del ID del usuario que deseas filtrar
    },
  });

  if (errorC) {
    console.error("Error", errorC);
  }



  //SUBSCRIPCION DE PUBLICIDAD

  const [publicidades, setPublicidades] = useState([]);

  const { loading, error, data } = useSubscription(
    AD_SUBSCRIPTION,{
      onData: (subscriptionData ) => {
        if (subscriptionData.data) {
          console.log(subscriptionData);
          const newAd = subscriptionData.data.data.adAdded;
          console.log(newAd);
          setPublicidades( publicidades => [...publicidades, newAd]);
        }
      }
    }
  );


  //SUBSCRIPCION DE PLANTAS

  const [plantas, setPlantas] = useState([]);

  const { loading: loadingP, error: errorP, data: dataP } = useSubscription(
    PLANT_SUBSCRIPTION,{
      onData: (subscriptionData ) => {
        if (subscriptionData.data) {
          console.log("PLANTAS",subscriptionData);
          const newPlant = subscriptionData.data.data.plantAdded;
          console.log("NUEVA PLANTA",newPlant);
          setPlantas( plantas => [...plantas, newPlant]);
        }
      }
    }
  );


  const [addPlant, { loading: loadingAP }] = useMutation(ADD_PLANT);

  const handleAddPlant = (name, posx, posy) => {
    addPlant({
      variables: {
        plantName: name,
        posX: posx,
        posY: posy,
        userId: 1,
      },
    })
      .then((result) => {
        console.log('Mutación exitosa:', result);
      })
      .catch((error) => {
        console.error('Error en la mutación:', error);
      });
  }; 

  
  
  //CHAT DEL USUARIO

  const [inputValue, setInputValue] = useState("");
  const inputReference = useRef(null);

  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessage = () => {
    if (inputValue) {
      setMessages([...messages, { text: inputValue, user: 'Granjero' }]);
      setInputValue('');

      if (inputValue.toLowerCase() === "regar") {
        console.log("Regando las plantas...");
      } else if (inputValue.toLowerCase().includes("añadirplanta")) {
        const messageParts = inputValue.toLowerCase().split(' ');
        if (messageParts.length === 4) {
          const [comando, plantName, posX, posY] = messageParts;
          handleAddPlant(plantName, parseInt(posX), parseInt(posY));

          console.log("Añadiendo la planta " + plantName + " en la posición " + posX + "," + posY);
      } else {
        console.log("No entiendo el comando.");
      }
      
    }
  };
  }

  // Estilos para la lista
  const listStyle = {
    listStyle: "none", // Puedes personalizar el tipo de punto
    paddingLeft: "0px",    // Ajusta la sangría
  };
  const listItemStyle = {
    background: `url('bullet.png') left center no-repeat`, // Usa tu imagen como marcador de lista
    paddingLeft: "0px",  // Ajusta la posición del texto
  };   


  return (
    <Layout>

      <Heading align={'center'} size={'4xl'} m={30}>
      🐑💚Granja💚🦆
      </Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <Box bg="green.100" p={4} borderRadius="md">

            <Stack spacing='5'>
              <Card  variant='elevated'>
                <CardHeader>
                  <Heading size='md'> Granja del Usuario</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    {dataE && dataE.getFarm ?  (
                      //console.log(dataE.getFarm),
                      <ul style={listStyle}>
                        <li style={listItemStyle}>Tamaño actual: {dataE.getFarm.currentSize}</li>
                        <li style={listItemStyle}>Tamaño máximo: {dataE.getFarm.maxSize}</li>
                        <li style={listItemStyle}>⏩ Siguiente nivel: {dataE.getFarm.nextTier}</li>
                      </ul>
                    ) : (
                      <p>No se encontraron granjas para este usuario.</p>
                    )}                
                  </Text>
                </CardBody>
              </Card>

              <Card  variant='elevated'>
                <CardHeader>
                  <Heading size='md'>🔨🪓 Construcciones del usuario 🧰 </Heading>
                </CardHeader>
                <CardBody>
                  <Text>***</Text>
                </CardBody>
              </Card>

              <Card  variant='elevated'>
                <CardHeader>
                  <Heading size='md'> 🌱 Plantas del usuario</Heading>
                </CardHeader>
                <CardBody>
                  <Text>***
                    {plantas.length > 0 ? (
                      plantas.map((planta, index) => (
                        <Alerta key={index}>{planta}</Alerta>
                      ))
                    ) : (
                      <p>No hay datos de plantas disponibles.</p>
                    )}
                  </Text>
                </CardBody>
              </Card>

              <Card  variant='elevated'>
                <CardHeader>
                  <Heading size='md'> ☀️ Clima para el usuario</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    {dataC && dataC.getWeather ?  (
                    <><p>🌡️ Temperatura del día: {dataC.getWeather.temperatura} [°C]</p><p> 💧 Mililitros de agua del día: {dataC.getWeather.precipitacion}</p></>
                    ) : (
                    <p>No hay clima para el usuario.</p>
                    )}
                  </Text>
                </CardBody>
              </Card>

              <Card>
                <CardBody>                                          
                  {publicidades.map((publicidad, index) => (
                    <CardPublicidadUser  key={index} > {publicidad}</CardPublicidadUser>
                  ))}                  
                </CardBody>
              </Card>
              
            </Stack>           

          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box bg="green.500" p={4} borderRadius="md">

            {messages.map((message, index) => (
              <MessageChatUser key={index}>{message} </MessageChatUser>
            ))}        
            
            <Input
              reference={inputReference}
              placeholder='Escribe tu comando aquí'
              multiline={true}
              value={inputValue}
              rightButtons={
              <Button 
              color='white' 
              backgroundColor='black' text='Send'  onClick={sendMessage}/>
              }
              onChange={handleInputChange}
            />
          
          </Box>
        </GridItem>
      </Grid>     
      
    </Layout>
    
  );
   
}

export default App;

  //MUTACION PLANTAS
  //ddPlant($userId: ID!, $plantName: String!, $posX: Int!, $posY: Int!) {

  /*const createPlant = (plantName, posX, posY) => {
    // Ejecuta la mutación con los datos proporcionados
    const [mutateCreatPlant] = useMutation(ADD_PLANT);
  
    mutateCreatPlant({
      variables: { plantName: plantName, posX: posX, posY: posY }, // Pasando el nombre del equipo como argumento
    })
      .then((result) => {
        // Aquí puedes manejar la respuesta exitosa de la mutación
        console.log('Equipo creado con éxito:', result);
      })
      .catch((error) => {
        // Aquí puedes manejar errores si la mutación falla
        console.error('Error al crear el equipo:', error);
      });
  };

  createPlant('Nombre de la planta', 10, 20);*/



  /*const [addPlant] = useMutation(ADD_PLANT);

  const handleAddPlant = () => {
    addPlant({
      variables: {
        name: "Papaya",
        description: "Papaya",
        userId: 1,
      },
    });
  };*/

  //mutacion

  /*const [addPlant, { loading: loadingAP }] =
    useMutation(ADD_PLANT);

  const handleAddPlant = (name, posx, posy) => {
    addPlant({
      variables: {
        plantName: name,
        posX: posx,
        posY: posy,
        userId: 1,
      },
    });
  }*/
