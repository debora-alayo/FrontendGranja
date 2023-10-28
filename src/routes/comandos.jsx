import React from 'react';
import { useQuery } from '@apollo/client';
import { Heading, HStack } from '@chakra-ui/react';

import { Layout } from '../layout/Layout';
import { LIST_PLAYERS } from '../api/players';
import { LIST_TEAMS } from '../api/teams';
import {MessageText} from '../components/MessageBox/'
import { Error, Loading } from '../components/Results'

function App() {
 

  const { loading, error, data } = useQuery(LIST_PLAYERS,{fetchPolicy: 'cache-and-network'});
  const { loading: loadingE, error: errorE, data: dataE} = useQuery(LIST_TEAMS,{fetchPolicy: 'cache-and-network'});

  if ( error) return <Layout> <Error /> </Layout>;
  if (loading) return <Layout> <Loading /> </Layout>;


  return (
      <Layout>
        
          <Heading align={'center'} size={'4xl'} m={30} >💚Granja💚</Heading>
                  
        
        <MessageText players = {data} teams = {dataE} />
        
      </Layout>
  );
}

export default App;
