import React from 'react';

import Button from '../common/Button';
import { __ } from '../../i18n';
import { closePageRequest } from '../../api';

function CloseButton() {
  return (
    <Button variant="danger" size="lg" click={closePageRequest}>
      {__('Close Page')}
    </Button>
  );
}

export default CloseButton;
