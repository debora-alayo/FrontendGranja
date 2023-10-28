import { gql } from '@apollo/client';


export const GET_PERSONAS = gql`
    query {
      personas {
        id
        nombre
        edad
        ciudad
      }
    }
  `;


  export const GET_PLANTS = gql`
  query {
    plant {
      id
      name
      daysToGrow
      lifeExpectancy
      minHarvest
      maxHarvest
      description
    }
  }
`;



export const GET_FARMS = gql`
  query GetFarms($userId: ID!) {
    farms(userId: $userId) {
      id
      currentSize
      maxSize
      nextTier
      constructions {
        id
        plant {
          id
          name
        }
        isBuilt
        posX
        posY
        daysTillDone
        isWatered
      }
      
    }
  }
  `;

export const GET_CONSTRUCTIONS = gql`
  query {
    constructions {
      id
      farm {
        id
      }
      plant {
        id
        name
      }
      isBuilt
      posX
      posY
      daysTillDone
      isWatered
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
      email
      password
      farmId
    }
  }
`;

export const GET_ADS = gql`
  query {
    ads {
      name
      description
    }
  }
`;

