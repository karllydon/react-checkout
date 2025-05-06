import React, { useMemo, useState, useCallback } from 'react';
import { node } from 'prop-types';

import StageContext from './StageContext';

function StageProvider({ children }) {
  const checkoutSteps = Object.freeze({
    BILLING: 0,
    SHIPPING: 1,
    MARKETING: 2,
    PAYMENT: 3,
  });

  const [checkoutStep, setCheckoutStep] = useState(checkoutSteps.BILLING);

  const updateCheckoutStep = useCallback(() => {
    if (checkoutStep !== checkoutSteps.payment) {
      setCheckoutStep(checkoutStep + 1);
    }
  }, [checkoutStep, checkoutSteps.payment]);

  const context = useMemo(
    () => ({
      checkoutStep,
      updateCheckoutStep,
      checkoutSteps,
    }),
    [checkoutStep, checkoutSteps, updateCheckoutStep]
  );

  return (
    <StageContext.Provider value={context}>{children}</StageContext.Provider>
  );
}

StageProvider.propTypes = {
  children: node.isRequired,
};

export default StageProvider;
