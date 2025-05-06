import React from 'react';
import { bool, func, shape } from 'prop-types';

import Button from '../../common/Button';
import { __ } from '../../../i18n';

import useStageContext from '../../../hook/useStageContext';

function SaveButton({ actions, isFormValid }) {
  const { updateCheckoutStep } = useStageContext();

  const handleSave = () => {
    actions.saveAddress();
    updateCheckoutStep();
  };

  return (
    <Button
      variant="primary"
      size="lg"
      disable={!isFormValid}
      click={handleSave}
    >
      {__('Save and Continue')}
    </Button>
  );
}

SaveButton.propTypes = {
  isFormValid: bool,
  actions: shape({
    saveAddress: func,
  }),
};

SaveButton.defaultProps = {
  isFormValid: false,
  actions: {
    saveAddress: () => {},
  },
};

export default SaveButton;
