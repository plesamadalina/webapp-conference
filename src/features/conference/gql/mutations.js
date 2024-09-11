import { gql } from '@apollo/client'
import Fragments from './fragments'

export const UPDATE_CONFERENCE = gql`
  mutation saveConference($input: ConferenceInput!) {
    saveConference(input: $input) {
      ...conference
      type {
        ...type
      }
      category {
        ...category
      }
      location {
        ...detailedLocation
      }
      speakers {
        ...detailedSpeaker
      }
    }
  }

  ${Fragments.conference}
  ${Fragments.detailedSpeaker}
  ${Fragments.detailedLocation}
  ${Fragments.type}
  ${Fragments.category}
`
