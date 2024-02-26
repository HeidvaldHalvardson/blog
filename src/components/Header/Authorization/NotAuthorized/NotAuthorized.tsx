import React from 'react'

import CustomLink from '../../../UI/CustomLink/CustomLink'
import Button from '../../../UI/Buttons/Button'

const NotAuthorized: React.FC = () => {
  return (
    <>
      <CustomLink to={'sign-in'}>
        <Button>Sign In</Button>
      </CustomLink>
      <CustomLink to={'sign-up'}>
        <Button type="green">Sign Up</Button>
      </CustomLink>
    </>
  )
}

export default NotAuthorized
