import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
import conferences from 'utils/mocks/conferences'
import { FakeText, IconButton } from '@totalsoft/rocket-ui'
import ConferenceList from './ConferenceList'
import { generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries'
import { useEmail } from 'hooks/useEmail'

const ConferenceListContainer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email] = useEmail()

  const handleAddClick = useCallback(() => {
    navigate('/conferences/new')
  }, [navigate])

  const [, setHeader] = useHeader()
  useEffect(() => () => setHeader(null), [setHeader])
  useEffect(() => {
    setHeader(
      <ConferenceHeader
        title={t('NavBar.Conferences')}
        actions={<IconButton type='add' key='addButton' title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [handleAddClick, setHeader, t])

  const [filters, setFilters] = useState(generateDefaultFilters())

  //const { data, loading } = { data: conferences, loading: false } // don't worry about it! it will make a lot more sense after GraphQL
  const { data, loading } = useQuery(CONFERENCE_LIST_QUERY, { variables: { filters, userEmail: email } })

  const handleApplyFilters = useCallback(filters => setFilters(filters), [])

  if (loading) {
    return <FakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList conferences={data?.conferenceList} />
    </>
  )
}

export default ConferenceListContainer
