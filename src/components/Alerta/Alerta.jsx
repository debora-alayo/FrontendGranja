import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

  
export const Alerta = ({ children }) => {
    const { edad } = children;
    console.log(children);

  
    return (
        <div style={{ borderTop: '10px solid white', borderBottom: '10px solid white' }}>


        <Alert status='success'>
            <AlertIcon />
            {edad}
        </Alert>
        </div>

    );
  };
  
  
  