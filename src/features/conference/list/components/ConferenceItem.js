import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'
import { Card, useToast } from '@totalsoft/rocket-ui'
import ConferenceTitle from './ConferenceTitle'
import { useEmail } from 'hooks/useEmail'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useError } from 'hooks/errorHandling'
import { DELETE_CONFERENCE } from 'features/conference/gql/mutations'
import { t } from 'i18next'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries'
import { generateDefaultFilters } from 'utils/functions'

const ConferenceItem = props => {
  const { conference, onChangeAttendeeStatus } = props
  const navigate = useNavigate()
  const [email] = useEmail()
  const showError = useError()
  const addToast = useToast()
  const { name, organizerEmail, speakers, location, id } = conference
  const speaker = speakers.find(speaker => speaker.isMainSpeaker)
  const [filters, setFilters] = useState(generateDefaultFilters())

  const handleEdit = useCallback(() => navigate(`/conferences/${id}`), [navigate, id])

  const [deleteConference] = useMutation(DELETE_CONFERENCE, {
    onCompleted: () => addToast(t('General.DeletingSucceeded'), 'success', { autoClose: 1000 }),
    onError: showError,
    refetchQueries: [{ query: CONFERENCE_LIST_QUERY, variables: { filters, userEmail: email } }]
  })

  const handleDelete = useCallback(() => {
    deleteConference({ variables: { id } })
  }, [deleteConference, id])

  const title =
    email?.toUpperCase() === organizerEmail?.toUpperCase() ? (
      <ConferenceTitle title={name} onEdit={handleEdit} onDelete={handleDelete} />
    ) : (
      name
    )

  return (
    <Card title={title} subheader={<ConferenceSubtitle speaker={speaker} location={location} />}>
      <ConferenceContent conference={conference} onChangeAttendeeStatus={onChangeAttendeeStatus} />
    </Card>
  )
}

ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired,
  onChangeAttendeeStatus: PropTypes.func.isRequired
}

export default ConferenceItem
