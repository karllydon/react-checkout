/* eslint-disable no-console */
import React from 'react';
import { __ } from '../../../i18n';
import { classNames } from '../../../utils';
import usePaymentMethodCartContext from '../hooks/usePaymentMethodCartContext';
import usePaymentMethodFormContext from '../hooks/usePaymentMethodFormContext';
import PaymentMethodAppProvider from '../../../paymentMethods/context/PaymentApp/PaymentAppProvider';
import PaymentConfigProvider from '../../../paymentMethods/context/PaymentConfig/PaymentConfigProvider';
import PaymentsContainer from '../../../paymentMethods/PaymentsContainer';

function PaymentMethodList() {
  const { fields, formikData } = usePaymentMethodFormContext();
  const { methodList, isVirtualCart, doCartContainShippingAddress } =
    usePaymentMethodCartContext();
  const { paymentValues, setFieldValue, setFieldTouched } = formikData;
  const paymentAvailable = isVirtualCart || doCartContainShippingAddress;

  return (
    <PaymentMethodAppProvider>
      <PaymentConfigProvider>
        <div
          title={
            !paymentAvailable
              ? __('Please provide a shipping address first.')
              : ''
          }
          className={classNames(
            !paymentAvailable ? 'cursor-not-allowed opacity-40' : '',
            'py-4'
          )}
        >
          {methodList &&
            setFieldValue &&
            setFieldTouched &&
            fields &&
            paymentValues && (
              <PaymentsContainer
                methodList={methodList}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                fields={fields}
                paymentValues={paymentValues}
              />
            )}
        </div>
      </PaymentConfigProvider>
    </PaymentMethodAppProvider>
  );
}

export default PaymentMethodList;
