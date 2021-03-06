import React from 'react'
import Icon from 'src/components/ui/Icon'
import usePersonQuery from 'src/sdk/person/usePersonQuery'
import { ButtonLink } from 'src/components/ui/Button'

const ButtonSignIn: React.FC = () => {
  const person = usePersonQuery()

  return (
    <ButtonLink
      data-fs-button-signin-link
      to={person?.id ? '/account' : '/login'}
      className="text__title-mini signin-link"
      variant="tertiary"
    >
      <Icon name="User" width={18} height={18} weight="bold" />
      <span>{person?.id ? 'My Account' : 'Sign In'}</span>
    </ButtonLink>
  )
}

export default ButtonSignIn
