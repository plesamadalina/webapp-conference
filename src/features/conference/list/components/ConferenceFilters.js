import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Button, Card, DateTime } from '@totalsoft/rocket-ui'
import { generateDefaultFilters } from 'utils/functions'

const ConferenceFilters = props => {
  const { filters, onApplyFilters } = props
  const { t } = useTranslation()

  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)

  const defaultFilters = generateDefaultFilters()

  //verific daca am filtre aplicate
  const areFiltersApplied = startDate !== defaultFilters.startDate || endDate !== defaultFilters.endDate

  const handleApplyClick = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, endDate, startDate])
  const handleKeyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyClick(), [handleApplyClick])
  const handleResetClick = useCallback(() => {
    setStartDate(defaultFilters.startDate)
    setEndDate(defaultFilters.endDate)
  }, [defaultFilters])

  return (
    <>
      <Card icon={SearchIcon} iconColor='secondary' style={{ maxWidth: '600px', margin: 'auto' }}>
        <Grid container spacing={1} onKeyDown={handleKeyPressed} alignItems='center'>
          <Grid item xs={12} sm={6}>
            <DateTime
              label={t('Conferences.Filters.StartDate')}
              isClearable
              value={startDate}
              onChange={setStartDate}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTime
              label={t('Conferences.Filters.EndDate')}
              isClearable
              value={endDate}
              onChange={setEndDate}
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={1} style={{ margin: '8px', padding: '5px' }}>
        <Grid item>
          <Button size='small' color='primary' onClick={handleApplyClick}>
            {t('General.Buttons.ApplyFilters')}
          </Button>
        </Grid>
        {areFiltersApplied && (
          <Grid item>
            <Button size='small' color='primary' onClick={handleResetClick}>
              {t('General.Buttons.ResetFilters')}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  )
}

ConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default ConferenceFilters
