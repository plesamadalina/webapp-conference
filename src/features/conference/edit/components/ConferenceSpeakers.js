import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Thead } from 'react-super-responsive-table'
import { useTranslation } from 'react-i18next'
import ConferenceSpeakerData from './ConferenceSpeakerData'
import { Autocomplete, Grid, TextField } from '@mui/material'
import { Table, Tbody, Th, ThCenteredButton, Tr } from 'components/common/dataDisplay/SuperResponsiveTableStyled'
import { makeStyles } from 'tss-react/mui'
import tableStyles from 'assets/jss/components/tableStyle'
import { useQuery } from '@apollo/client'
import { SPEAKERS_LIST_QUERY } from 'features/conference/gql/queries'

const useStyles = makeStyles()(tableStyles)

const ConferenceSpeakers = props => {
  const { speakers = [], dispatch } = props
  const { t } = useTranslation()
  const { classes } = useStyles()
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)

  //fetch existing speaker
  const { data: speakersData, loading: loadingSpeakers } = useQuery(SPEAKERS_LIST_QUERY)

  const handleSpeakerChange = useCallback(
    (event, value) => {
      if (!value) return
      dispatch({ type: 'addExistingSpeaker', payload: value })
    },
    [dispatch]
  )

  const getOptionLabel = useCallback(option => option.name, [])

  const renderInput = useCallback(params => <TextField {...params} label={t('Speaker.SelectExisting')} />, [t])
  return (
    <Grid>
      <Autocomplete
        options={speakersData?.speakerList || []}
        getOptionLabel={getOptionLabel}
        loading={loadingSpeakers}
        onChange={handleSpeakerChange}
        renderInput={renderInput}
      />

      <Table>
        <Thead>
          <Tr>
            <Th>{t('Speaker.Name')}</Th>
            <Th>{t('Speaker.Nationality')}</Th>
            <Th>{t('Speaker.Rating')}</Th>
            <Th>{t('Speaker.PhoneNumber')}</Th>
            <Th>{t('Speaker.MainSpeaker')}</Th>
            <ThCenteredButton />
          </Tr>
        </Thead>
        <Tbody>
          {speakers?.map((speaker, index) => (
            <ConferenceSpeakerData key={speaker?.id} speaker={speaker} index={index} dispatch={dispatch} />
          ))}
        </Tbody>
      </Table>
    </Grid>
  )
}

ConferenceSpeakers.propTypes = {
  speakers: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  selectedSpeaker: PropTypes.object,
  setSelectedSpeaker: PropTypes.func.isRequired,
  speakersData: PropTypes.object,
  loadingSpeakers: PropTypes.bool
}

export default ConferenceSpeakers
