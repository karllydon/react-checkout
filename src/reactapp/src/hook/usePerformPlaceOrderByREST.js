import { useCallback } from 'react';
import { get as _get, set as _set } from 'lodash-es';
import Cookies from 'js-cookie';
import { __ } from '../i18n';
import useAppContext from './useAppContext';
import useCartContext from './useCartContext';
import { _isObjEmpty, _keys } from '../utils';
import { performRedirect } from '../utils/payment';

export default function usePerformPlaceOrderByREST(paymentMethodCode) {
  const { cartId, setRestPaymentMethod, setOrderInfo } = useCartContext();
  const {
    isLoggedIn,
    fetchCaseDetails,
    setPageLoader,
    setErrorMessage,
    checkoutAgreements,
  } = useAppContext();

  return useCallback(
    async (
      values,
      { extraPaymentData = {}, additionalData, extensionAttributes = {} }
    ) => {
      try {
        const caseId = Cookies.get('params_call');
        const caseResponse = await fetchCaseDetails(caseId);
        const email = _get(caseResponse, 'email');
        const paymentMethodData = {
          paymentMethod: {
            method: paymentMethodCode,
            ...extraPaymentData,
            additional_data: additionalData,
          },
        };

        if (
          !_isObjEmpty(extensionAttributes) ||
          !_isObjEmpty(checkoutAgreements)
        ) {
          _set(paymentMethodData, 'paymentMethod.extension_attributes', {
            ...extensionAttributes,
            agreement_ids: _keys(checkoutAgreements),
          });
        }

        _set(paymentMethodData, 'email', email);
        _set(paymentMethodData, 'cartId', cartId);

        setPageLoader(true);
        const order = await setRestPaymentMethod(paymentMethodData, isLoggedIn);
        setPageLoader(false);

        performRedirect(order);

        if (order) {
          setOrderInfo(order);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(
          __(
            'This transaction could not be performed. Please select another payment method.'
          )
        );
        setPageLoader(false);
      }
    },
    [
      fetchCaseDetails,
      paymentMethodCode,
      checkoutAgreements,
      cartId,
      setPageLoader,
      setRestPaymentMethod,
      isLoggedIn,
      setOrderInfo,
      setErrorMessage,
    ]
  );
}
