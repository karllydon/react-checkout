import React, { useEffect, useState, useMemo } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { bool as YupBool } from 'yup';
import { _emptyFunc, _isObjEmpty } from '../../../utils';
import useFormSection from '../../../hook/useFormSection';
import { MARKETING_FORM } from '../../../config';
import { formikDataShape } from '../../../utils/propTypes';
import useMarketingAppContext from '../hooks/useMarketingAppContext';
import MarketingFormikContext from '../context/MarketingFormikContext';

let initialValues = {};

const validationSchema = {
  emailOptIn: YupBool(),
  postOptIn: YupBool(),
};

function MarketingFormikProvider({ children, formikData }) {
  const [isFormPopulated, setIsFormPopulated] = useState(false);
  const { marketing } = useMarketingAppContext();
  const { setFieldValue } = formikData;

  // updating formik values and validation after fetching checkout agreements.
  // this needs to be happened only once.
  useEffect(() => {
    if (!isFormPopulated && !_isObjEmpty(marketing)) {
      const marketingData = marketing;
      initialValues = marketingData;
      setFieldValue(MARKETING_FORM, marketingData);
      setIsFormPopulated(true);
    }
  }, [marketing, setFieldValue, isFormPopulated]);

  // registering checkout agreements into the global formik state
  const formContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    submitHandler: _emptyFunc(),
    id: MARKETING_FORM,
  });

  const context = useMemo(
    () => ({ ...formContext, ...formikData, formikData }),
    [formikData, formContext]
  );

  return (
    <MarketingFormikContext.Provider value={context}>
      <Form id={MARKETING_FORM}>{children}</Form>
    </MarketingFormikContext.Provider>
  );
}

MarketingFormikProvider.propTypes = {
  children: node,
  formikData: formikDataShape.isRequired,
};

MarketingFormikProvider.defaultProps = {
  children: null,
};

export default MarketingFormikProvider;
