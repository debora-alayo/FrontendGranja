import { gql } from '@apollo/client';

export const COMMENTS_SUBSCRIPTION = gql`
  subscription NuevaPersona {
    nuevaPersona {
      edad
    }
  }

`;

