import React from 'react';

import Card from '../common/Card';
import ToggleBox from '../common/ToggleBox';
import CouponCodeForm from './components/CouponCodeForm';
import CouponCodeFormikManager from './components/CouponCodeFormikManager';
import { __ } from '../../i18n';
import { formikDataShape } from '../../utils/propTypes';

const CouponCodeMemorized = React.memo(({ formikData }) => (
  <CouponCodeFormikManager formikData={formikData}>
    <Card>
      <ToggleBox title={__('Add your promo code')}>
        <CouponCodeForm />
      </ToggleBox>
    </Card>
  </CouponCodeFormikManager>
));

CouponCodeMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default CouponCodeMemorized;
