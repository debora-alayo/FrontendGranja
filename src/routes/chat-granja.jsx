import React, {useState , useRef} from 'react';
import { useQuery,  useApolloClient } from '@apollo/client'
import { useSubscription } from '@apollo/client'

import { Heading, Stack, Text } from '@chakra-ui/react'
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import { Layout } from '../layout/Layout'
import { GET_PERSONAS} from '../api/players'
import { GET_PLANTS, GET_ADS, GET_CONSTRUCTIONS, GET_FARMS, GET_USERS , GET_WEATHER} from '../api/players';
//import { LIST_TEAMS } from '../api/teams'
import {MessageText} from '../components/MessageBox/'
import { MessageChatUser } from '../components/MensajeChatUser';
import { CardPublicidadUser } from '../components/CardPublicidad';
import {Alerta} from '../components/Alerta'
import { Input } from 'react-chat-elements'

import {AD_SUBSCRIPTION } from '../api/subscriptions' // Define tu consulta de suscripción
import { Button } from 'react-chat-elements'




function App() {

  //const { dataSus } = useSubscription(CHAT_SUBSCRIPTION);
 

  //const { loading, error, data } = useQuery(LIST_PLAYERS,{fetchPolicy: 'cache-and-network'});
  //const { loading: loadingE, error: errorE, data: dataE} = useQuery(GET_PERSONAS);
  const { loading: loadingE, error: errorE, data: dataE } = useQuery(GET_FARMS, {
    variables: {
      userId: 1, // Reemplaza 1 con el valor del ID del usuario que deseas filtrar
    },
  });

  //console.log(dataE);

  const { loading: loadingC, error: errorC, data: dataC } = useQuery(GET_WEATHER, {
    variables: {
      city: "Arica", // Reemplaza 1 con el valor del ID del usuario que deseas filtrar
    },
  });
  console.log("CLIMA ",dataC);

  //if ( error) return <Layout> <Error /> </Layout>;
  //if (loading) return <Layout> <Loading /> </Layout>;

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

  
  if (errorE) {
    console.error("Error", errorE);
  }



  const [inputValue, setInputValue] = useState("");
  const inputReference = useRef(null);


  const [messages, setMessages] = useState([]);


  //const client = useApolloClient();

  //const inputReferance = React.createRef()
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  //addConstruction(farmId: ID!, plantId: ID!, isBuilt: Boolean!, posX: Int!, posY: Int!, daysTillDone: Int!, isWatered: Boolean!): Construction
  const sendMessage = () => {
    if (inputValue) {
      // Agrega el mensaje del usuario al estado local
      setMessages([...messages, { text: inputValue, user: 'Granjero' }]);
      setInputValue('');

      if (inputValue.toLowerCase() === "regar") {
        // Ejecutar acción para regar las plantas
        console.log("Regando las plantas...");
      } else if (inputValue.toLowerCase() === "cosechar") {
        // Ejecutar acción para cosechar
        console.log("Cosechando...");
      } else {
        // Mensaje genérico si no se reconoce la acción
        console.log("No entiendo el comando.");
      }
      
    }
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
                          console.log(dataE.getFarm),
                          <ul>
                            <p>Tamaño actual: {dataE.getFarm.currentSize}</p><p>Tamaño máximo: {dataE.getFarm.maxSize}</p><p>⏩ Siguiente nivel: {dataE.getFarm.nextTier}</p>
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
                        <Text>


                  
                        </Text>
                      </CardBody>
                    </Card>

                    <Card  variant='elevated'>
                      <CardHeader>
                        <Heading size='md'> 🌱 Plantas del usuario</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>***</Text>
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