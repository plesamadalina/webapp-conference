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

export const CHANGE_ATTENDANCE_STATUS = gql`
  mutation changeAttendeeStatus($input: AttendeeInput!) {
    changeAttendeeStatus(input: $input)
  }
`

export const DELETE_CONFERENCE = gql`
  mutation deleteConference($id: Int!){
    deleteConference(id: $id)
  }

`
