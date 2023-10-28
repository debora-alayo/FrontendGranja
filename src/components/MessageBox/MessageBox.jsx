import 'react-chat-elements/dist/main.css'

import { MessageBox } from 'react-chat-elements';


export const MessageText = ({ children }) => {
    const { edad } = children;

  
    return (
        <MessageBox
            position={'right'}
            type = {'text'}
            text={edad}
            
            
        /> 
    );
  };
  
  
  