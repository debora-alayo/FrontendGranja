import { gql } from '@apollo/client';

export const AD_SUBSCRIPTION = gql`
  subscription NewAd {
    adAdded {
      name
      description
    }
  }

`;

