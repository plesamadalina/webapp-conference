import { gql } from '@apollo/client'
import Fragments from './fragments'

export const CONFERENCE_LIST_QUERY = gql`
  query ConferenceList($userEmail: String!, $filters: ConferenceFilterInput) {
    conferenceList(userEmail: $userEmail, filters: $filters) {
      ...conference
      speakers {
        ...speaker
      }
      location {
        ...location
      }
      category {
        ...category
      }

      type {
        ...type
      }

      status(userEmail: $userEmail) {
        ...status
      }
    }
  }

  ${Fragments.conference}
  ${Fragments.speakers}
  ${Fragments.location}
  ${Fragments.category}
  ${Fragments.type}
  ${Fragments.status}
`
