import React from 'react';

import Button from '../common/Button';
import { __ } from '../../i18n';

function CloseButton() {
  return (
    <Button variant="danger" size="lg">
      {__('Close Page')}
    </Button>
  );
}

export default CloseButton;
