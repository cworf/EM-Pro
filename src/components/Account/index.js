import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import withData from '../Session/withData';

const AccountPage = ({ sessionStore, dataStore: {companyData} }) =>{
  const company = companyData.get('company')
  return (
    <div>
      <h1>Account: {sessionStore.authUser.email}</h1>
      <h2>{company.data().company_name}</h2>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}
const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  withData('/'),
  inject('sessionStore', 'dataStore'),
  observer
)(AccountPage);
