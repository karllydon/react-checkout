import React, { useEffect, useState } from 'react';

import Totals from '../totals';
import Customer from '../customer';
import CartItemsForm from '../items';
// import PlaceOrder from '../placeOrder';
import CouponCode from '../couponCode';
import Message from '../common/Message';
import PageLoader from '../common/Loader';
import { AddressWrapper } from '../address';
import PaymentMethod from '../paymentMethod';
import BillingAddress from '../billingAddress';
import ShippingAddress from '../shippingAddress';
import ShippingMethodsForm from '../shippingMethod';
// import StickyRightSidebar from '../StickyRightSidebar';
import Marketing from '../marketing/Marketing';
import { config } from '../../config';
import { aggregatedQueryRequest } from '../../api';
import LocalStorage from '../../utils/localStorage';
import useCheckoutFormContext from '../../hook/useCheckoutFormContext';
import useCheckoutFormAppContext from './hooks/useCheckoutFormAppContext';
import useCheckoutFormCartContext from './hooks/useCheckoutFormCartContext';
import useStageContext from '../../hook/useStageContext';

function CheckoutForm() {
  const [isRequestSent, setIsRequestSent] = useState(false);

  const { storeAggregatedFormStates } = useCheckoutFormContext();
  const { orderId, isVirtualCart, storeAggregatedCartStates } =
    useCheckoutFormCartContext();
  const { pageLoader, appDispatch, setPageLoader, storeAggregatedAppStates } =
    useCheckoutFormAppContext();

  const { checkoutStep, checkoutSteps } = useStageContext();

  /**
   * Collect App, Cart data when the page loads.
   */
  useEffect(() => {
    if (isRequestSent) {
      return;
    }

    if (!LocalStorage.getCartId()) {
      LocalStorage.saveCartId(config.cartId);
    }

    (async () => {
      try {
        setPageLoader(true);
        setIsRequestSent(true);
        const data = await aggregatedQueryRequest(appDispatch);
        storeAggregatedCartStates(data);
        storeAggregatedAppStates(data);
        storeAggregatedFormStates(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoader(false);
      }
    })();
  }, [
    appDispatch,
    isRequestSent,
    setPageLoader,
    storeAggregatedAppStates,
    storeAggregatedCartStates,
    storeAggregatedFormStates,
  ]);

  if (orderId && config.isDevelopmentMode) {
    return (
      <div className="flex flex-col items-center justify-center mx-10 my-10">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <div className="flex flex-col items-center justify-center mt-4 space-y-3">
          <div>Your order is placed.</div>
          <div>{`Order Number: #${orderId}`}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <Message />
      <div className="columns">
        <div className="opc-wrapper">
          <div className="page-title-wrapper">
            <div className="page-title">Checkout</div>
          </div>
          <ol className="opc" id="checkoutSteps">
            <li id="billing" className=" checkout-billing-address">
              <AddressWrapper>
                {checkoutStep === checkoutSteps.BILLING && <BillingAddress />}
                {checkoutStep === checkoutSteps.SHIPPING && !isVirtualCart && (
                  <ShippingAddress />
                )}
                {checkoutStep === checkoutSteps.SHIPPING && !isVirtualCart && (
                  <ShippingMethodsForm />
                )}
                {checkoutStep === checkoutSteps.MARKETING && <Marketing />}
                {checkoutStep === checkoutSteps.PAYMENT && <PaymentMethod />}
              </AddressWrapper>
            </li>
          </ol>
        </div>

        <div id="opc-sidebar" className="opc-sidebar opc-summary-wrapper">
          <Customer />
          <Totals />
          <CartItemsForm />
          <CouponCode />
        </div>
        {pageLoader && <PageLoader />}
      </div>
    </div>
  );
}

export default CheckoutForm;
