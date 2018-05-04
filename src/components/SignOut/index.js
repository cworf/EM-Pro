import React from 'react';
import Button from 'material-ui/Button';

import { auth } from '../../firebase';

const SignOutButton = (props) =>
  <Button variant='raised'
    color='primary'
    type="button"
    onClick={auth.doSignOut}
    {...props}
  >
    Sign Out
  </Button>

export default SignOutButton;
