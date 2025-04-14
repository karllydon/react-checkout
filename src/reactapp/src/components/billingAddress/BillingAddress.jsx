import React, { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { get as _get, set as _set } from 'lodash-es';

import BillingAddressMemorized from './BillingAddressMemorized';
import { __ } from '../../i18n';
import { BILLING_ADDR_FORM } from '../../config';
import { billingAddrOtherOptionField } from './utility';
import useFormikMemorizer from '../../hook/useFormikMemorizer';

/**
 * Entry point Billing Address Form Section
 *
 * We are preparing any data related to formik state here and memorizing it.
 * After that, these info will be fed to all other child components.
 *
 * So child components DO NOT access formik states using `useFormikContext` hook
 * inside them unless it is totally unavoidable.
 *
 * Using useFormikContext hook render the component almost always. So use the
 * memorized data here inside the child components.
 */
function BillingAddress() {
  const { values } = useFormikContext();
  const formSectionData = useFormikMemorizer(BILLING_ADDR_FORM);
  const billingOtherOptionSelected = _get(values, billingAddrOtherOptionField);
  const { formSectionValues, formSectionErrors, isFormSectionTouched } =
    formSectionData;
  const streetError = _get(formSectionErrors, 'street');

  if (streetError) {
    _set(formSectionErrors, 'street[0]', __('This is a required field'));
  }

  const billingFormikData = useMemo(
    () => ({
      ...formSectionData,
      formSectionErrors,
      billingOtherOptionSelected,
      billingValues: formSectionValues,
      isBillingAddressTouched: isFormSectionTouched,
      selectedRegion: formSectionData.formSectionValues?.region,
      selectedCountry: formSectionData.formSectionValues?.country,
      selectedSalutation: formSectionData.formSectionValues?.salutation,
    }),
    [
      formSectionData,
      formSectionErrors,
      formSectionValues,
      isFormSectionTouched,
      billingOtherOptionSelected,
    ]
  );

  return <BillingAddressMemorized formikData={billingFormikData} />;
}

export default BillingAddress;
