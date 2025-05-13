/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { bool as YupBool } from 'yup';
import { _emptyFunc, _isObjEmpty } from '../../../utils';
import useFormSection from '../../../hook/useFormSection';
import { MARKETING_FORM } from '../../../config';
import { formikDataShape } from '../../../utils/propTypes';
import MarketingFormikContext from '../context/MarketingFormikContext';

const initialValues = { email: false, post: false };

const validationSchema = {
  email: YupBool(),
  post: YupBool(),
};

function MarketingFormikProvider({ children, formikData }) {
  // registering marketing into the global formik state
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
