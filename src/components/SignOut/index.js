import React from 'react';
import Button from 'material-ui/Button';
import AreYouSure from '../ui/AreYouSure'

import { auth } from '../../firebase';

const SignOutButton = (props) =>
  <AreYouSure
    question='Are you sure you want to log out?'
    acceptBtn='Yes'
    cancelBtn='No'
    onAccept={auth.doSignOut}
  >
    <Button
      {...props}
      >
        Sign Out
      </Button>
  </AreYouSure>

export default SignOutButton;
