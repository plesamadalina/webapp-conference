import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CONFERENCE_QUERY } from 'features/conference/gql/queries'
import { FakeText } from '@totalsoft/rocket-ui'
import { Grid, Typography, Card, CardContent, Button } from '@mui/material'
import { Event, LocationOn, Category, People, AccessTime } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { map } from 'ramda'

const ConferenceDetails = () => {
  const { id } = useParams()
  const { data, loading } = useQuery(CONFERENCE_QUERY, {
    variables: { id: parseInt(id) || -1, isNew: false }
  })

  const navigate = useNavigate()

  const handleBackButton = useCallback(() => {
    navigate(-1)
  }, [navigate])

  if (loading) {
    return <FakeText lines={10} />
  }

  const { conference } = data

  const startDateFormatted = new Date(conference.startDate).toLocaleString()
  const endDateFormatted = new Date(conference.endDate).toLocaleString()

  return (
    <>
      {/* Back Button */}
      <Grid container justifyContent='flex-start' alignItems='center' style={{ marginTop: '25px' }}>
        <Button
          variant='outlined'
          startIcon={<ArrowBackIcon />}
          onClick={handleBackButton}
          sx={{
            color: '#0099cc',
            borderColor: '#0099cc',
            '&:hover': { backgroundColor: '#0099cc', color: '#fff' },
            marginLeft: '10px'
          }}
        >
          Back
        </Button>
      </Grid>

      {/* Conference Name */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Typography variant='h4' gutterBottom>
                {conference.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Start Date */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Grid container alignItems='center'>
                <AccessTime fontSize='small' color='primary' style={{ marginRight: '4px' }} />
                <Typography variant='body1'>
                  <strong>Start Date:</strong> {startDateFormatted}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* End Date */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Grid container alignItems='center'>
                <Event fontSize='small' color='primary' style={{ marginRight: '4px' }} />
                <Typography variant='body1'>
                  <strong>End Date:</strong> {endDateFormatted}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Type */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Grid container alignItems='center'>
                <Category fontSize='small' color='primary' style={{ marginRight: '4px' }} />
                <Typography variant='body1'>
                  <strong>Type:</strong> {conference.type?.name}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Grid container alignItems='center'>
                <Category fontSize='small' color='primary' style={{ marginRight: '4px' }} />
                <Typography variant='body1'>
                  <strong>Category:</strong> {conference.category?.name}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Grid container alignItems='center'>
                <LocationOn fontSize='small' color='primary' style={{ marginRight: '4px' }} />
                <Typography variant='body1'>
                  <strong>Location:</strong> {conference.location?.name}, {conference.location?.city?.name},{' '}
                  {conference.location?.country?.name}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Speakers */}
        <Grid item xs={12}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                <People fontSize='small' color='primary' sx={{ marginRight: '10px', marginTop: '20px' }} /> Speakers:
              </Typography>
              {conference.speakers.map(speaker => (
                <Typography key={speaker.id} variant='body1'>
                  {speaker.name} - {speaker.nationality}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Attendees */}
        <Grid item xs={12}>
          <Card style={{ margin: '10px' }}>
            <CardContent>
              <Typography variant='h6'>Attendees:</Typography>
              {map(
                attendee => (
                  <Typography key={attendee.id}>{attendee.attendeeEmail}</Typography>
                ),
                conference.attendees
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ConferenceDetails
