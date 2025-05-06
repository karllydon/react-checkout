import React, { useMemo } from 'react';
import MarketingMemorized from './MarketingMemorized';
import { MARKETING_FORM } from '../../config';
import useFormikMemorizer from '../../hook/useFormikMemorizer';

function Marketing() {
  const formikSectionData = useFormikMemorizer(MARKETING_FORM);

  const marketingFormikData = useMemo(
    () => ({
      ...formikSectionData,
      marketing: formikSectionData.formSectionValues,
    }),
    [formikSectionData]
  );

  return <MarketingMemorized formikData={marketingFormikData} />;
}

export default Marketing;
