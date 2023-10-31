import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

  
export const Alerta = ({ children }) => {
  const { name, posx, posy} = children[1];

    console.log(children);

  
    return (
        <div style={{ borderTop: '10px solid white', borderBottom: '10px solid white' }}>


        <Alert status='success'>
            <AlertIcon />
            Se ha añadido la planta {posx}
        </Alert>
        </div>

    );
  };
  
  
  