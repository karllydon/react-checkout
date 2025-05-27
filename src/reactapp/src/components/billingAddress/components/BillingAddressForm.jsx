import React from 'react';
import { SaveButton } from '../../address';
import TextInput from '../../common/Form/TextInput';
import SelectInput from '../../common/Form/SelectInput';
import SaveInBookCheckbox from '../../address/components/SaveInBookCheckbox';
import { __ } from '../../../i18n';
import { _keys } from '../../../utils';
import LocalStorage from '../../../utils/localStorage';
import { isValidCustomerAddressId } from '../../../utils/address';
import useCountryState from '../../address/hooks/useCountryState';
import useSalutationState from '../../address/hooks/useSalutationState';
import useAddressWrapper from '../../address/hooks/useAddressWrapper';
import useBillingAddressAppContext from '../hooks/useBillingAddressAppContext';
import useFormValidateThenSubmit from '../../../hook/useFormValidateThenSubmit';
import useBillingAddressFormikContext from '../hooks/useBillingAddressFormikContext';
import useLoginCartContext from '../../login/hooks/useLoginCartContext';

function BillingAddressForm() {
  const {
    fields,
    formId,
    viewMode,
    formikData,
    submitHandler,
    handleKeyDown,
    billingValues,
    setFieldValue,
    setIsNewAddress,
    selectedAddress,
    setFieldTouched,
    validationSchema,
    setSelectedAddress,
  } = useBillingAddressFormikContext();
  const { isLoggedIn } = useBillingAddressAppContext();
  const { reCalculateMostRecentAddressOptions } = useAddressWrapper();
  const formSubmitHandler = useFormValidateThenSubmit({
    formId,
    formikData,
    submitHandler,
    validationSchema,
  });
  const { countryOptions, stateOptions, hasStateOptions } = useCountryState({
    fields,
    formikData,
  });
  const { salutationOptions } = useSalutationState();
  const { setEmailOnGuestCart } = useLoginCartContext();

  const { selectedCountry, isBillingAddressTouched } = formikData;

  const saveAddressAction = async () => {
    setEmailOnGuestCart('karl.lydon@tti-emea.com');
    let newAddressId = selectedAddress;

    // Updating mostRecentAddressList in prior to form submit; Because values
    // there would be used in the submit action if the address is from
    // mostRecentAddressList.
    if (isLoggedIn) {
      if (isValidCustomerAddressId(selectedAddress)) {
        // This means a customer address been edited and now changed and submitted.
        // So treat this as a new address;
        const recentAddressList = LocalStorage.getMostRecentlyUsedAddressList();
        newAddressId = `new_address_${_keys(recentAddressList).length + 1}`;
        LocalStorage.addAddressToMostRecentlyUsedList(
          billingValues,
          newAddressId
        );
      } else {
        LocalStorage.updateMostRecentlyAddedAddress(
          newAddressId,
          billingValues
        );
      }
    }

    await formSubmitHandler(newAddressId);

    if (!isLoggedIn) {
      return;
    }

    setIsNewAddress(false);
    setSelectedAddress(newAddressId);
    reCalculateMostRecentAddressOptions();
  };

  const handleCountryChange = (event) => {
    const newValue = event.target.value;
    setFieldTouched(fields.country, newValue);
    setFieldValue(fields.country, newValue);
    // when country is changed, then always reset region field.
    setFieldValue(fields.region, '');
  };

  const handleSalutationChange = (event) => {
    const newValue = event.target.value;
    setFieldTouched(fields.salutation, newValue);
    setFieldValue(fields.salutation, newValue);
  };

  if (viewMode) {
    return null;
  }

  return (
    <>
      <div className="py-2">
        <TextInput
          required
          name={fields.email}
          type="email"
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Email')}
        />
        <SelectInput
          required
          name={fields.salutation}
          formikData={formikData}
          options={salutationOptions}
          onChange={handleSalutationChange}
        />
        <TextInput
          required
          name={fields.firstname}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('First name')}
        />
        <TextInput
          required
          name={fields.lastname}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Last name')}
        />
        <TextInput
          name={fields.company}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Company')}
        />
        <TextInput
          required
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Street')}
          name={`${fields.street}[0]`}
        />
        <TextInput
          required
          placeholder="Postal Code"
          name={fields.zipcode}
          formikData={formikData}
          onKeyDown={handleKeyDown}
        />
        <TextInput
          required
          name={fields.city}
          formikData={formikData}
          placeholder={__('City')}
          onKeyDown={handleKeyDown}
        />
        <SelectInput
          required
          name={fields.country}
          formikData={formikData}
          options={countryOptions}
          onChange={handleCountryChange}
        />
        <SelectInput
          required
          label={__('State')}
          name={fields.region}
          options={stateOptions}
          formikData={formikData}
          isHidden={!selectedCountry || !hasStateOptions}
        />
        <TextInput
          required
          name={fields.phone}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Phone Number')}
        />
        <SaveInBookCheckbox fields={fields} formikData={formikData} />
      </div>

      <div className="flex mt-4">
        <SaveButton
          isFormValid={isBillingAddressTouched}
          actions={{ saveAddress: saveAddressAction }}
        />
      </div>
    </>
  );
}

export default BillingAddressForm;
