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
export const CONFERENCE_QUERY = gql`
  query conference($id: int!, $isNew: Boolean!, $userEmail: String!) {
    conference(id: $id) @skip(if: $isNew) {
      ...conference
      speakers {
        ...detailedSpeaker
      }
      location {
        ...detailedLocation
      }
      type {
        ...type
      }
      category {
        ...category
      }
    }

    typeList {
      ...type
    }
    categoryList {
      ...categoryList
    }
    cityList {
      ...cityList
    }
    countryList {
      ...countryList
    }
    countyList {
      ...countyList
    }
  }

  ${Fragments.conference}
  ${Fragments.detailedSpeaker}
  ${Fragments.detailedLocation}
  ${Fragments.type}
  ${Fragments.category}
`
