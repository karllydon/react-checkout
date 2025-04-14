import React from 'react';

import Card from '../common/Card';
import ToggleBox from '../common/ToggleBox';
import BillingAddressForm from './components/BillingAddressForm';
import BillingAddressView from './components/BillingAddressView';
import BillingAddressFormikProvider from './components/BillingAddressFormikProvider';
import { __ } from '../../i18n';
import { formikDataShape } from '../../utils/propTypes';
import useBillingAddressCartContext from './hooks/useBillingAddressCartContext';

const BillingAddressMemorized = React.memo(({ formikData }) => {
  const { isVirtualCart } = useBillingAddressCartContext();

  return (
    <BillingAddressFormikProvider formikData={formikData}>
      {isVirtualCart ? (
        <Card>
          <ToggleBox title={__('1. Billing Address')} show>
            <BillingAddressForm />
            <BillingAddressView />
          </ToggleBox>
        </Card>
      ) : null}
    </BillingAddressFormikProvider>
  );
});

BillingAddressMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default BillingAddressMemorized;
