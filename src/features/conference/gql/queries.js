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
  query conference($id: Int!, $isNew: Boolean!) {
    conference(id: $id) @skip(if: $isNew) {
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
    typeList {
      ...type
    }
    categoryList {
      ...category
    }
    cityList {
      ...city
    }
    countyList {
      ...county
    }
    countryList {
      ...country
    }
  }
  ${Fragments.conference}
  ${Fragments.type}
  ${Fragments.category}
  ${Fragments.detailedSpeaker}
  ${Fragments.detailedLocation}
  ${Fragments.city}
  ${Fragments.county}
  ${Fragments.country}
`

export const SPEAKERS_LIST_QUERY = gql`
  query SpeakerListQuery {
    speakerList {
      id
      name
      nationality
      rating
      phoneNumber
      isMainSpeaker
    }
  }
`
