import React from 'react';
import { func } from 'prop-types';
import Button from '../../common/Button';
import { __ } from '../../../i18n';

import useStageContext from '../../../hook/useStageContext';
import useMarketingFormikContext from '../hooks/useMarketingFormikContext';

function SaveButton({ marketingSubmit }) {
  const { updateCheckoutStep } = useStageContext();
  const { marketing } = useMarketingFormikContext();

  const handleSave = async () => {
    const email = marketing.email ? 1 : 0;
    const post = marketing.post ? 1 : 0;
    await marketingSubmit(email, post);
    updateCheckoutStep();
  };

  return (
    <Button variant="primary" size="lg" disable={false} click={handleSave}>
      {__('Save and Continue')}
    </Button>
  );
}

SaveButton.propTypes = {
  marketingSubmit: func.isRequired,
};

export default SaveButton;
