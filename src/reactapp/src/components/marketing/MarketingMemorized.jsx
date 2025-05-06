import React from 'react';

import MarketingForm from './components/MarketingForm';
import MarketingFormikProvider from './components/MarketingFormikProvider';
import { formikDataShape } from '../../utils/propTypes';
import useMarketingAppContext from './hooks/useMarketingAppContext';
import { _isObjEmpty } from '../../utils';

const MarketingMemorized = React.memo(({ formikData }) => {
  const { marketingOptIn } = useMarketingAppContext();

  return _isObjEmpty(marketingOptIn) ? null : (
    <MarketingFormikProvider formikData={formikData}>
      <MarketingForm />
    </MarketingFormikProvider>
  );
});

MarketingMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default MarketingMemorized;
