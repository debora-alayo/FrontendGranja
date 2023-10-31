import { gql } from '@apollo/client';

export const AD_SUBSCRIPTION = gql`
  subscription NewAd {
    adAdded {
      name
      description
    }
  }

`;

export const PLANT_SUBSCRIPTION = gql`
  subscription NewPlant {
    plantAdded {
      name
      daysToGrow
      lifeExpectancy
      minHarvest
      maxHarvest
      description
    }
  }

`;



