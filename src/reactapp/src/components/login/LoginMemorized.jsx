import React from 'react';
import LoginFormManager from './components/LoginFormManager';
import { formikDataShape } from '../../utils/propTypes';

const LoginMemorized = React.memo(({ formikData }) => (
  <LoginFormManager formikData={formikData} />
));

LoginMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default LoginMemorized;
