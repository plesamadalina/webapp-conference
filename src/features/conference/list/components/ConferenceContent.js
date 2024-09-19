import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import attendeeStatus from 'constants/attendeeStatus'
import { Alert, Grid } from '@mui/material'
import { Button, Typography, useToast } from '@totalsoft/rocket-ui'
import { AccessTime as ClockIcon } from '@mui/icons-material' // Import clock icon
import { useNavigate } from 'react-router-dom'

const ConferenceContent = props => {
  const { conference, onChangeAttendeeStatus } = props
  const { status, startDate, endDate, type, category } = conference
  const { t } = useTranslation()
  const noStatusSet = t('Conferences.StatusNotSet')
  const addToast = useToast()
  const navigate = useNavigate()

  // State to manage the countdown timer
  const [countdown, setCountdown] = useState(null)
  const [currentStatus, setCurrentStatus] = useState('')
  const [isConferencesStarted, setIsConferenceStarted] = useState(false)

  const showJoin = status?.id == attendeeStatus.Attended
  const showWithdraw = status?.id == attendeeStatus.Attended || status?.id == attendeeStatus.Joined
  const showAttend = status?.id == attendeeStatus.Withdrawn || !status

  const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
  const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })

  // Function to update the status based on time
  const updateStatus = () => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (now < start) {
      setCurrentStatus(t('Conferences.NotStarted'))
      setCountdown(start - now)
      setIsConferenceStarted(false)
    } else if (now >= start && now <= end) {
      setCurrentStatus(t('Conferences.Ongoing'))
      setCountdown(null)
      setIsConferenceStarted(true)
    } else {
      setCurrentStatus(t('Conferences.Ended'))
      setCountdown(null)
      setIsConferenceStarted(false)
    }
  }

  // Effect to handle countdown and status updates
  useEffect(() => {
    updateStatus()
    const interval = setInterval(updateStatus, 1000)

    return () => clearInterval(interval)
  }, [updateStatus])

  const handleJoinClick = useCallback(() => {
    if (!isConferencesStarted) {
      addToast(t('Conferences.CannotJoin'), 'error', { autoClose: 1000 })
      return
    }
    navigate(`/conferences/details/${conference.id}`)

    onChangeAttendeeStatus(conference?.id, attendeeStatus.Joined)()
  }, [isConferencesStarted, onChangeAttendeeStatus, conference, navigate, addToast, t])

  const handleDetail = useCallback(() => () => navigate(`/conferences/details/${conference.id}`), [navigate, conference.id])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {/* Display dynamic status */}
        <Typography variant='subtitle1' color='primary'>
          {currentStatus || status?.name || noStatusSet}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/* Display formatted start and end dates */}
        <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`${type?.name}, ${category?.name}`}</Typography>
      </Grid>
      {/* Display countdown if conference has not started */}
      {countdown !== null && (
        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
          <ClockIcon fontSize='small' style={{ marginRight: '4px' }} />
          <Typography variant='body2' color='primary'>
            {t('Conferences.StartsIn')} {Math.floor(countdown / 1000 / 60 / 60)}h:{Math.floor((countdown / 1000 / 60) % 60)}m:
            {Math.floor((countdown / 1000) % 60)}s
          </Typography>
        </Grid>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Join, Withdraw, and Attend buttons */}
          {showJoin && (
            <Button right color='success' size='small' onClick={handleJoinClick}>
              {t('Conferences.Join')}
            </Button>
          )}
          {showWithdraw && (
            <Button
              style={{ marginRight: '8px' }}
              right
              color='error'
              size='small'
              onClick={onChangeAttendeeStatus(conference?.id, attendeeStatus.Withdrawn)}
            >
              {t('Conferences.Withdraw')}
            </Button>
          )}
          {showAttend && (
            <Button
              style={{ marginRight: '8px' }}
              right
              color='info'
              size='small'
              onClick={onChangeAttendeeStatus(conference?.id, attendeeStatus.Attended)}
            >
              {t('Conferences.Attend')}
            </Button>
          )}
          <Button style={{ marginRight: '8px' }} right color='primary' size='small' onClick={handleDetail()}>
            {t('Details')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

ConferenceContent.propTypes = {
  conference: PropTypes.object.isRequired,
  onChangeAttendeeStatus: PropTypes.func.isRequired
}

export default ConferenceContent
