import { Card, CardHeader, CardBody, CardFooter , Text} from '@chakra-ui/react'



export const CardPublicidadUser = ({ children }) => {
    const { name, description} = children[0];
    console.log(children);

  
    return (
        <Card>
        <CardBody>
            <Text>{name} {description}</Text>
        </CardBody>
        </Card>
    );
  };
