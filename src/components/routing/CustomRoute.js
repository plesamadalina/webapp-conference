import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Container } from './CustomRouteStyle'
import { getOidcConfigName } from 'utils/functions'
import { withOidcSecure } from '@axa-fr/react-oidc'

function PrivateRoute({ component: Component }) {
  const SecuredComponent = useMemo(() => withOidcSecure(Component, undefined, undefined, getOidcConfigName()), [Component])

  return <SecuredComponent />
}

PrivateRoute.propTypes = {
  component: PropTypes.func
}

function CustomRoute({ isPrivate = true, component: Component, ...props }) {
  return <Container>{isPrivate ? <PrivateRoute component={Component} {...props} /> : <Component />}</Container>
}

CustomRoute.propTypes = {
  component: PropTypes.func,
  isPrivate: PropTypes.bool,
  fullWidth: PropTypes.bool
}

export default CustomRoute
