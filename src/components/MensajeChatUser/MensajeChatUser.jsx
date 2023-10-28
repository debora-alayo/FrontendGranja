import 'react-chat-elements/dist/main.css'

import { MessageBox } from 'react-chat-elements';


export const MessageChatUser = ({ children }) => {
    const { user,text } = children[0];
    console.log(children);

  
    return (
        <MessageBox
            position={'right'}
            type = {'text'}
            text={text}
            
            
        /> 
    );
  };
  
  
  